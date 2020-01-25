<template>
  <div>
    <ul class="tree">
      <template v-for="item of items">
        <li
          v-if="item.__.isVisible"
          :class="{
            node: true, selected: item.__.isSelected,
            'drag-over-top':    item.__.dragOverState == 'top',
            'drag-over-bottom': item.__.dragOverState == 'bottom',
            'drag-over-body':   item.__.dragOverState == 'body'
          }"
          :style="{'text-indent': (item.__.level - 1) * 20 + 'px'}"
          @click = "open(item)"
          :draggable="item.__.isDraggable"
          @dragstart="dragStart(item, $event)"
          @dragover="dragOver(item, $event)"
          @dragend="dragEnd()"
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
          <img src="./folder.svg"      class="icon" v-if="item.hasChild === true && item.__.directoryState == 'collapsed'"/>
          <img src="./folder-open.svg" class="icon" v-else-if="item.hasChild === true && item.__.directoryState == 'expanded'"/>
          <img src="./file.svg"        class="icon" v-else/>
          <span 
            :class="{title:true, editing:item.__.isEditing}" 
            :ref="'tw-title-' + item.id" 
            :contenteditable="item.__.isEditing" 
            @blur="inputBlur(item)">{{item.title}}</span>
          <div v-if="item.__.dragOverState !== null" class="drag-over-back">
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
        </li>
      </template>
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
        dragOverState: null
      },
      dragAndDrop: {
        isOnGoing: false,
        srcNode: null,
        hoverNode: null,
        hoverState: null,
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
      let refId = 'tw-title-' + node.id
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
    create(parentNode, node, pos) {
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
      this.dragAndDrop.srcNode = node
      event.dataTransfer.setData("node", node);
      event.dataTransfer.setDragImage()
    },
    dragOver(node, event) {
      if (this.dragAndDrop.hoverNode !== node) {
        this.dragLeave(this.dragAndDrop.hoverNode)
        this.dragEnter(node)
      }

      if (this.dragAndDrop.srcNode == node) {
        return
      }

      let nodeElement = this.getNodeElement(node)
      let nodeHeight = nodeElement.clientHeight
      let y = event.pageY - this.getNodeOffsetTop(node)

      let dragOverState = null

      if (y < nodeHeight * 0.33) {
        dragOverState = 'top'
      } else if (nodeHeight - y < nodeHeight * 0.33) {
        dragOverState = 'bottom'
      } else {
        dragOverState = 'body'
      }

      this.setAttr(node, 'dragOverState', dragOverState)
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
        this.setAttr(node, 'isVisible',      isVisible)
        this.setAttr(node, 'directoryState', this.getDirectoryState(node))
        this.setAttr(node, 'isEditing',      this.getAttr(node, 'isEditing'))
        this.setAttr(node, 'isDraggable',    this.getAttr(node, 'isDraggable'))
        this.setAttr(node, 'dragOverState',  this.getAttr(node, 'dragOverState'))

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
}
.node {
  cursor: pointer;
  position: relative;
  height: 2em;
  line-height: 2em;
  font-size: 12px;
}
.node:hover {
  background-color: #e7f4f9;
}
.node.selected {
  background: linear-gradient(to bottom, #beebff 0, #a8e4ff 100%);
}
.node .drag-over-back {
  width: 100%;
  height: 2px;
  border: 0;
  position: absolute;
  left: 0;
  background-color: blue;
  display: none;
  overflow: visible;
}
.node .drag-over-back .arrow {
  position: absolute;
  width: 14px;
  height: 14px;
  top: -5px;
}
.node.drag-over-top .drag-over-back {
  display: block;
  top: 0;
}
.node.drag-over-bottom .drag-over-back {
  display: block;
  bottom: 0;
}
.node.drag-over-body .drag-over-back {
  display: none;
}
.node.drag-over-body {
  background: linear-gradient(to bottom, #beebff 0, #a8e4ff 100%);
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
</style>
