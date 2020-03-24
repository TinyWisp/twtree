<template>
  <div class="tree-wrapper">
    <ul 
      class="tree"
      @dragleave="dragLeaveTree($event)"
      ref="tree"
      :style="{
        '--dragImageOffsetX': dragImageOffsetX,
        '--dragImageOffsetY': dragImageOffsetY
      }">
      <transition-group name="node">
        <template v-for="item of items">
          <li
            v-if="item.__.isVisible"
            :class="{
              node:             true, 
              selected:         item.__.isSelected,
              'search-result':  item.__.isSearchResult,
              'drag-over-prev': item.__.dragOverArea === 'prev' && item.__.isDroppable,
              'drag-over-next': item.__.dragOverArea === 'next' && item.__.isDroppable,
              'drag-over-self': item.__.dragOverArea === 'self' && item.__.isDroppable
            }"
            :style="{
              'text-indent': item.__.fullIndent,
              '--height': item.style.height,
              '--fontSize': item.style.fontSize,
              '--hoverBgColor': item.style.hoverBgColor,
              '--selectedBgColor': item.style.selectedBgColor,
              '--mousex': item.__.mousex,
              '--mousey': item.__.mousey,
            }"
            :draggable="true"
            @click = "clickEvent(item)"
            @contextmenu = "contextMenuEvent(item, $event)"
            @dragstart="dragStartEvent(item, $event)"
            @dragover="dragOverEvent(item, $event)"
            @dragend="dragEndEvent()"
            @drop="dropEvent()"
            :ref="'node-' + item.id"
            :key="item.id">
            <span class="switcher-wrapper" @click.stop="toggleDirectoryState(item)">
              <slot name="switcher" v-bind:node="item">
                <svg class="switcher-icon expanded" viewBox="-7 -3 46 46" width="1em" height="1em" fill="currentColor" aria-hidden="true" v-if="item.directoryState === 'expanded'">
                  <path d="M30 10 L16 26 2 10 Z" />
                </svg>
                <svg class="switcher-icon collapsed" viewBox="-7 -3 46 46" width="1em" height="1em" fill="currentColor" aria-hidden="true" v-else-if="item.directoryState === 'collapsed'">
                  <path d="M10 30 L26 16 10 2 Z" />
                </svg>
                <svg class="switcher-icon loading" viewBox="0 0 32 32" width="1em" height="1em" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" v-else-if="item.directoryState === 'loading'">
                  <path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2" />
                </svg>
              </slot>
            </span>
            <span class="checkbox-wrapper" v-if="item.checkbox.show">
              <span
                :class="{
                  checkbox:     true,
                  checked:      item.checkbox.state === 'checked',
                  unchecked:    item.checkbox.state === 'unchecked',
                  undetermined: item.checkbox.state === 'undetermined',
                  disabled:     item.checkbox.disable
                }"
                @click.stop="toggleCheckbox(item)">
              </span>
            </span>
            <span class="icon-and-title" :ref="'icon-and-title-' + item.id ">
              <span icon="icon-wrapper">
                <slot name="icon" v-bind:node="item">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="icon" v-if="item.hasChild && (item.directoryState === 'collapsed' || item.directoryState === 'expanded')">
                    <path d="M2 26 L30 26 30 7 14 7 10 4 2 4 Z M30 12 L2 12" />
                  </svg>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="icon" v-else>
                    <path d="M6 2 L6 30 26 30 26 10 18 2 Z M18 2 L18 10 26 10" />
                  </svg>
                </slot>
              </span>
              <slot name="title" v-bind:node="item">
                <span 
                  :class="{title:true, editing:item.__.isEditing}" 
                  :ref="'title-' + item.id" 
                  :contenteditable="item.__.isEditing"
                  @keydown="keydownEvent(item, $event)"
                  @keyup="keyupEvent(item, $event)"
                  @keypress="keypressEvent(item, $event)"
                  @input="inputEvent(item, $event)"
                  @focus="focusEvent(item, $event)"
                  @blur="blurEvent(item)">{{item.title}}</span>
              </slot>
            </span>
            <span class="extra-wrapper">
              <slot name="extra" v-bind:node="item">
              </slot>
            </span>
            <div class="contextmenu-wrapper" v-if="item.__.showContextMenu">
              <slot name="contextmenu" v-bind:node="item">
              </slot>
            </div>
            <div class="drag-arrow-wrapper" v-if="item.__.dragOverArea !== null">
              <slot name="drag-arrow" v-bind:node="item">
                <svg class="arrow" viewBox="0 0 24 24">
                  <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                </svg>
              </slot>
            </div>
            <div class="drag-image-wrapper" v-if="item.__.dragOverArea !== null">
              <slot name="drag-image" v-bind:node="item" v-bind:dnd="dragAndDrop">
                <span class="drag-image">{{dragAndDrop.dragNode.title}}</span>
              </slot>
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
    defaultAttrs: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dragImageOffsetX: {
      type: String,
      default: '20px'
    },
    dragImageOffsetY: {
      type: String,
      default: '10px'
    },
    fnLoadData: {
      type: Function,
      required: false,
      default: null
    },
    fnIsDroppable: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeDrag: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeCheck: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeUncheck: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeSelect: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeExpand: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeCollapse: {
      type: Function,
      required: false,
      default: null
    },
    fnBeforeContextMenu: {
      type: Function,
      required: false,
      default: null
    },
    fnMatch: {
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
      spareDefaultAttrs: {
        directoryState: 'expanded',
        checkbox: {
          show: false,
          disable: false,
          state: 'unchecked'
        },
        style: {
          height: '2em',
          indent: '20px',
          fontSize: '12px',
          hoverBgColor: '#e7f4f9',
          selectedBgColor: '#bae7ff',
          paddingTop: 0,
          paddingBottom: 0
        },
        __: {
          isSelected: false,
          isEditing: false,
          isSearchResult: false,
          isDroppable: true,
          dragOverArea: null,
          indent: '20px',
          height: '2em',
          mousex: 0,
          mousey: 0
        }
      },
      dragAndDrop: {
        dragNode: null,
        overNode: null,
        overArea: null,
        isDroppable: false,
      },
      contextMenu: {
        node: null
      }
    }
  },
  methods: {
    traverse (fnDoSomething) {
      for (let i=0; i<this.items.length; i++) {
        let node = this.items[i]
        fnDoSomething(node)
      }
    },
    getItems() {
      if (!Array.isArray(this.nodes)) {
        return []
      }

      let items = []
      let stack = []

      for (let i=this.nodes.length-1; i>=0; i--) {
        let node = this.nodes[i]
        this.setAttr(node, '__', 'depth',  1)
        this.setAttr(node, '__', 'parent', null)
        this.setAttr(node, '__', 'path',   [])
        this.setAttr(node, '__', 'pos',    i)
        stack.push(node)
      }

      while (stack.length > 0) {
        let node = stack.pop()
        items.push(node)

        if (node.hasChild) {
          if (!node.hasOwnProperty('children')) {
            this.$set(node, 'children', [])
          }

          for (let i=node.children.length-1; i>=0; i--) {
            let child = node.children[i]

            this.setAttr(child, '__', 'depth',  this.getAttr(node, '__', 'depth') + 1)
            this.setAttr(child, '__', 'parent', node)
            this.setAttr(child, '__', 'path',   [...this.getAttr(node, '__', 'path'), node])
            this.setAttr(child, '__', 'pos',    i)

            stack.push(child)
          }
        }
      }

      for (let i=0; i<items.length; i++) {
        let node = items[i]

        if (!node.hasOwnProperty('id')) {
          this.$set(node, 'id', this.generateId())
        }

        let path = this.getAttr(node, '__', 'path')
        let isVisible = true
        for (let tnode of path) {
          if (this.getDirectoryState(tnode) === 'collapsed') {
            isVisible = false
            break
          }
        }

        let fullIndent = 0
        if (path.length === 1) {
          fullIndent = this.getAttr(node, 'style', 'indent')
        } else if (path.length > 1) {
          let indents = []
          for (let i=1; i<path.length; i++) {
            let indent = this.getAttr(path[i], 'style', 'indent')
            indents.push(indent)
          }
          let indent = this.getAttr(node, 'style', 'indent')
          indents.push(indent)
          fullIndent = 'calc(' + indents.join(' + ') + ')'
        }

        this.setAttr(node, 'directoryState',  this.getDirectoryState(node))

        this.setAttr(node, 'checkbox', 'show',    this.getAttr(node, 'checkbox', 'show'))
        this.setAttr(node, 'checkbox', 'disable', this.getAttr(node, 'checkbox', 'disable'))
        this.setAttr(node, 'checkbox', 'state',   this.getAttr(node, 'checkbox', 'state'))

        this.setAttr(node, 'style', 'height',          this.getAttr(node, 'style', 'height'))
        this.setAttr(node, 'style', 'indent',          this.getAttr(node, 'style', 'indent'))
        this.setAttr(node, 'style', 'fontSize',        this.getAttr(node, 'style', 'fontSize'))
        this.setAttr(node, 'style', 'hoverBgColor',    this.getAttr(node, 'style', 'hoverBgColor'))
        this.setAttr(node, 'style', 'selectedBgColor', this.getAttr(node, 'style', 'selectedBgColor'))

        this.setAttr(node, '__', 'gpos',           i)
        this.setAttr(node, '__', 'isVisible',      isVisible)
        this.setAttr(node, '__', 'isSelected',     this.getAttr(node, '__', 'isSelected'))
        this.setAttr(node, '__', 'isEditing',      this.getAttr(node, '__', 'isEditing'))
        this.setAttr(node, '__', 'isSearchResult', this.getAttr(node, '__', 'isSearchResult'))
        this.setAttr(node, '__', 'isDroppable',    this.getAttr(node, '__', 'isDroppable'))
        this.setAttr(node, '__', 'dragOverArea',   this.getAttr(node, '__', 'dragOverArea'))
        this.setAttr(node, '__', 'height',         this.getAttr(node, '__', 'height'))
        this.setAttr(node, '__', 'mousex',         this.getAttr(node, '__', 'mousex'))
        this.setAttr(node, '__', 'mousey',         this.getAttr(node, '__', 'mousey'))
        this.setAttr(node, '__', 'fullIndent',     fullIndent)
      }

      return items
    },
    refreshItems() {
      this.items = this.getItems()
      this.refreshAllDirectoryCheckboxState()
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
    setAttr() {
      if (arguments.length === 3) {
        let node = arguments[0]
        let key = arguments[1]
        let val = arguments[2]
        this.$set(node, key, val) 
      }

      if (arguments.length === 4) {
        let node = arguments[0]
        let key = arguments[1]
        let subKey = arguments[2]
        let val = arguments[3]

        if (!node.hasOwnProperty(key)) {
          this.$set(node, key, {})
        }

        this.$set(node[key], subKey, val)
      }
    },
    getAttr() {
      if (arguments.length === 2) {
        let node = arguments[0]
        let key = arguments[1]

        if (node.hasOwnProperty(key)) {
          return node[key]
        }

        if (this.defaultAttrs.hasOwnProperty(key)) {
          return this.defaultAttrs[key]
        }

        if (this.spareDefaultAttrs.hasOwnProperty(key)) {
          return this.spareDefaultAttrs[key]
        }
      }

      if (arguments.length === 3) {
        let node = arguments[0]
        let key = arguments[1]
        let subKey = arguments[2]

        if (node.hasOwnProperty(key) && node[key].hasOwnProperty(subKey)) {
          return node[key][subKey]
        }

        if (this.defaultAttrs.hasOwnProperty(key) && this.defaultAttrs[key].hasOwnProperty(subKey)) {
          return this.defaultAttrs[key][subKey]
        }

        if (this.spareDefaultAttrs.hasOwnProperty(key) && this.spareDefaultAttrs[key].hasOwnProperty(subKey)) {
          return this.spareDefaultAttrs[key][subKey]
        }
      }
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

      let directoryState = this.getAttr(node, 'directoryState')
      if (directoryState === null) {
        directoryState = (this.defaultAttrs.hasOwnProperty('directoryState') && this.defaultAttrs.directoryState !== null)
          ? this.defaultAttrs.directoryState
          : 'expanded'
      }

      return directoryState
    },
    generateId() {
      this.autoIdCounter += 1
      return 'twtree-node-' + this.autoIdCounter
    },
    edit(node) {
      this.setAttr(node, '__', 'newTitle', node.title)
      this.setAttr(node, '__', 'isEditing', true)
      this.$emit('edit', node)

      let titleElement = this.getTitleElement(node)
      setTimeout(function() {
        let range = document.createRange();
        let selection = window.getSelection();
        range.setStart(titleElement.childNodes[0], node.title.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        titleElement.focus();
      }.bind(this), 100)
    },
    quitEdit(node) {
      this.setAttr(node, '__', 'isEditing', false)
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
      }.bind(this), 100)
    },
    focusEvent(node, event) {
      this.$emit('focus', node, event)
    },
    blurEvent(node, event) {
      this.$emit('blur', node, event)
    },
    inputEvent(node, event) {
      this.$emit('input', node, event)
    },
    keydownEvent(node, event) {
      this.$emit('keydown', node, event)
    },
    keyupEvent(node, event) {
      this.$emit('keyup', node, event)
    },
    keypressEvent(node, event) {
      this.$emit('keypress', node, event)
    },
    getNewTitle(node) {
      let titleElement = this.getTitleElement(node)
      let newTitle = titleElement.innerText

      return newTitle
    },
    deselect(node) {
      let i = this.selected.indexOf(node)

      if (i !== -1) {
          this.setAttr(node, '__', 'isSelected', false)
          this.selected.splice(i, 1)
          this.$emit('deselect', node)
      }
    },
    select(node) {
      if (this.selected.indexOf(node) >= 0) {
        return
      }

      if (typeof(this.fnBeforeSelect) === 'function' && this.fnBeforeSelect(node) === false) {
        return
      }

      this.setAttr(node, '__', 'isSelected', true)
      this.selected.push(node)
      this.$emit('select', node)

      while (this.maxSelectCount < this.selected.length) {
        this.deselect(this.selected[0])
      }
    },
    clickEvent(node) {
      this.select(node)
      this.hideContextMenuOnDisplay()
    },
    contextMenuEvent(node, event) {
      if (typeof(this.fnBeforeContextMenu) === 'function' && this.fnBeforeContextMenu(node, event) === false) {
        return
      }

      if (this.contextMenu.node !== node) {
        this.hideContextMenuOnDisplay()
        this.select(node)
      }

      let nodeOffset = this.getOffset(node)
      let mousex = event.pageX - nodeOffset.left
      let mousey = event.pageY - nodeOffset.top
      this.setAttr(node, '__', 'mousex', mousex + 'px')
      this.setAttr(node, '__', 'mousey', mousey + 'px')
      this.setAttr(node, '__', 'showContextMenu', true)
      this.contextMenu.node = node
      event.preventDefault()
    },
    hideContextMenuOnDisplay() {
      if (this.contextMenu.node !== null) {
        this.setAttr(this.contextMenu.node, '__', 'showContextMenu', false)
      }
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
      let parent = this.getAttr(node, '__', 'parent')
      let pos = this.getAttr(node, '__', 'pos')

      if (parent === null) {
        this.nodes.splice(pos, 1)
      } else {
        parent.children.splice(pos, 1)
        parent.hasChild = (parent.children.length > 0)
        this.setAttr(parent, 'directoryState', this.getDirectoryState(parent))
      }

      let spos = this.selected.indexOf(node)
      this.selected.splice(spos, 1)

      this.refreshItems()
      this.$emit('remove', node)
    },
    move(node, toParent, toPos) {
      let fromParent = this.getAttr(node, '__', 'parent')
      let fromPos = this.getAttr(node, '__', 'pos')

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
    search(keyword) {
      let matches = []

      for (let node of this.items) {
        let match = this.fnMatch !== null
          ? this.fnMatch(node, keyword)
          : (node.title.indexOf(keyword) > -1)
        this.setAttr(node, '__', 'isSearchResult', match)
        /*if (node.hasChild) {
          this.setAttr(node, 'directoryState', 'collapsed')
        }*/
        if (match) {
          matches.push(node)
        }
      }

      for (let node of matches) {
        let path = this.getAttr(node, '__', 'path')
        for (let pnode of path) {
          this.setAttr(pnode, 'directoryState', 'expanded')
        }
      }

      this.refreshItems()
    },
    clearSearchResult() {
      for (let node of this.items) {
        this.setAttr(node, '__', 'isSearchResult', false)
      }
    },
    expand(node) {
      if (!node.hasChild) {
        return
      }

      let state = this.getDirectoryState(node)
      if (state != 'collapsed') {
        return
      }

      if (typeof(this.fnBeforeExpand) === 'function' && this.fnBeforeExpand(node) === false) {
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
            this.setAttr(node, 'directoryState', 'collapsed')
            console.log(e)
          }.bind(this))
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

      if (typeof(this.fnBeforeCollapse) === 'function' && this.fnBeforeCollapse(node) === false) {
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
    getOffset(node) {
      let nodeElement = this.getNodeElement(node)
      let offsetLeft  = nodeElement.offsetLeft
      let offsetTop   = nodeElement.offsetTop

      let reference = nodeElement.offsetParent
      while(reference){
        offsetLeft += reference.offsetLeft
        offsetTop  += reference.offsetTop
        reference   = reference.offsetParent
      }

      return {
        left: offsetLeft,
        top: offsetTop
      }
    },
    isDroppable() {
      if (this.dragAndDrop.dragNode === this.dragAndDrop.overNode) {
        return false
      }

      let path = this.getAttr(this.dragAndDrop.overNode, '__', 'path')
      for (let ancestor of path) {
        if (ancestor === this.dragAndDrop.dragNode) {
          return false
        }
      }

      if (this.dragAndDrop.dragNode.parent === this.dragAndDrop.overNode.parent) {
        let dragNodePos = this.getAttr(this.dragAndDrop.dragNode, '__', 'pos')
        let overNodePos = this.getAttr(this.dragAndDrop.overNode, '__', 'pos')
        if (this.dragAndDrop.overArea === 'prev' && overNodePos === dragNodePos + 1) {
          return false
        }

        if (this.dragAndDrop.overArea === 'next' && overNodePos === dragNodePos - 1) {
          return false
        }
      }

      if (this.fnIsDroppable !== null) {
        return this.fnIsDroppable(this.dragAndDrop)
      }

      return true
    },
    dragStartEvent(node, event) {
      if (typeof(this.fnBeforeDrag) === 'function' && this.fnBeforeDrag(node) === false) {
        event.preventDefault()
        return
      }

      let ghostElement = document.createElement('span')
      this.dragAndDrop.dragNode = node
      event.dataTransfer.setData('text', node.id);
      event.dataTransfer.setDragImage(ghostElement, 0, 0)
      event.dataTransfer.dropEffect = 'move'

      this.$emit('dragStart', this.dragAndDrop)
    },
    dragOverEvent(node, event) {
      if (this.dragAndDrop.overNode !== node) {
        this.dragLeave(this.dragAndDrop.overNode)
        this.dragEnter(node)
      }

      let nodeElement = this.getNodeElement(node)
      let nodeHeight = nodeElement.clientHeight
      let offset = this.getOffset(node)
      let x = event.pageX - offset.left
      let y = event.pageY - offset.top

      this.setAttr(node, '__', 'mousex', x + 'px')
      this.setAttr(node, '__', 'mousey', y + 'px')

      if (y < nodeHeight * 0.33) {
        this.dragAndDrop.overArea = 'prev'
      } else if (nodeHeight - y < nodeHeight * 0.33) {
        this.dragAndDrop.overArea = 'next'
      } else {
        this.dragAndDrop.overArea = 'self'
      }

      this.dragAndDrop.isDroppable = this.isDroppable()

      this.setAttr(node, '__', 'dragOverArea', this.dragAndDrop.overArea)
      this.setAttr(node, '__', 'isDroppable',  this.dragAndDrop.isDroppable)
      event.preventDefault()

      this.$emit('dragOver', this.dragAndDrop)
    },
    dragEnter(node) {
      this.dragAndDrop.overNode = node
      this.$emit('dragEnter', this.dragAndDrop, node)
    },
    dragLeave(node) {
      if (node !== null) {
        this.setAttr(node, '__', 'dragOverArea', null)
      }
      this.$emit('dragLeave', this.dragAndDrop, node)
    },
    dragEndEvent() {
      if (this.dragAndDrop.overNode !== null) {
        this.dragLeave(this.dragAndDrop.overNode)
        this.dragAndDrop.overNode = null
      }
      this.$emit('dragEnd', this.dragAndDrop)
    },
    dropEvent() {
      if (this.dragAndDrop.isDroppable === false) {
        return
      }

      let dragNode = this.dragAndDrop.dragNode
      let dropNode = this.dragAndDrop.overNode
      let dropNodePos = this.getAttr(dropNode, '__', 'pos')
      let dropNodeParent = this.getAttr(dropNode, '__', 'parent')

      switch (this.dragAndDrop.overArea) {
        case 'prev':
          this.move(dragNode, dropNodeParent, dropNodePos)
          break

        case 'next':
          this.move(dragNode, dropNodeParent, dropNodePos + 1)
          break

        case 'self':
          this.move(dragNode, dropNode)
          break
      }

      this.$emit('drop', this.dragAndDrop)
    },
    dragLeaveTree(event) {
      let treeElement = this.$refs.tree
      let treeWidth = treeElement.clientWidth
      let treeHeight = treeElement.clientHeight

      if (event.offsetX <= 0 || event.offsetX >= treeWidth || event.offsetY <= 0 || event.offsetY >= treeHeight) {
        if (this.dragAndDrop.overNode !== null) {
          this.dragLeave(this.dragAndDrop.overNode)
          this.dragAndDrop.overNode = null
        }
      }
    },
    setCheckboxState(node, state) {
      if (this.getAttr(node, 'checkbox', 'show') === false) {
        return
      }

      let oldState = this.getAttr(node, 'checkbox', 'state')
      if (oldState !== state) {
        this.setAttr(node, 'checkbox', 'state', state)
        this.$emit('checkboxStateChange', node, oldState, state)
      }
    },
    check(node) {
      if (typeof(this.fnBeforeCheck) === 'function' && this.fnBeforeCheck(node) === false) {
          return
      }

      let gpos = this.getAttr(node, '__', 'gpos')
      let depth = this.getAttr(node, '__', 'depth')
      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], '__', 'depth') <= depth) {
          break
        }
        if (!this.items[i].hasChild && this.getAttr(this.items[i], 'checkbox', 'show') === true && this.getAttr(this.items[i], 'checkbox', 'disable') === false) {
          this.setCheckboxState(this.items[i], 'checked')
        }
      }

      let path = this.getAttr(node, '__', 'path')
      let top = path.length > 0
        ? path[0]
        : node
      this.refreshDirectoryCheckboxStateRecursively(top)

      this.$emit('check', node)
    },
    uncheck(node) {
      if (typeof(this.fnBeforeUncheck) === 'function' && this.fnBeforeUncheck(node) === false) {
          return
      }

      let gpos = this.getAttr(node, '__', 'gpos')
      let depth = this.getAttr(node, '__', 'depth')
      for (let i=gpos; i<this.items.length; i++) {
        if (i > gpos && this.getAttr(this.items[i], '__', 'depth') <= depth) {
          break
        }
        if (!this.items[i].hasChild && this.getAttr(this.items[i], 'checkbox', 'show') === true && this.getAttr(this.items[i], 'checkbox', 'disable') === false) {
          this.setCheckboxState(this.items[i], 'unchecked')
        }
      }

      let path = this.getAttr(node, '__', 'path')
      let top = path.length > 0
        ? path[0]
        : node
      this.refreshDirectoryCheckboxStateRecursively(top)

      this.$emit('uncheck', node)
    },
    toggleCheckbox(node) {
      let checkboxState = this.getAttr(node, 'checkbox', 'state')

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
    refreshAllDirectoryCheckboxState() {
      for (let node of this.nodes) {
        this.refreshDirectoryCheckboxStateRecursively(node)
      }
    },
    refreshDirectoryCheckboxStateRecursively(node) {
      if (this.getAttr(node, 'checkbox', 'show') === false) {
        return {
          hasChecked: false,
          hasUnchecked: false
        }
      }

      if (!node.hasChild) {
        let state = this.getAttr(node, 'checkbox', 'state')
        return {
          hasChecked: state === 'checked',
          hasUnchecked: state === 'unchecked'
        }
      }

      let hasChecked = false
      let hasUnchecked = false
      for (let tnode of node.children) {
        let rs = this.refreshDirectoryCheckboxStateRecursively(tnode)
        hasChecked = hasChecked || rs.hasChecked
        hasUnchecked = hasUnchecked || rs.hasUnchecked

        if (hasChecked && hasUnchecked) {
          break
        }
      }

      if (hasChecked && hasUnchecked) {
        this.setCheckboxState(node, 'undetermined')
      } else if (hasChecked && !hasUnchecked) {
        this.setCheckboxState(node, 'checked')
      } else if (!hasChecked && hasUnchecked) {
        this.setCheckboxState(node, 'unchecked')
      } else if (!hasChecked && !hasUnchecked) {
        this.setCheckboxState(node, this.getAttr(node, 'checkbox', 'state'))
      }

      return {
        hasChecked: hasChecked,
        hasUnchecked: hasUnchecked
      }
    },
    getNodesByCheckboxState(state) {
      let arr = []

      for (let i=0; i<this.items.length; i++) {
        if (this.getAttr(this.items[i], 'checkbox', 'show') === true && this.getAttr(this.items[i], 'checkbox', 'state') === state) {
          arr.push(this.items[i])
        }
      }

      return arr
    },
    getChecked() {
      return this.getNodesByCheckboxState('checked')
    },
    getUndetermined() {
      return this.getNodesByCheckboxState('undetermined')
    },
    getUnchecked() {
      return this.getNodesByCheckboxState('unchecked')
    },
    toggleDirectoryState(node) {
        let state = this.getDirectoryState(node)
        if (state === 'expanded') {
          this.collapse(node)
        } else if (state === 'collapsed') {
          this.expand(node)
        }
    }
  },
  mounted() {
    this.refreshItems()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree-wrapper .tree {
  position: relative;
  padding-inline-start: 0;
  text-align: left;
  list-style: none;
  overflow: visible;
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  width: 100%;
}
.node {
  cursor: pointer;
  position: relative;
  line-height: var(--height);
  font-size: var(--fontSize);
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
  background-color: var(--hoverBgColor);
}
.node.selected {
  background-color: var(--selectedBgColor);
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
.node .switcher-wrapper {
  text-indent: 0;
  vertical-align: middle;
}
.node .switcher-wrapper .switcher-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
.node .switcher-wrapper .switcher-icon.loading {
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
.node .icon {
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  vertical-align: middle;
}
.node.search-result .title {
  color: brown;
  font-weight: bold;
}
.node .extra-wrapper {
  display: none;
  text-indent: 0;
}
.node:hover .extra-wrapper {
  display: inline-block;
}
.node .drag-arrow-wrapper {
  height: 0;
  width: 100%;
  border: 0;
  position: absolute;
  left: 0;
  display: none;
  overflow: visible;
  z-index: 10;
  flex-direction: row;
  align-items: center;
}
.node .drag-arrow-wrapper .arrow {
  position: relative;
  width: 20px;
  height: 20px;
  left: -8px;
  top: -10px;
  stroke: #5cb85c;
  fill: #5cb85c;
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
.node.not-droppable .not-droppable-sign {
  text-indent: 0;
  position: absolute;
  left: var(--mousex);
  top: calc(var(--mousey) + 0.5em);
  z-index: 10;
}
.node .drag-image-wrapper {
  display: block;
  position: absolute;
  z-index: 11;
  left: calc(var(--mousex) + var(--dragImageOffsetX));
  top: calc(var(--mousey) + var(--dragImageOffsetY));
  text-indent: 0;
}
.node .drag-image-wrapper .drag-image {
  text-indent: 0;
  width: auto;
  height: 1.5em;
  line-height: 1.5em;
  padding: 0.3em 0.5em;
  border: 0;
  border-radius: 5px;
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
  cursor: not-allowed;
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
.node .contextmenu-wrapper {
  position: absolute;
  display: block;
  left: var(--mousex);
  top: var(--mousey);
  z-index: 100;
  text-indent: 0;
}
</style>
