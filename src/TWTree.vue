<template>
    <ul class="tree" @dragleave="dragLeaveTree($event)" ref="tree">
      <transition-group name="node">
        <template v-for="item of items">
          <li
            v-if="item.__.isVisible"
            :class="{
              node:             true, 
              selected:         item.__.isSelected,
              'drag-over-prev': item.__.dragOverState == 'prev',
              'drag-over-next': item.__.dragOverState == 'next',
              'drag-over-self': item.__.dragOverState == 'self',
              'not-droppable':  item.__.dragOverState == null && item == dragAndDrop.hoverNode
            }"
            :style="{
              'text-indent': (item.__.level - 1) * 20 + 'px',
              '--height': item.__.height + 'px'
            }"
            @click = "open(item)"
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
              <img src="./folder.svg"      class="icon" v-if="item.hasChild === true && item.__.directoryState == 'collapsed'"/>
              <img src="./folder-open.svg" class="icon" v-else-if="item.hasChild === true && item.__.directoryState == 'expanded'"/>
              <img src="./file.svg"        class="icon" v-else/>
              <span 
                :class="{title:true, editing:item.__.isEditing}" 
                :ref="'title-' + item.id" 
                :contenteditable="item.__.isEditing" 
                @blur="inputBlur(item)">
                {{item.title}}
              </span>
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
    }
  },
  computed: {

  },
  data() {
    return {
      nodes: this.tree,
      items: this.getItems(),
      selectedNode: null,
      autoIdCounter: 0,
      defaultAttrs: {
        directoryState: 'expanded',
        isEditing: false,
        indent: '20px',
        isDraggable: true,
        dragOverState: null,
        height: 24,
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
        this.setAttr(node, 'level',  1)
        this.setAttr(node, 'parent', null)
        this.setAttr(node, 'path',   [])
        this.setAttr(node, 'pos',    i)
        this.setAttr(node, 'gpos',   i)
        stack.push(node)
      }

      while (stack.length > 0) {
        let node = stack.pop()
        if (node.hasChild === true) {
          for (let i=node.children.length-1; i>=0; i--) {
            let child = node.children[i]

            this.setAttr(child, 'level',  this.getAttr(node, 'level') + 1)
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
        if (node.id == id) {
          target = node
          return false
        }
      })

      return target
    },
    getSelectedNode() {
      return this.selectedNode
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
    getDirectoryState(node) {
      if (node.hasChild !== true) {
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
    },
    quitEdit(node) {
      this.setAttr(node, 'isEditing', false)
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
      }, 100)
    },
    inputBlur(node) {
      let titleElement = this.getTitleElement(node)
      let newTitle = titleElement.innerText
      node.title = newTitle

      this.quitEdit(node)

      this.$emit('inputBlur', node, newTitle)
    },
    inputKeypress(node) {
      let inputWidth = (this.getTitleWidth(node) + 10) + 'px'
      this.setAttr(node, 'inputWidth', inputWidth)
    },
    open(node) {
      this.select(node)
      this.$emit('open', node)
    },
    unselect() {
      if (this.selectedNode != null) {
        this.setAttr(this.selectedNode, 'isSelected', false)
      }
    },
    select(node) {
      if (this.selectedNode != null) {
        this.setAttr(this.selectedNode, 'isSelected', false)
      }
      this.setAttr(node, 'isSelected', true)
      this.selectedNode = node
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
        if (typeof(pos) == 'undefined') {
          parentNode.children.push(node)
        } else {
          parentNode.children.splice(pos, 0, node)
        }
        this.setAttr(parentNode, 'directoryState', this.getDirectoryState(parentNode))
      }
      
      this.refreshItems()
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
    },
    move(node, toParentNode, toPos) {
      this.remove(node)

      if (node.parent == toParentNode && this.getAttr(node, 'pos') < toPos) {
        toPos -= 1
      }
      this.create(node, toParentNode, toPos)
    },
    expand(node) {
      if (node.hasChild != true) {
        return
      }

      let state = this.getDirectoryState(node)
      if (state != 'collapsed') {
        return
      }

      if (this.fnLoadData == null) {
        this.setAttr(node, 'directoryState', 'expanded')
        this.refreshItems()
        return
      }

      if (this.fnLoadData != null) {
        this.setAttr(node, 'directoryState', 'loading')
        let rs = this.fnLoadData(node)

        //if the callback function returned a promise
        if (typeof(rs.then) == 'function') {
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
      if (node.hasChild != true) {
        return
      }

      let state = this.getDirectoryState(node)
      if (state != 'expanded') {
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

      if (this.dragAndDrop.srcNode == node) {
        this.setAttr(node, 'dragOverState', null)
        return
      }

      let path = this.getAttr(node, 'path')
      for (let ancestor of path) {
        if (ancestor == this.dragAndDrop.srcNode) {
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
      if (dragOverState == 'prev' && this.dragAndDrop.srcNode.parent == node.parent && nodePos == srcNodePos + 1) {
        dragOverState = null
      }
      if (dragOverState == 'next' && this.dragAndDrop.srcNode.parent == node.parent && nodePos == srcNodePos - 1) {
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

      if (dragOverState == null) {
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
      let level = this.getAttr(node, 'level')
      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'level') <= level) {
          break
        }
        if (!this.items[i].hasChild && this.getAttr(this.items[i], 'isCheckboxDisabled') === false) {
          this.setAttr(this.items[i], 'checkboxState', 'checked')
        }
      }

      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'level') <= level) {
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
      let level = this.getAttr(node, 'level')
      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'level') <= level) {
          break
        }
        if (!this.items[i].hasChild && this.getAttr(this.items[i], 'isCheckboxDisabled') === false) {
          this.setAttr(this.items[i], 'checkboxState', 'unchecked')
        }
      }

      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], 'level') <= level) {
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
      if (!node.hasChild) {
        return this.getAttr(node, 'checkboxState')
      }

      let gpos = this.getAttr(node, 'gpos');
      let level = this.getAttr(node, 'level')

      let hasChecked = false
      let hasUnchecked = false
      for (let i=gpos+1; i<this.items.length; i++) {
        if (this.getAttr(this.items[i], 'level') <= level) {
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
          if (this.getDirectoryState(tnode) == 'collapsed') {
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
  width: 1.3em;
  height: 1.3em;
  margin-right: 5px;
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
  left: 0.32em;
  top: 0.1em;
  width: 0.2em;
  border-bottom: 2px solid white;
  height: 0.5em;
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
  width: 0.7em;
  height: 2px;
  position: absolute;
  left: 0.15em;
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
