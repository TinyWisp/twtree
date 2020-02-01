<template>
  <div class="tree-wrapper">
    <ul class="tree" @dragleave="dragLeaveTree($event)" ref="tree">
      <transition-group name="node">
        <template v-for="item of items">
          <li
            v-if="item.__.isVisible"
            :class="{
              node:             true, 
              selected:         item.__.isSelected,
              'drag-over-prev': item.__.dragOverState === 'prev',
              'drag-over-next': item.__.dragOverState === 'next',
              'drag-over-self': item.__.dragOverState === 'self',
              'not-droppable':  item.__.dragOverState === null && item === dragAndDrop.hoverNode
            }"
            :style="{
              'text-indent': (item.__.depth - 1) * 20 + 'px',
              '--height': item.__.height
            }"
            @click = "select(item)"
            :draggable="item.__.isDraggable"
            @dragstart="dragStart(item, $event)"
            @dragover="dragOver(item, $event)"
            @dragend="dragEnd()"
            @drop="drop()"
            :ref="'node-' + item.id"
            :key="item.id">
            <div class="switcher" @click.stop="switchState(item)">
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" v-if="item.__.directoryState === 'expanded'">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" v-else-if="item.__.directoryState === 'collapsed'">
                <path d="M10 17l5-5-5-5v10z"/>
              </svg>
            </div>
            <span class="checkbox-wrapper" v-if="item.__.showCheckbox">
              <span
                :class="{
                  checkbox:     true,
                  checked:      item.__.checkboxState === 'checked',
                  unchecked:    item.__.checkboxState === 'unchecked',
                  undetermined: item.__.checkboxState === 'undetermined',
                  disabled:     item.__.isCheckboxDisabled
                }"
                @click.stop="toggleCheckbox(item)">
              </span>
            </span>
            <span class="icon-and-title" :ref="'icon-and-title-' + item.id ">
              <span icon="icon-wrapper">
                <img class="icon" src="../assets/folder.svg" v-if="item.hasChild && item.__.directoryState === 'collapsed'">
                <img class="icon" src="../assets/folder-open.svg" v-else-if="item.hasChild && item.__.directoryState === 'expanded'">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="icon" v-else>
                  <path d="M6 2 L6 30 26 30 26 10 18 2 Z M18 2 L18 10 26 10" />
                </svg>
              </span>
              <span 
                :class="{title:true, editing:item.__.isEditing}" 
                :ref="'title-' + item.id" 
                :contenteditable="item.__.isEditing"
                @keydown="titleKeydown(item, $event)"
                @keyup="titleKeyup(item, $event)"
                @keypress="titleKeypress(item, $event)"
                @input="titleInput(item, $event)"
                @blur="blur(item)">{{item.title}}</span>
            </span>
            <div v-if="item.__.dragOverState !== null" class="drag-arrow-wrapper">
              <svg class="arrow" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
              </svg>
            </div>
          </li>
        </template>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TWTree',
  props: {
    tree: {
      type: Array,
      default: function() {
        return []
      }
    },
    globalAttrs: {
      type: Object,
      default: function() {
        return {}
      }
    },
    fnLoadData: {
      type: Function,
      required: false,
      default: null
    },
    maxSelectCount: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {

  },
  data() {
    return {
      nodes: this.tree,
      items: this.getItems(),
      selected: [],
      autoIdCounter: 0,
      defaultAttrs: {
        directoryState: 'expanded',
        isEditing: false,
        indent: '20px',
        isDraggable: true,
        dragOverState: null,
        height: '2em',
        showCheckbox: false,
        checkboxState: 'unchecked',
        isCheckboxDisabled: false
      },
      dragAndDrop: {
        srcNode: null,
        hoverNode: null,
      }
    }
  },
  methods: {
    traverse(fnDoSomething) {
      let stack = []

      if (!Array.isArray(this.nodes)) {
        return
      }

      for (let i=this.nodes.length-1; i>=0; i--) {
        let node = this.nodes[i]
        this.setAttr(node, 'depth',  1)
        this.setAttr(node, 'parent', null)
        this.setAttr(node, 'path',   [])
        this.setAttr(node, 'pos',    i)
        this.setAttr(node, 'gpos',   i)
        stack.push(node)
      }

      while (stack.length > 0) {
        let node = stack.pop()
        if (node.hasChild) {
          for (let i=node.children.length-1; i>=0; i--) {
            let child = node.children[i]

            this.setAttr(child, 'depth',  this.getAttr(node, 'depth') + 1)
            this.setAttr(child, 'parent', node)
            this.setAttr(child, 'path',   [...this.getAttr(node, 'path'), node])
            this.setAttr(child, 'pos',    i)
            this.setAttr(child, 'gpos',   this.getAttr(node, 'gpos') + i + 1)
            stack.push(child)
          }
        }

        let rs = fnDoSomething(node)
        if (rs === false) {
          break
        }
      }
    },
    getNode(id) {
      let target = null
      this.traverse(function(node) {
        if (node.id === id) {
          target = node
          return false
        }
      })

      return target
    },
    getSelected() {
      return this.selected
    },
    getSelectedOne() {
      return this.selected.length > 0
        ? this.selected[0]
        : null
    },
    setAttr(node, key, val) {
      if (!node.hasOwnProperty('__')) {
        this.$set(node, '__', {})
      }
      this.$set(node.__, key, val)
    },
    getAttr(node, key) {
      if (node.hasOwnProperty('__') && node.__.hasOwnProperty(key)) {
        return node.__[key]
      }

      if (this.globalAttrs.hasOwnProperty(key)) {
        return this.globalAttrs[key]
      }

      if (this.defaultAttrs.hasOwnProperty(key)) {
        return this.defaultAttrs[key]
      }

      return undefined
    },
    getAttrs(node) {
      return node.__
    },
    setTitle(node, title) {
      if (node.title !== title) {
        this.$emit('rename', node, node.title, title)
      }
      this.$set(node, 'title', title)
    },
    getDirectoryState(node) {
      if (!node.hasChild) {
        return null
      }

      if (node.__.hasOwnProperty('directoryState') && node.__.directoryState !== null) {
        return node.__.directoryState
      }

      if (this.globalAttrs.hasOwnProperty('directoryState')) {
        return this.globalAttrs.directoryState
      }

      if (this.defaultAttrs.hasOwnProperty('directoryState')) {
        return this.defaultAttrs.directoryState
      }

      return undefined
    },
    generateId() {
      this.autoIdCounter += 1
      return 'twtree-node-' + this.autoIdCounter
    },
    edit(node) {
      this.setAttr(node, 'newTitle', node.title)
      this.setAttr(node, 'isEditing', true)
      this.focus(node)
      this.$emit('edit', node)
    },
    quitEdit(node) {
      this.setAttr(node, 'isEditing', false)
      this.$emit('quitEdit', node)
    },
    getTitleElement(node) {
      let refId = 'title-' + node.id
      if (this.$refs.hasOwnProperty(refId)) {
        return this.$refs[refId][0]
      }

      return null
    },
    focus(node) {
      let titleElement = this.getTitleElement(node)
      setTimeout(function(){
        titleElement.focus()
        this.$emit('focus', node)
      }.bind(this), 100)
    },
    blur(node) {
      let titleElement = this.getTitleElement(node)
      let newTitle = titleElement.innerText

      this.$emit('blur', node, newTitle)
    },
    inputKeypress(node) {
      //let inputWidth = (this.getTitleWidth(node) + 10) + 'px'
      //this.setAttr(node, 'inputWidth', inputWidth)

      let titleElement = this.getTitleElement(node)
      let newTitle = titleElement.innerText
      this.$emit('input', node, newTitle)
    },
    unselect(node) {
      let i = this.selected.indexOf(node)

      if (i !== -1) {
          this.setAttr(node, 'isSelected', false)
          this.selected.splice(i, 1)
          this.$emit('unselect', node)
      }
    },
    select(node) {
      this.setAttr(node, 'isSelected', true)
      this.selected.push(node)
      this.$emit('select', node)

      while (this.maxSelectCount < this.selected.length) {
        this.unselect(this.selected[0])
      }
    },
    draggable(node) {
      this.setAttr(node, 'isDraggable', true)
    },
    notDraggable(node) {
      this.setAttr(node, 'isDraggable', false)
    },
    create(node, parentNode, pos) {
      if (parentNode === null) {
        if (typeof(pos) === 'undefined') {
          this.nodes.push(node)
        } else if(typeof(pos) === 'number') {
          this.nodes.splice(pos, 0, node)
        }

      } else {
        this.$set(parentNode, 'hasChild', true)
        if (!parentNode.hasOwnProperty('children')) {
          this.$set(parentNode, 'children', [])
        }
        if (typeof(pos) === 'undefined') {
          parentNode.children.push(node)
        } else {
          parentNode.children.splice(pos, 0, node)
        }
        this.setAttr(parentNode, 'directoryState', this.getDirectoryState(parentNode))
      }
      
      this.refreshItems()
      this.$emit('create', node)
    },
    remove(node) {
      let parent = this.getAttr(node, 'parent')
      let pos = this.getAttr(node, 'pos')

      if (parent === null) {
        this.nodes.splice(pos, 1)
      } else {
        parent.children.splice(pos, 1)
        parent.hasChild = (parent.children.length > 0)
        this.setAttr(parent, 'directoryState', this.getDirectoryState(parent))
      }

      this.refreshItems()
      this.$emit('remove', node)
    },
    move(node, toParent, toPos) {
      let fromParent = this.getAttr(node, 'parent')
      let fromPos = this.getAttr(node, 'pos')

      //remove
      if (fromParent === null) {
        this.nodes.splice(fromPos, 1)
      } else {
        fromParent.children.splice(fromPos, 1)
        fromParent.hasChild = (fromParent.children.length > 0)
        this.setAttr(fromParent, 'directoryState', this.getDirectoryState(fromParent))
      }

      //create
      if (fromParent === toParent && fromPos < toPos) {
        toPos -= 1
      }

      if (toParent === null) {
        if (typeof(toPos) === 'undefined') {
          this.nodes.push(node)
        } else if(typeof(toPos) === 'number') {
          this.nodes.splice(toPos, 0, node)
        }

      } else {
        this.$set(toParent, 'hasChild', true)
        if (!toParent.hasOwnProperty('children')) {
          this.$set(toParent, 'children', [])
        }
        if (typeof(toPos) === 'undefined') {
          toParent.children.push(node)
        } else {
          toParent.children.splice(toPos, 0, node)
        }
        this.setAttr(toParent, 'directoryState', this.getDirectoryState(toParent))
      }
 
      this.refreshItems()
      this.$emit('move', node, fromParent, fromPos, toParent, toPos)
    },
    expand(node) {
      if (!node.hasChild) {
        return
      }

      let state = this.getDirectoryState(node)
      if (state != 'collapsed') {
        return
      }

      if (this.fnLoadData === null) {
        this.setAttr(node, 'directoryState', 'expanded')
        this.refreshItems()
        return
      }

      if (this.fnLoadData != null) {
        this.setAttr(node, 'directoryState', 'loading')
        let rs = this.fnLoadData(node)

        //if the callback function returned a promise
        if (typeof(rs.then) === 'function') {
          let prom = rs
          prom.then(function(children) {
            node.children = children
            this.setAttr(node, 'directoryState', 'expanded')
            this.refreshItems()
          }.bind(this))
          prom.catch(function(e) {
            self.setAttr(node, 'directoryState', 'collapsed')
            console.log(e)
          })
          return
        }

        //if the callback function returned an array of children nodes
        let children = rs
        if (Array.isArray(children) && children.length > 0) {
          node.children = children
          this.setAttr(node, 'directoryState', 'expanded')
          this.refreshItems()
        }
      }
    },
    collapse(node) {
      if (!node.hasChild) {
        return
      }

      let state = this.getDirectoryState(node)
      if (state !== 'expanded') {
        return
      }

      this.setAttr(node, 'directoryState', 'collapsed')
      this.refreshItems()
    },
    getNodeElement(node) {
      let refId = 'node-' + node.id
      if (this.$refs.hasOwnProperty(refId)) {
        return this.$refs[refId][0]
      }

      return null
    },
    getNodeOffsetTop(node) {
      let nodeElement = this.getNodeElement(node)
      let offsetTop = nodeElement.offsetTop

      let reference = nodeElement.offsetParent
      while(reference){
        offsetTop += reference.offsetTop
        reference = reference.offsetParent
      }

      return offsetTop
    },
    dragStart(node, event) {
      let refId = 'icon-and-title-' + node.id
      let ghostElement = this.$refs[refId][0]

      this.dragAndDrop.srcNode = node
      event.dataTransfer.setDragImage(ghostElement, -20, 0)
      event.dataTransfer.dropEffect = 'move'
    },
    dragOver(node, event) {
      if (this.dragAndDrop.hoverNode !== node) {
        this.dragLeave(this.dragAndDrop.hoverNode)
        this.dragEnter(node)
      }

      if (this.dragAndDrop.srcNode === node) {
        this.setAttr(node, 'dragOverState', null)
        return
      }

      let path = this.getAttr(node, 'path')
      for (let ancestor of path) {
        if (ancestor === this.dragAndDrop.srcNode) {
          this.setAttr(node, 'dragOverState', null)
          return
        }
      }

      let nodeElement = this.getNodeElement(node)
      let nodeHeight = nodeElement.clientHeight
      let y = event.pageY - this.getNodeOffsetTop(node)

      let dragOverState = null

      if (y < nodeHeight * 0.33) {
        dragOverState = 'prev'
      } else if (nodeHeight - y < nodeHeight * 0.33) {
        dragOverState = 'next'
      } else {
        dragOverState = 'self'
      }

      let nodePos = this.getAttr(node, 'pos')
      let srcNodePos = this.getAttr(this.dragAndDrop.srcNode, 'pos')
      if (dragOverState === 'prev' && this.dragAndDrop.srcNode.parent === node.parent && nodePos === srcNodePos + 1) {
        dragOverState = null
      }
      if (dragOverState === 'next' && this.dragAndDrop.srcNode.parent === node.parent && nodePos === srcNodePos - 1) {
        dragOverState = null
      }

      this.setAttr(node, 'dragOverState', dragOverState)
      event.preventDefault()
    },
    dragEnter(node) {
      this.dragAndDrop.hoverNode = node
    },
    dragLeave(node) {
      if (node !== null) {
        this.setAttr(node, 'dragOverState', null)
      }
    },
    dragEnd() {
      if (this.dragAndDrop.hoverNode !== null) {
        this.dragLeave(this.dragAndDrop.hoverNode)
        this.dragAndDrop.hoverNode = null
      }
    },
    drop() {
      let srcNode = this.dragAndDrop.srcNode
      let desNode = this.dragAndDrop.hoverNode
      let desNodePos = this.getAttr(desNode, 'pos')
      let desParentNode = this.getAttr(desNode, 'parent')
      let dragOverState = this.getAttr(desNode, 'dragOverState')

      if (dragOverState === null) {
        return
      }

      switch (dragOverState) {
        case 'prev':
          this.move(srcNode, desParentNode, desNodePos)
          break

        case 'next':
          this.move(srcNode, desParentNode, desNodePos + 1)
          break

        case 'self':
          this.move(srcNode, desNode)
          break
      }
    },
    dragLeaveTree(event) {
      let treeElement = this.$refs.tree
      let treeWidth = treeElement.clientWidth
      let treeHeight = treeElement.clientHeight

      if (event.offsetX <= 0 || event.offsetX >= treeWidth || event.offsetY <= 0 || event.offsetY >= treeHeight) {
        if (this.dragAndDrop.hoverNode !== null) {
          this.dragLeave(this.dragAndDrop.hoverNode)
          this.dragAndDrop.hoverNode = null
        }
      }
    },
    check(node) {
      let gpos = this.getAttr(node, 'gpos')
      let depth = this.getAttr(node, 'depth')
      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'depth') <= depth) {
          break
        }
        if (!this.items[i].hasChild && this.getAttr(this.items[i], 'isCheckboxDisabled') === false) {
          this.setAttr(this.items[i], 'checkboxState', 'checked')
        }
      }

      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'depth') <= depth) {
          break
        }

        if (this.items[i].hasChild) {
          this.setAttr(this.items[i], 'checkboxState', this.getCheckboxState(this.items[i]))
        }
      }

      let path = this.getAttr(node, 'path')
      for (let tnode of path) {
        this.setAttr(tnode, 'checkboxState', this.getCheckboxState(tnode))
      }
    },
    uncheck(node) {
      let gpos = this.getAttr(node, 'gpos')
      let depth = this.getAttr(node, 'depth')
      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'depth') <= depth) {
          break
        }
        if (!this.items[i].hasChild && this.getAttr(this.items[i], 'isCheckboxDisabled') === false) {
          this.setAttr(this.items[i], 'checkboxState', 'unchecked')
        }
      }

      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'depth') <= depth) {
          break
        }

        if (this.items[i].hasChild) {
          this.setAttr(this.items[i], 'checkboxState', this.getCheckboxState(this.items[i]))
        }
      }

      let path = this.getAttr(node, 'path')
      for (let tnode of path) {
        this.setAttr(tnode, 'checkboxState', this.getCheckboxState(tnode))
      }
    },
    toggleCheckbox(node) {
      let checkboxState = this.getAttr(node, 'checkboxState')

      switch (checkboxState) {
        case 'checked':
          this.uncheck(node)
          break

        case 'unchecked':
          this.check(node)
          break

        case 'undetermined':
          this.uncheck(node)
          break
      }
    },
    getCheckboxState(node) {
      if (node.hasChild === false) {
        return this.getAttr(node, 'checkboxState')
      }

      let gpos = this.getAttr(node, 'gpos');
      let depth = this.getAttr(node, 'depth')

      let hasChecked = false
      let hasUnchecked = false
      for (let i=gpos+1; i<this.items.length; i++) {
        if (this.getAttr(this.items[i], 'depth') <= depth) {
          break
        }

        if (!this.items[i].hasChild) {
          if (this.getAttr(this.items[i], 'checkboxState') === 'checked') {
            hasChecked = true
          } else {
            hasUnchecked = true
          }
        }

        if (hasChecked && hasUnchecked) {
          return 'undetermined'
        }
      }

      if (!hasChecked) {
        return 'unchecked'
      }

      if (!hasUnchecked) {
        return 'checked'
      }
    },
    switchState(node) {
        let state = this.getDirectoryState(node)
        if (state === 'expanded') {
          this.collapse(node)
        } else if (state === 'collapsed') {
          this.expand(node)
        }
    },
    getItems() {
      let items = []

      this.traverse(function(node) {
        let path = this.getAttr(node, 'path')

        let isVisible = true
        for (let tnode of path) {
          if (this.getDirectoryState(tnode) === 'collapsed') {
            isVisible = false
            break
          }
        }
        this.setAttr(node, 'isVisible',          isVisible)
        this.setAttr(node, 'directoryState',     this.getDirectoryState(node))
        this.setAttr(node, 'isEditing',          this.getAttr(node, 'isEditing'))
        this.setAttr(node, 'isDraggable',        this.getAttr(node, 'isDraggable'))
        this.setAttr(node, 'dragOverState',      this.getAttr(node, 'dragOverState'))
        this.setAttr(node, 'height',             this.getAttr(node, 'height'))
        this.setAttr(node, 'showCheckbox',       this.getAttr(node, 'showCheckbox'))
        this.setAttr(node, 'checkboxState',      this.getAttr(node, 'checkboxState'))
        this.setAttr(node, 'isCheckboxDisabled', this.getAttr(node, 'isCheckboxDisabled'))

        items.push(node)
      }.bind(this))

      return items
    },
    refreshItems() {
      this.items = this.getItems()
    }
  },
  mounted() {
    this.refreshItems()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree {
  position: relative;
  padding-inline-start: 0;
  text-align: left;
  list-style: none;
  overflow: visible;
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
}
.node {
  cursor: pointer;
  position: relative;
  line-height: var(--height);
  font-size: 12px;
 }
.node-enter-to, .node-leave {
  height: var(--height);
  opacity: 1;
}
.node-enter, .node-leave-to {
  height: 0;
  opacity: 0;
}
.node-enter-active, .node-leave-active {
  transition: height 0.5s, opacity 0.5s;
}
.node-move {
  transition: transform 0.5s;
}
.node:hover {
  background-color: #e7f4f9;
}
.node.selected {
  background-color: #bae7ff;
}
.node .icon-and-title {
  display: inline-block;
  text-indent: 0;
  padding-left: 2px;
  padding-right: 5px;
  border-radius: 2px;
}
.node .title {
  width: auto;
}
.node .title.editing {
  display: inline-block;
  border: 1px solid blue;
  background-color: white;
  padding-left: 5px;
  padding-right: 5px;
  text-indent: 0;
}
.node .switcher {
  display: inline-block;
  width: 1em;
  height: 100%;
  text-indent: 0;
  vertical-align: middle;
}
.node .icon {
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  vertical-align: middle;
}
.node .drag-arrow-wrapper {
  width: 100%;
  height: 0;
  border: 0;
  position: absolute;
  left: 0;
  display: none;
  overflow: visible;
}
.node .drag-arrow-wrapper .arrow {
  position: relative;
  width: 20px;
  height: 20px;
  top: -10px;
  left: -8px;
}
.node.drag-over-prev .drag-arrow-wrapper {
  display: block;
  top: 0;
}
.node.drag-over-next .drag-arrow-wrapper {
  display: block;
  bottom: 0;
}
.node.drag-over-self .drag-arrow-wrapper {
  display: block;
  top: 50%;
}
.node.drag-over-self .icon-and-title {
  background-color: #bae7ff;
}
.node .checkbox-wrapper {
  display: inline-block;
  text-indent: 0;
}
.node .checkbox-wrapper .checkbox {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 1px solid #dcdee2;
  border-radius: 2px;
  text-indent: 0;
  vertical-align: middle;
  position: relative;
}
.node .checkbox-wrapper .checkbox.checked:after {
  content: "";
  background-color: transparent;
  position: absolute;
  left: 32%;
  top: 10%;
  width: 20%;
  border-bottom: 2px solid white;
  height: 50%;
  border-right: 2px solid white;
  transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
.node .checkbox-wrapper .checkbox.checked {
  color: white;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
.node .checkbox-wrapper .checkbox.checked.disabled {
  border-color: #dcdee2;
  background-color: #f5f5f5;
}
.node .checkbox-wrapper .checkbox.checked.disabled:after {
  border-color: #a6a6a6;
}
.node .checkbox-wrapper .checkbox.unchecked {
  background-color: white;
}
.node .checkbox-wrapper .checkbox.unchecked.disabled {
  background-color: #f5f5f5;
}
.node .checkbox-wrapper .checkbox.undetermined:after{
  content: '';
  border: 0;
  padding: 0;
  margin: 0;
  width: 70%;
  height: 2px;
  position: absolute;
  left: 15%;
  top: calc(50% - 1px);
  background-color: white;
}
.node .checkbox-wrapper .checkbox.undetermined{
  color: white;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
.node .checkbox-wrapper .checkbox.undetermined.disabled{
  border-color: #dcdee2;
  background-color: #f5f5f5;
}
.node .checkbox-wrapper .checkbox.undetermined.disabled:after{
  background-color: #a6a6a6;
}
</style>
