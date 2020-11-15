<template>
  <div class="twtree-wrapper" tabindex="1" @blur="treeBlurEvent">
    <ul 
      class="twtree"
      @dragleave="dragLeaveTree($event)"
      ref="tree"
      :style="{
        '--dragImageOffsetX': dragImageOffsetX,
        '--dragImageOffsetY': dragImageOffsetY,
        '--animationDuration': animationDuration,
        '--treeWidth': treeWidth + 'px'
      }">
      <transition-group name="twtree-node">
        <template v-for="item of items">
          <li
            v-if="item.__.isVisible"
            :class="{
              'twtree-node':                true, 
              'twtree-node-selected':       item.selected,
              'twtree-node-search-result':  item.__.isSearchResult,
              'twtree-node-drag-over-prev': item.__.dragOverArea === 'prev' && item.__.isDroppable,
              'twtree-node-drag-over-next': item.__.dragOverArea === 'next' && item.__.isDroppable,
              'twtree-node-drag-over-self': item.__.dragOverArea === 'self' && item.__.isDroppable
            }"
            :style="{
              '--fullIndent':          item.__.fullIndent,
              '--height':              item.style.height,
              '--fontSize':            item.style.fontSize,
              '--bgColor':             item.style.bgColor,
              '--hoverBgColor':        item.style.hoverBgColor,
              '--selectedBgColor':     item.style.selectedBgColor,
              '--dragOverBgColor':     item.style.dragOverBgColor,
              '--switcherMarginRight': item.style.switcherMarginRight,
              '--iconMarginRight':     item.style.iconMarginRight,
              '--checkboxMarginRight': item.style.checkboxMarginRight,
              '--extraFloat':          item.style.extraFloatRight ? 'right' : 'none',
              '--extraDisplay':        item.style.extraAlwaysVisible ? 'inline-block' : 'none',
              '--titleMaxWidth':       item.__.titleMaxWidth,
              '--titleOverflow':       item.style.titleOverflow,
              '--mousex':              item.__.mousex,
              '--mousey':              item.__.mousey,
              '--marginTop':           item.style.marginTop,
              '--marginBottom':        item.style.marginBottom
            }"
            :draggable="true"
            @click = "clickEvent(item, $event)"
            @contextmenu = "contextMenuEvent(item, $event)"
            @dragstart="dragStartEvent(item, $event)"
            @dragover="dragOverEvent(item, $event)"
            @dragend="dragEndEvent()"
            @drop="dropEvent()"
            :ref="'node-' + item.id"
            :key="item.id">
            <span class="twtree-switcher-wrapper" v-if="item.style.showSwitcher" @click.stop="toggleDirectoryState(item)">
              <slot name="switcher" v-bind:node="item">
                <svg class="twtree-switcher-icon twtree-switcher-expanded" viewBox="-7 -3 46 46" fill="currentColor" aria-hidden="true" v-if="item.directoryState === 'expanded'">
                  <path d="M30 10 L16 26 2 10 Z" />
                </svg>
                <svg class="twtree-switcher-icon twtree-switcher-collapsed" viewBox="-7 -3 46 46" fill="currentColor" aria-hidden="true" v-else-if="item.directoryState === 'collapsed'">
                  <path d="M10 30 L26 16 10 2 Z" />
                </svg>
                <svg class="twtree-switcher-icon twtree-switcher-loading" viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" v-else-if="item.directoryState === 'loading'">
                  <path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2" />
                </svg>
              </slot>
            </span>
            <span class="twtree-checkbox-wrapper" v-if="item.checkbox.show" @click.stop="toggleCheckbox(item)">
              <slot name="checkbox" v-bind:node="item">
                <span
                  :class="{
                    'twtree-checkbox':              true,
                    'twtree-checkbox-checked':      item.checkbox.state === 'checked',
                    'twtree-checkbox-unchecked':    item.checkbox.state === 'unchecked',
                    'twtree-checkbox-undetermined': item.checkbox.state === 'undetermined',
                    'twtree-checkbox-disabled':     item.checkbox.disable
                  }">
                </span>
              </slot>
            </span>
            <span class="twtree-icon-and-title" :ref="'icon-and-title-' + item.id ">
              <span class="twtree-icon-wrapper" v-if="item.style.showIcon">
                <slot name="icon" v-bind:node="item">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="twtree-icon" v-if="item.hasChild && (item.directoryState === 'collapsed' || item.directoryState === 'expanded')">
                    <path d="M2 26 L30 26 30 7 14 7 10 4 2 4 Z M30 12 L2 12" />
                  </svg>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="twtree-icon" v-else>
                    <path d="M6 2 L6 30 26 30 26 10 18 2 Z M18 2 L18 10 26 10" />
                  </svg>
                </slot>
              </span>
              <span class="twtree-title-wrapper" :ref="'title-' + item.id">
                <slot name="title" v-bind:node="item">
                  <span 
                    :class="{'twtree-title':true, 'twtree-title-editing':item.__.isEditing}" 
                    :contenteditable="item.__.isEditing"
                    :title="item.__.titleTip"
                    @keydown="keydownEvent(item, $event)"
                    @keyup="keyupEvent(item, $event)"
                    @keypress="keypressEvent(item, $event)"
                    @input="inputEvent(item, $event)"
                    @focus="focusEvent(item, $event)"
                    @blur="blurEvent(item)"
                    @mouseenter="mouseenterEvent(item)">{{item.title}}</span>
                </slot>
              </span>
            </span>
            <span class="twtree-extra-wrapper">
              <slot name="extra" v-bind:node="item">
              </slot>
            </span>
            <div class="twtree-contextmenu-wrapper" v-if="item.__.showContextMenu">
              <slot name="contextmenu" v-bind:node="item">
              </slot>
            </div>
            <div class="twtree-drag-arrow-wrapper" v-if="item.__.dragOverArea !== null">
              <slot name="drag-arrow" v-bind:node="item">
                <svg class="twtree-arrow" viewBox="0 0 24 24">
                  <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                </svg>
              </slot>
            </div>
            <div class="twtree-drag-image-wrapper" v-if="item.__.dragOverArea !== null && dragAndDrop.dragNode !== null">
              <slot name="drag-image" v-bind:node="item" v-bind:dnd="dragAndDrop">
                <span class="twtree-drag-image">{{dragAndDrop.dragNode.title}}</span>
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
    checkboxLinkage: {
      type: Boolean,
      default: true
    },
    dragImageOffsetX: {
      type: String,
      default: '20px'
    },
    dragImageOffsetY: {
      type: String,
      default: '10px'
    },
    animationDuration: {
      type: String,
      default: '0.5s'
    },
    multiSelect: {
      type: Boolean,
      default: false
    },
    autoReload: {
      type: Boolean,
      default: true
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
    fnAfterCalculate: {
      type: Function,
      required: false,
      default: null
    }
  },
  computed: {

  },
  data() {
    return {
      nodes: JSON.parse(JSON.stringify(this.tree)),
      items: this.getItems(),
      autoIdCounter: 0,
      treeWidth: 0,
      treeWidthInterval: null,
      emptyImage: null,
      spareDefaultAttrs: {
        selected: false,
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
          bgColor: 'transparent',
          hoverBgColor: '#e7f4f9',
          selectedBgColor: '#bae7ff',
          dragOverBgColor: '#e7f4f9',
          iconMarginRight: '0.5em',
          extraFloatRight: false,
          extraAlwaysVisible: false,
          checkboxMarginRight: '0.1em',
          switcherMarginRight: '0.1em',
          titleMaxWidth: 'none',
          titleOverflow: 'clip',
          marginTop: 0,
          marginBottom: 0,
          showSwitcher: true,
          showIcon: true
        },
        __: {
          isEditing: false,
          isSearchResult: false,
          isDroppable: true,
          dragOverArea: null,
          indent: '20px',
          height: '2em',
          mousex: 0,
          mousey: 0,
          titleMaxWidth: 'none',
          titleTip: ''
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
  watch: {
    tree: {
      handler () {
        if (this.autoReload === true) {
          this.reload()
        }
      },
      deep: true
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

      let dpos = 0;

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

        let titleMaxWidth = this.getAttr(node, 'style', 'titleMaxWidth')
        let fullIndentVal = fullIndent.toString()
        if (fullIndentVal.substring(0, 3) === 'calc') {
          fullIndentVal = fullIndentVal.substring(5, fullIndent.length-1)
        }
        if (titleMaxWidth[0] === '-') {
          if (titleMaxWidth[titleMaxWidth.length - 1] === '%') {
            titleMaxWidth = ' - ' + (-1 * parseFloat(titleMaxWidth) / 100.0) + ' * var(--treeWidth)'
          }
          titleMaxWidth = 'calc(var(--treeWidth) - 1em - var(--switcherMarginRight) - 2px - 1em - var(--iconMarginRight) ' + titleMaxWidth + ' - (' + fullIndentVal + '))'
        } else if(titleMaxWidth[titleMaxWidth.length - 1] === '%') {
          titleMaxWidth = 'calc(' + (parseFloat(titleMaxWidth) / 100.0) + ' * var(--treeWidth))'
        }

        this.setAttr(node, 'directoryState',  this.getDirectoryState(node))
        this.setAttr(node, 'selected',        this.getAttr(node, 'selected'))

        this.setAttr(node, 'checkbox', 'show',    this.getAttr(node, 'checkbox', 'show'))
        this.setAttr(node, 'checkbox', 'disable', this.getAttr(node, 'checkbox', 'disable'))
        this.setAttr(node, 'checkbox', 'state',   this.getAttr(node, 'checkbox', 'state'))

        this.setAttr(node, 'style', 'height',              this.getAttr(node, 'style', 'height'))
        this.setAttr(node, 'style', 'indent',              this.getAttr(node, 'style', 'indent'))
        this.setAttr(node, 'style', 'fontSize',            this.getAttr(node, 'style', 'fontSize'))
        this.setAttr(node, 'style', 'bgColor',             this.getAttr(node, 'style', 'bgColor'))
        this.setAttr(node, 'style', 'hoverBgColor',        this.getAttr(node, 'style', 'hoverBgColor'))
        this.setAttr(node, 'style', 'selectedBgColor',     this.getAttr(node, 'style', 'selectedBgColor'))
        this.setAttr(node, 'style', 'dragOverBgColor',     this.getAttr(node, 'style', 'dragOverBgColor'))
        this.setAttr(node, 'style', 'switcherMarginRight', this.getAttr(node, 'style', 'switcherMarginRight'))
        this.setAttr(node, 'style', 'iconMarginRight',     this.getAttr(node, 'style', 'iconMarginRight'))
        this.setAttr(node, 'style', 'checkboxMarginRight', this.getAttr(node, 'style', 'checkboxMarginRight'))
        this.setAttr(node, 'style', 'extraFloatRight',     this.getAttr(node, 'style', 'extraFloatRight'))
        this.setAttr(node, 'style', 'extraAlwaysVisible',  this.getAttr(node, 'style', 'extraAlwaysVisible'))
        this.setAttr(node, 'style', 'titleMaxWidth',       this.getAttr(node, 'style', 'titleMaxWidth'))
        this.setAttr(node, 'style', 'titleOverflow',       this.getAttr(node, 'style', 'titleOverflow'))
        this.setAttr(node, 'style', 'marginTop',           this.getAttr(node, 'style', 'marginTop'))
        this.setAttr(node, 'style', 'marginBottom',        this.getAttr(node, 'style', 'marginBottom'))
        this.setAttr(node, 'style', 'showSwitcher',        this.getAttr(node, 'style', 'showSwitcher'))
        this.setAttr(node, 'style', 'showIcon',            this.getAttr(node, 'style', 'showIcon'))

        this.setAttr(node, '__', 'dpos',           isVisible ? dpos : -1)
        this.setAttr(node, '__', 'gpos',           i)
        this.setAttr(node, '__', 'isVisible',      isVisible)
        this.setAttr(node, '__', 'isEditing',      this.getAttr(node, '__', 'isEditing'))
        this.setAttr(node, '__', 'isSearchResult', this.getAttr(node, '__', 'isSearchResult'))
        this.setAttr(node, '__', 'isDroppable',    this.getAttr(node, '__', 'isDroppable'))
        this.setAttr(node, '__', 'dragOverArea',   this.getAttr(node, '__', 'dragOverArea'))
        this.setAttr(node, '__', 'height',         this.getAttr(node, '__', 'height'))
        this.setAttr(node, '__', 'mousex',         this.getAttr(node, '__', 'mousex'))
        this.setAttr(node, '__', 'mousey',         this.getAttr(node, '__', 'mousey'))
        this.setAttr(node, '__', 'titleTip',       this.getAttr(node, '__', 'titleTip'))
        this.setAttr(node, '__', 'fullIndent',     fullIndent)
        this.setAttr(node, '__', 'titleMaxWidth',  titleMaxWidth)

        if (typeof(this.fnAfterCalculate) === 'function') {
          this.fnAfterCalculate(node)
        }

        if (isVisible) {
          dpos++
        }
      }

      return items
    },
    reload() {
      this.nodes = JSON.parse(JSON.stringify(this.tree)),
      this.refresh();
    },
    refresh() {
      this.treeWidth = this.$refs.tree.offsetWidth
      this.items = this.getItems()
      this.refreshAllDirectoryCheckboxState()
    },
    getNestedTree() {
      return this.nodes
    },
    getFlatTree() {
      return this.items
    },
    getById(id) {
      for (let i=0; i<this.items.length; i++) {
        if (this.items[i].id === id) {
          return this.items[i]
        }
      }
      return null
    },
    getByGpos(gpos) {
      if (gpos < 0 || gpos > this.items.length - 1) {
        return null
      }
      return this.items[gpos]
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
      this.setAttr(node, '__', 'isEditing', true)
      this.$emit('edit', node)

      let titleElement = this.getTitleElement(node)
      this.$nextTick().then(function(){
        let range = document.createRange()
        let selection = window.getSelection()
        range.setStart(titleElement.childNodes[0], node.title.length)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
        titleElement.focus()
      })
    },
    quitEdit(node) {
      this.setAttr(node, '__', 'isEditing', false)
      this.$nextTick().then(function(){
        let titleElement = this.getTitleElement(node)
        titleElement.scrollLeft = 0
      }.bind(this))
      this.$emit('quitedit', node)
    },
    getTitleElement(node) {
      let refId = 'title-' + node.id
      if (this.$refs.hasOwnProperty(refId)) {
        return this.$refs[refId][0].childNodes[0]
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
    mouseenterEvent(node) {
      let titleElement = this.getTitleElement(node)
      let tip = (titleElement.offsetWidth < titleElement.scrollWidth)
        ? node.title
        : ''
      this.setAttr(node, '__', 'titleTip', tip)
    },
    getNewTitle(node) {
      let titleElement = this.getTitleElement(node)
      let newTitle = titleElement.innerText

      return newTitle
    },
    getSelected() {
      let selected = []

      for (let i=0; i<this.items.length; i++) {
        let node = this.items[i]
        if (node.selected) {
          selected.push(node)
        }
      }
      return selected
    },
    getSelectedOne() {
      let selected = this.getSelected()

      return selected.length > 0
        ? selected[0]
        : null
    },
    deselect(node) {
      this.setAttr(node, 'selected', false)
      this.$emit('deselect', node)
    },
    select(node) {
      if (typeof(this.fnBeforeSelect) === 'function' && this.fnBeforeSelect(node) === false) {
        return
      }

      this.setAttr(node, 'selected', true)
      this.$emit('select', node)
    },
    clickEvent(node, event) {
      this.$emit('click', node, event)

      if (this.multiSelect) {
        if (node.selected) {
          this.deselect(node)
        } else {
          this.select(node)
        }
      } else {
        let selected = this.getSelected()
        for (let item of selected) {
          if (item !== node ) {
            this.deselect(item)
          }
        }
        this.select(node)
      }
      this.hideContextMenuOnDisplay()
    },
    contextMenuEvent(node, event) {
      if (typeof(this.fnBeforeContextMenu) === 'function' && this.fnBeforeContextMenu(node, event) === false) {
        return
      }

      if (this.contextMenu.node !== node) {
        let selected = this.getSelected()
        for (let item of selected) {
          if (item !== node ) {
            this.deselect(item)
          }
        }
        this.select(node)
        this.hideContextMenuOnDisplay()
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
    treeBlurEvent(e) {
      let relatedTarget = e.relatedTarget
      if (this.contextMenu.node !== null && !this.getElement(this.contextMenu.node).contains(relatedTarget)) {
        this.hideContextMenuOnDisplay()
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
      
      this.refresh()
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

      this.refresh()
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
 
      this.refresh()
      this.$emit('move', node, fromParent, fromPos, toParent, toPos)
    },
    search(keyword, fnMatch) {
      let matches = []

      for (let node of this.items) {
        let match = typeof(fnMatch) === 'function'
          ? fnMatch(node, keyword)
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

      this.refresh()

      return matches
    },
    clearSearchResult() {
      for (let node of this.items) {
        this.setAttr(node, '__', 'isSearchResult', false)
      }
    },
    sort(node, recursive, fnCompare) {
      if (typeof(fnCompare) !== 'function') {
        fnCompare = function(node1, node2) {
          return node1.title.localeCompare(node2.title)
        }
      }

      if (node === null) {
        this.nodes.sort(fnCompare)
        if (recursive) {
          for (let tnode of this.nodes) {
            if (tnode.hasChild) {
              this.sort(tnode, recursive, fnCompare)
            }
          }
        }
      } else if (node.hasChild) {
        node.children.sort(fnCompare)
        if (recursive) {
          for (let tnode of node.children) {
            if (tnode.hasChild) {
              this.sort(tnode, recursive, fnCompare)
            }
          }
        }
      }

      this.refresh()
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
        this.refresh()
        this.$emit('expand', node)
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
            this.refresh()
            this.$emit('expand', node)
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
          this.refresh()
          this.$emit('expand', node)
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
      this.refresh()
      this.$emit('collapse', node)
    },
    getElement(node) {
      let refId = 'node-' + node.id
      if (this.$refs.hasOwnProperty(refId)) {
        return this.$refs[refId][0]
      }

      return null
    },
    getOffset(node) {
      let nodeElement = this.getElement(node)
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

      if (this.dragAndDrop.dragNode.__.parent === this.dragAndDrop.overNode.__.parent) {
        let dragNodePos = this.getAttr(this.dragAndDrop.dragNode, '__', 'pos')
        let overNodePos = this.getAttr(this.dragAndDrop.overNode, '__', 'pos')
        if (this.dragAndDrop.overArea === 'prev' && overNodePos === dragNodePos + 1) {
          return false
        }

        if (this.dragAndDrop.overArea === 'next' && overNodePos === dragNodePos - 1) {
          return false
        }
      }

      if (typeof(this.fnIsDroppable) === 'function') {
        return this.fnIsDroppable(this.dragAndDrop)
      }

      return true
    },
    dragStartEvent(node, event) {
      if (typeof(this.fnBeforeDrag) === 'function' && this.fnBeforeDrag(node) === false) {
        event.preventDefault()
        return
      }

      this.dragAndDrop.dragNode = node
      event.dataTransfer.setData('twtree-node', node.id)
      event.dataTransfer.setDragImage(this.emptyImage, 0, 0)
      event.dataTransfer.dropEffect = 'move'

      this.$emit('dragstart', this.dragAndDrop)
    },
    dragOverEvent(node, event) {
      if (this.dragAndDrop.overNode !== node) {
        this.dragLeave(this.dragAndDrop.overNode)
        this.dragEnter(node)
      }

      let nodeElement = this.getElement(node)
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

      this.$emit('dragover', this.dragAndDrop)
    },
    dragEnter(node) {
      this.dragAndDrop.overNode = node
      this.$emit('dragenter', this.dragAndDrop, node)
    },
    dragLeave(node) {
      if (node !== null) {
        this.setAttr(node, '__', 'dragOverArea', null)
      }
      this.$emit('dragleave', this.dragAndDrop, node)
    },
    dragEndEvent() {
      if (this.dragAndDrop.overNode !== null) {
        this.dragLeave(this.dragAndDrop.overNode)
        this.dragAndDrop.overNode = null
      }
      this.dragAndDrop.dragNode = null
      this.dragAndDrop.overArea = null
      this.$emit('dragend', this.dragAndDrop)
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

      this.dragAndDrop.dragNode = null
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
        this.$emit('checkbox-state-change', node, oldState, state)
      }
    },
    check(node) {
      if (this.getAttr(node, 'checkbox', 'show') === false) {
        return
      }

      if (this.getAttr(node, 'checkbox', 'disable') === true) {
        return
      }

      if (typeof(this.fnBeforeCheck) === 'function' && this.fnBeforeCheck(node) === false) {
          return
      }

      if (!this.checkboxLinkage) {
        this.setCheckboxState(node, 'checked')
        this.$emit('check', node)
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
      if (this.getAttr(node, 'checkbox', 'show') === false) {
        return
      }

      if (this.getAttr(node, 'checkbox', 'disable') === true) {
        return
      }

      if (typeof(this.fnBeforeUncheck) === 'function' && this.fnBeforeUncheck(node) === false) {
          return
      }

      if (!this.checkboxLinkage) {
        this.setCheckboxState(node, 'unchecked')
        this.$emit('uncheck', node)
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
      if (!this.checkboxLinkage) {
        return
      }

      for (let node of this.nodes) {
        this.refreshDirectoryCheckboxStateRecursively(node)
      }
    },
    refreshDirectoryCheckboxStateRecursively(node) {
      if (!this.checkboxLinkage) {
        return
      }

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
    getByCheckboxState(state) {
      let arr = []

      for (let i=0; i<this.items.length; i++) {
        if (this.getAttr(this.items[i], 'checkbox', 'show') === true && this.getAttr(this.items[i], 'checkbox', 'state') === state) {
          arr.push(this.items[i])
        }
      }

      return arr
    },
    getChecked() {
      return this.getByCheckboxState('checked')
    },
    getUndetermined() {
      return this.getByCheckboxState('undetermined')
    },
    getUnchecked() {
      return this.getByCheckboxState('unchecked')
    },
    toggleDirectoryState(node) {
        let state = this.getDirectoryState(node)
        if (state === 'expanded') {
          this.collapse(node)
        } else if (state === 'collapsed') {
          this.expand(node)
        }
    },
    resizeTree() {
      this.treeWidth = this.$refs.tree.offsetWidth
    }
  },
  mounted() {
    this.refresh()
    this.emptyImage = new Image()
    this.emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

    this.treeWidthInterval = setInterval(function(){
      let treeWidth = this.$refs.tree.offsetWidth
      if (this.treeWidth !== treeWidth) {
        this.treeWidth = treeWidth
      }
    }.bind(this), 300)
  },
  beforeDestroy() {
    clearInterval(this.treeWidthInterval)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.twtree-wrapper .twtree {
  position: relative;
  padding-inline-start: 0;
  text-align: left;
  list-style: none;
  overflow: visible;
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  width: 100%;
  margin-top: 0;
}
.twtree-wrapper:focus {
  outline: 0;
}
.twtree-node {
  cursor: pointer;
  position: relative;
  line-height: var(--height);
  font-size: var(--fontSize);
  margin-top: var(--marginTop);
  margin-bottom: var(--marginBottom);
  text-indent: var(--fullIndent);
  background-color: var(--bgColor);
 }
.twtree-node-enter-to, .twtree-node-leave {
  height: var(--height);
  opacity: 1;
}
.twtree-node-enter, .twtree-node-leave-to {
  height: 0;
  opacity: 0;
}
.twtree-node-enter-active, .twtree-node-leave-active {
  transition: height var(--animationDuration), opacity var(--animationDuration);
}
.twtree-node-move {
  transition: transform (--animationDuration);
}
.twtree-node:hover {
  background-color: var(--hoverBgColor);
}
.twtree-node.twtree-node-selected {
  background-color: var(--selectedBgColor);
}
.twtree-node .twtree-icon-and-title {
  display: inline-block;
  text-indent: 0;
  padding-left: 2px;
  padding-right: 5px;
  border-radius: 2px;
  line-height: var(--height);
  vertical-align: middle;
}
.twtree-node .twtree-title {
  width: auto;
  overflow: hidden;
  max-width: var(--titleMaxWidth);
  text-overflow: var(--titleOverflow);
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  height: var(--height);
  padding-left: 0;
}
.twtree-node .twtree-title.twtree-title-editing {
  display: inline-block;
  border: 1px solid blue;
  background-color: white;
  padding-left: 5px;
  padding-right: 5px;
  text-indent: 0;
  height: calc(var(--height) - 2px);
  text-overflow: clip;
  vertical-align: middle;
}
.twtree-node .twtree-switcher-wrapper {
  text-indent: 0;
  vertical-align: middle;
  display: inline-block;
  min-width: 1em;
  min-height: 1em;
  padding: 0;
  overflow: visible;
  margin-right: var(--switcherMarginRight)
}
.twtree-node .twtree-switcher-wrapper .twtree-switcher-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
.twtree-node .twtree-switcher-wrapper .twtree-switcher-icon.twtree-switcher-loading {
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
.twtree-node .twtree-icon-wrapper {
  margin-right: var(--iconMarginRight);
}
.twtree-node .twtree-icon-wrapper .twtree-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
.twtree-node.twtree-node-search-result .twtree-title {
  color: brown;
  font-weight: bold;
}
.twtree-node .twtree-extra-wrapper {
  display: var(--extraDisplay);
  text-indent: 0;
  float: var(--extraFloat);
}
.twtree-node:hover .twtree-extra-wrapper {
  display: inline-block;
}
.twtree-node .twtree-drag-arrow-wrapper {
  height: 0;
  width: 0;
  border: 0;
  text-indent: 0;
  position: absolute;
  left: calc(var(--fullIndent) + 1em);
  display: none;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  z-index: 10;
}
.twtree-node .twtree-drag-arrow-wrapper .twtree-arrow {
  width: 1.7em;
  height: 2.6em;
  stroke: #5cb85c;
  fill: #5cb85c;
  overflow: visible;
}
.twtree-node.twtree-node-drag-over-prev .twtree-drag-arrow-wrapper {
  display: flex;
  overflow: visible;
  top: 0;
}
.twtree-node.twtree-node-drag-over-next .twtree-drag-arrow-wrapper {
  display: flex;
  overflow: visible;
  bottom: 0;
}
.twtree-node.twtree-node-drag-over-self .twtree-drag-arrow-wrapper {
  display: flex;
  overflow: visible;
  top: 50%;
}
.twtree-node.twtree-node-drag-over-self .twtree-icon-and-title {
  background-color: var(--dragOverBgColor);
}
.twtree-node.twtree-not-droppable .twtree-not-droppable-sign {
  text-indent: 0;
  position: absolute;
  left: var(--mousex);
  top: calc(var(--mousey) + 0.5em);
  z-index: 10;
}
.twtree-node .twtree-drag-image-wrapper {
  display: block;
  position: absolute;
  z-index: 11;
  left: calc(var(--mousex) + var(--dragImageOffsetX));
  top: calc(var(--mousey) + var(--dragImageOffsetY));
  text-indent: 0;
}
.twtree-node .twtree-drag-image-wrapper .twtree-drag-image {
  text-indent: 0;
  width: auto;
  height: 1.5em;
  line-height: 1.5em;
  padding: 0.3em 0.5em;
  border: 0;
  border-radius: 5px;
  background-color: #bae7ff;
}
.twtree-node .twtree-checkbox-wrapper {
  display: inline-block;
  text-indent: 0;
  margin-right: var(--checkboxMarginRight);
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 1px solid #dcdee2;
  border-radius: 2px;
  text-indent: 0;
  vertical-align: middle;
  position: relative;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-checked:after {
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
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-checked {
  color: white;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-checked.twtree-checkbox-disabled {
  border-color: #dcdee2;
  background-color: #f5f5f5;
  cursor: not-allowed;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-checked.twtree-checkbox-disabled:after {
  border-color: #a6a6a6;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-unchecked {
  background-color: white;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-unchecked.twtree-checkbox-disabled {
  background-color: #f5f5f5;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-undetermined:after{
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
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-undetermined{
  color: white;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-undetermined.twtree-checkbox-disabled{
  border-color: #dcdee2;
  background-color: #f5f5f5;
}
.twtree-node .twtree-checkbox-wrapper .twtree-checkbox.twtree-checkbox-undetermined.twtree-checkbox-disabled:after{
  background-color: #a6a6a6;
}
.twtree-node .twtree-contextmenu-wrapper {
  position: absolute;
  display: block;
  left: var(--mousex);
  top: var(--mousey);
  z-index: 100;
  text-indent: 0;
}
</style>
