<template>
  <div
    class="twtree-wrapper"
    tabindex="1"
    @blur="treeBlurEvent"
    @dragend="dragEndEvent($event)"
    :style="{
    '--dragImageOffsetX': dragImageOffsetX,
    '--dragImageOffsetY': dragImageOffsetY,
    '--animationDuration': animationDuration,
    '--treeWidth': treeWidth + 'px'
  }">
      <transition-group
        tag="ul" 
        name="twtree-node"
        class="twtree"
        ref="tree">
        <template v-for="item of items">
          <li
            v-if="item.__.isVisible"
            :class="[
              {'twtree-node':                true}, 
              {'twtree-node-selected':       item.selected},
              {'twtree-node-search-result':  item.__.isSearchResult},
              ...item.__.customClasses
            ]"
            :style="{
              '--fullIndent':          item.__.fullIndent,
              '--titleMaxWidth':       item.__.titleMaxWidth,
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
              '--titleOverflow':       item.style.titleOverflow,
              '--marginTop':           item.style.marginTop,
              '--marginBottom':        item.style.marginBottom
            }"
            :draggable="!item.__.isEditing"
            @click = "clickEvent(item, $event)"
            @contextmenu = "contextMenuEvent(item, $event)"
            @dragstart="dragStartEvent(item, $event)"
            @dragover="dragOverEvent(item, $event)"
            @drop="dropEvent($event)"
            @dragenter="dragEnterEvent($event)"
            @touchstart="touchStartEvent(item, $event)"
            @touchmove="touchMoveEvent(item, $event)"
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
                  <template v-if="item.__.isEditing">
                    <slot name="input" v-bind:node="item">
                      <input
                        type="text"
                        v-model="item.title"
                        class="twtree-title twtree-title-editing"
                        :title="item.__.titleTip"
                        :ref="'title-input-' + item.id"
                        :style="{width: item.__.inputWidth}"
                        @keydown="keydownEvent(item, $event)"
                        @keyup="keyupEvent(item, $event)"
                        @keypress="keypressEvent(item, $event)"
                        @input="inputEvent(item, $event)"
                        @focus="focusEvent(item, $event)"
                        @blur="blurEvent(item)"
                        @mouseenter="mouseenterEvent(item)"/>
                      <span
                        :ref="'title-hidden-' + item.id"
                        class="twtree-title twtree-title-editing twtree-title-hidden">{{item.title}}</span>
                    </slot>
                  </template>
                  <template v-else>
                    <slot name="title" v-bind:node="item">
                      <span
                        class="twtree-title"
                        :title="item.__.titleTip"
                      >{{item.title}}</span>
                    </slot>
                  </template>
              </span>
            </span>
            <span class="twtree-extra-wrapper">
              <slot name="extra" v-bind:node="item">
              </slot>
            </span>
            <div
              v-if="item.__.showContextMenu"
              class="twtree-contextmenu-wrapper"
              :style="{
                '--mousex': contextMenu.event.clientX + 'px',
                '--mousey': contextMenu.event.clientY + 'px'
              }">
              <slot name="contextmenu" v-bind:node="item">
              </slot>
            </div>
          </li>
        </template>
      </transition-group>
      <drag-image
        :dragAndDrop="dragAndDrop"
        :DND_STATUS="DND_STATUS"
        :enableDragNodeOut="enableDragNodeOut">
        <template v-slot:default>
          <slot name="drag-image" v-bind:node="dragAndDrop.dragNode" v-bind:dnd="dragAndDrop">
            <span class="twtree-drag-image">{{dragAndDrop.dragNode.title}}</span>
          </slot>
        </template>
      </drag-image>
      <drag-arrow
        :dragAndDrop="dragAndDrop">
        <template v-slot:default>
          <slot name="drag-arrow" v-bind:node="dragAndDrop.overNode" v-bind:dnd="dragAndDrop">
            <svg class="twtree-drag-arrow" viewBox="0 0 24 24">
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
            </svg>
          </slot>
        </template>
      </drag-arrow>
  </div>
</template>

<script>
import DragImage from './DragImage.vue'
import DragArrow from './DragArrow.vue'

export default {
  name: 'TWTree',
  components: { DragImage, DragArrow },
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
    treeId: {
      type: String,
      default: 'default'
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
    pressEnterToBlur: {
      type: Boolean,
      default: true
    },
    autoReload: {
      type: Boolean,
      default: true
    },
    autoHideContextMenu: {
      type: Boolean,
      default: true
    },
    enableDragNodeOut: {
      type: Boolean,
      default: false
    },
    enableDropExternalElement: {
      type: Boolean,
      default: false
    },
    dropToMove: {
      type: Boolean,
      default: true
    },
    enableTouchSupport: {
      type: Boolean,
      default: false
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
    },
    fnBeforeDrop: {
      type: Function,
      required: false,
      default: null
    },
    fnCustomClasses: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      //-----basic----
      nodes: JSON.parse(JSON.stringify(this.tree)),
      items: this.getItems(),
      autoIdCounter: 0,
      treeWidth: 0,
      treeWidthInterval: null,
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
          mousex: 0,
          mousey: 0,
          titleMaxWidth: 'none',
          titleTip: '',
          customClasses: []
        }
      },

      //---drag and drop----
      emptyImage: null,
      dragAndDrop: {
        status: 0,
        dragNode: null,
        overNode: null,
        overArea: null,
        overRect: {
          left: null,
          top: null,
          width: null,
          height: null,
        },
        isDroppable: false,
        clientX: null,
        clientY: null,
        isTouch: false,
        from: null,
      },
      DND_STATUS: {    // enum values of dragAndDrop.status
        NONE:     0,   // there is no drag and drop interaction currently
        OUT_OF:   1,   // a node is being dragged outside the tree
        INTERNAL: 2,   // a node is being dragged over the tree
        INTO:     3    // an external element is being dragged over the tree
      },
      touchStartTarget: null,

      //---contextmenu---
      contextMenu: {
        node: null,
        event: null
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
    //generate a flat array which can be rendered easily.
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
          if (!Object.prototype.hasOwnProperty.call(node, 'children')) {
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
      let prevCollapsedDirectoryDepth = 99999

      for (let i=0; i<items.length; i++) {
        const node = items[i]

        if (!Object.prototype.hasOwnProperty.call(node, 'id')) {
          this.$set(node, 'id', this.generateId())
        }

        const depth = this.getAttr(node, '__', 'depth')
        const isVisible = depth <= prevCollapsedDirectoryDepth
        if (isVisible) {
          const dirState = this.getDirectoryState(node)
          prevCollapsedDirectoryDepth = dirState === 'collapsed'
            ? depth
            : 99999
        }

        const path = this.getAttr(node, '__', 'path')
        const indent = this.getAttr(node, 'style', 'indent')
        let fullIndent = 0
        if (path.length === 1) {
          fullIndent = indent
        } else if (path.length === 2) {
          const parentIndent = this.getAttr(path[path.length - 1], 'style', 'indent')
          fullIndent = `calc(${indent} + ${parentIndent})`
        } else if (path.length > 2) {
          const parentFullIndent = this.getAttr(path[path.length - 1], '__', 'fullIndent')
          fullIndent = 'calc(' + indent + ' + ' + parentFullIndent.substring(5)
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

        this.setAttr(node, 'directoryState',       this.getDirectoryState(node))
        this.setAttr(node, '__', 'dpos',           isVisible ? dpos : -1)
        this.setAttr(node, '__', 'gpos',           i)
        this.setAttr(node, '__', 'isVisible',      isVisible)
        this.setAttr(node, '__', 'fullIndent',     fullIndent)
        this.setAttr(node, '__', 'titleMaxWidth',  titleMaxWidth)

        if (!this.getAttr(node, '__', 'isInited')) {
          this.setAttr(node, 'selected',                          this.getAttr(node, 'selected'))
          this.setAttr(node, 'checkbox',  'show',                 this.getAttr(node, 'checkbox', 'show'))
          this.setAttr(node, 'checkbox',  'disable',              this.getAttr(node, 'checkbox', 'disable'))
          this.setAttr(node, 'checkbox',  'state',                this.getAttr(node, 'checkbox', 'state'))
          this.setAttr(node, 'style',     'height',               this.getAttr(node, 'style', 'height'))
          this.setAttr(node, 'style',     'indent',               this.getAttr(node, 'style', 'indent'))
          this.setAttr(node, 'style',     'fontSize',             this.getAttr(node, 'style', 'fontSize'))
          this.setAttr(node, 'style',     'bgColor',              this.getAttr(node, 'style', 'bgColor'))
          this.setAttr(node, 'style',     'hoverBgColor',         this.getAttr(node, 'style', 'hoverBgColor'))
          this.setAttr(node, 'style',     'selectedBgColor',      this.getAttr(node, 'style', 'selectedBgColor'))
          this.setAttr(node, 'style',     'dragOverBgColor',      this.getAttr(node, 'style', 'dragOverBgColor'))
          this.setAttr(node, 'style',     'switcherMarginRight',  this.getAttr(node, 'style', 'switcherMarginRight'))
          this.setAttr(node, 'style',     'iconMarginRight',      this.getAttr(node, 'style', 'iconMarginRight'))
          this.setAttr(node, 'style',     'checkboxMarginRight',  this.getAttr(node, 'style', 'checkboxMarginRight'))
          this.setAttr(node, 'style',     'extraFloatRight',      this.getAttr(node, 'style', 'extraFloatRight'))
          this.setAttr(node, 'style',     'extraAlwaysVisible',   this.getAttr(node, 'style', 'extraAlwaysVisible'))
          this.setAttr(node, 'style',     'titleMaxWidth',        this.getAttr(node, 'style', 'titleMaxWidth'))
          this.setAttr(node, 'style',     'titleOverflow',        this.getAttr(node, 'style', 'titleOverflow'))
          this.setAttr(node, 'style',     'marginTop',            this.getAttr(node, 'style', 'marginTop'))
          this.setAttr(node, 'style',     'marginBottom',         this.getAttr(node, 'style', 'marginBottom'))
          this.setAttr(node, 'style',     'showSwitcher',         this.getAttr(node, 'style', 'showSwitcher'))
          this.setAttr(node, 'style',     'showIcon',             this.getAttr(node, 'style', 'showIcon'))
          this.setAttr(node, '__',        'isEditing',            this.getAttr(node, '__', 'isEditing'))
          this.setAttr(node, '__',        'isSearchResult',       this.getAttr(node, '__', 'isSearchResult'))
          this.setAttr(node, '__',        'dragOverArea',         this.getAttr(node, '__', 'dragOverArea'))
          this.setAttr(node, '__',        'isDroppable',          this.getAttr(node, '__', 'isDroppable'))
          this.setAttr(node, '__',        'titleTip',             this.getAttr(node, '__', 'titleTip'))

          this.setAttr(node, '__',        'isInited',            true)
        }


        let customClasses = this.getAttr(node, '__', 'customClasses')
        if (typeof(this.fnCustomClasses) === 'function') {
          customClasses = this.fnCustomClasses(node)
          if (!Array.isArray(customClasses)) {
            customClasses = []
          }
        }
        this.setAttr(node, '__', 'customClasses',  customClasses)

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
      let nodeMap = {}
      for (const item of this.items) {
        const id = item.id
        nodeMap[id] = item
      }

      let nodes = []
      let stack = []
      stack.push({
        srcNodes: this.tree,
        desNodes: nodes
      })

      while (true) {
        let pair = stack.pop()
        if (pair === undefined) {
          break
        }
        let srcNodes = pair.srcNodes
        let desNodes = pair.desNodes

        for (const srcNode of srcNodes) {
          const id = srcNode.id
          const desNode = nodeMap[id] !== undefined
                        ? nodeMap[id]
                        : {}

          for (let key in srcNode) {
            if (typeof srcNode[key] !== 'object') {
              desNode[key] = srcNode[key]
            } else if (key === 'style' || key === 'checkbox') {
              if (desNode[key] === undefined) {
                desNode[key] = {}
              }
              Object.assign(desNode[key], srcNode[key])
            } else if (key === 'children') {
              desNode[key] = []
            }
          }

          if (srcNode.children === undefined && desNode.children !== undefined) {
            delete  desNode.children
          }

          if (Array.isArray(srcNode.children)) {
            stack.push({
              srcNodes: srcNode.children,
              desNodes: desNode.children
            })
          }
          desNodes.push(desNode)
        }
      }

      this.nodes = nodes
      this.refresh()
    },
    refresh() {
      this.treeWidth = this.$refs.tree.$el.offsetWidth
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
        const node = arguments[0]
        const key = arguments[1]
        const val = arguments[2]
        this.$set(node, key, val) 
      }

      if (arguments.length === 4) {
        const node = arguments[0]
        const key = arguments[1]
        const subKey = arguments[2]
        const val = arguments[3]

        if (!Object.prototype.hasOwnProperty.call(node, key)) {
          this.$set(node, key, {})
        }

        this.$set(node[key], subKey, val)
      }
    },
    getAttr() {
      if (arguments.length === 2) {
        const node = arguments[0]
        const key = arguments[1]

        if (Object.prototype.hasOwnProperty.call(node, key)) {
          return node[key]
        }

        if (Object.prototype.hasOwnProperty.call(this.defaultAttrs, key)) {
          return this.defaultAttrs[key]
        }

        if (Object.prototype.hasOwnProperty.call(this.spareDefaultAttrs, key)) {
          return this.spareDefaultAttrs[key]
        }

        return undefined
      }

      if (arguments.length === 3) {
        const node = arguments[0]
        const key = arguments[1]
        const subKey = arguments[2]

        if (Object.prototype.hasOwnProperty.call(node, key) && Object.prototype.hasOwnProperty.call(node[key], subKey)) {
          return node[key][subKey]
        }

        if (Object.prototype.hasOwnProperty.call(this.defaultAttrs, key) && Object.prototype.hasOwnProperty.call(this.defaultAttrs[key], subKey)) {
          return this.defaultAttrs[key][subKey]
        }

        if (Object.prototype.hasOwnProperty.call(this.spareDefaultAttrs, key) && Object.prototype.hasOwnProperty.call(this.spareDefaultAttrs[key], subKey)) {
          return this.spareDefaultAttrs[key][subKey]
        }

        return undefined
      }
    },
    setTitle(node, title) {
      if (node.title !== title) {
        this.$emit('rename', node, node.title, title)
      }
      this.$set(node, 'title', title)
    },
    generateId() {
      this.autoIdCounter += 1
      return 'twtree-node-' + this.autoIdCounter
    },
    getTitleElement(node) {
      let refId = 'title-' + node.id
      if (Object.prototype.hasOwnProperty.call(this.$refs, refId)) {
        return this.$refs[refId][0].childNodes[0]
      }

      return null
    },
    mouseenterEvent(node) {
      let titleElement = this.getTitleElement(node)
      let tip = (titleElement.offsetWidth < titleElement.scrollWidth)
        ? node.title
        : ''
      this.setAttr(node, '__', 'titleTip', tip)
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
        this.select(node)

        if (this.getAttr(node, 'selected') === true) {
          let selected = this.getSelected()
          for (let item of selected) {
            if (item !== node ) {
              this.deselect(item)
            }
          }
        }
      }

      if (this.autoHideContextMenu === true) {
        this.hideContextMenuOnDisplay()
      }
    },
    treeBlurEvent(e) {
      let relatedTarget = e.relatedTarget
      if (this.contextMenu.node !== null && this.autoHideContextMenu === true && !this.getElement(this.contextMenu.node).contains(relatedTarget)) {
        this.hideContextMenuOnDisplay()
      }
    },
    getElement(node) {
      let refId = 'node-' + node.id
      if (Object.prototype.hasOwnProperty.call(this.$refs, refId)) {
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




    //---------------------------------- select ----------------------------------------
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

    //--------------------------- create, remove, move ---------------------------------
    create(node, parentNode, pos) {
      if (parentNode === null) {
        if (typeof(pos) === 'undefined') {
          this.nodes.push(node)
        } else if(typeof(pos) === 'number') {
          this.nodes.splice(pos, 0, node)
        }

      } else {
        this.$set(parentNode, 'hasChild', true)
        if (!Object.prototype.hasOwnProperty.call(parentNode, 'children')) {
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
    createAndEdit(node, parentNode, pos) {
      this.create(node, parentNode, pos)
      this.expand(parentNode)
      this.$nextTick().then(() => {
        let createdNode = this.getById(node.id)
        this.edit(createdNode)
      })
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
        if (!Object.prototype.hasOwnProperty.call(toParent, 'children')) {
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


    //--------------------------- search, sort, traverse -------------------------------
    traverse (fnDoSomething) {
      for (let i=0; i<this.items.length; i++) {
        let node = this.items[i]
        fnDoSomething(node)
      }
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

    //-------------------------------- directory ---------------------------------------
    getDirectoryState(node) {
      if (!node.hasChild) {
        return null
      }

      let directoryState = this.getAttr(node, 'directoryState')
      if (directoryState === null) {
        directoryState = (Object.prototype.hasOwnProperty.call(this.defaultAttrs, 'directoryState') && this.defaultAttrs.directoryState !== null)
          ? this.defaultAttrs.directoryState
          : 'expanded'
      }

      return directoryState
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
    expandAncestors(node) {
      for (let ancestor of node.__.path) {
        this.expand(ancestor)
      }
    },



    //------------------------------ context menu --------------------------------------
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

      this.setAttr(node, '__', 'showContextMenu', true)
      this.contextMenu.node = node
      this.contextMenu.event = event
      event.preventDefault()
    },
    hideContextMenuOnDisplay() {
      if (this.contextMenu.node !== null) {
        this.setAttr(this.contextMenu.node, '__', 'showContextMenu', false)
      }
    },

    //---------------------------------- edit ------------------------------------------
    getHiddenTitleWidth(node) {
      let hiddenRefId = 'title-hidden-' + node.id
      if (Object.prototype.hasOwnProperty.call(this.$refs, hiddenRefId)) {
        let hiddenTitle = this.$refs[hiddenRefId][0]
        let width = hiddenTitle.clientWidth
        return `calc(${width}px + 2em)`
      } else {
        return (node.title.length + 1) + 'ch'
      }
    },
    getNewTitle(node) {
      return node.title
    },
    edit(node) {
      this.setAttr(node, '__', 'inputWidth', (node.title.length + 1) + 'em')
      this.setAttr(node, '__', 'isEditing', true)
      this.$emit('edit', node)

      this.$nextTick().then(function(){
        this.setAttr(node, '__', 'inputWidth', this.getHiddenTitleWidth(node))
        let input = this.getTitleElement(node)
        input.select()
        input.focus()
      }.bind(this))
    },
    quitEdit(node) {
      this.setAttr(node, '__', 'isEditing', false)

      this.$nextTick().then(function(){
        let titleElement = this.getTitleElement(node)
        titleElement.scrollLeft = 0
      }.bind(this))
      this.$emit('quitedit', node)
    },
    focus(node) {
      if (this.getAttr(node, '__', 'isEditing') === true) {
        let titleElement = this.getTitleElement(node)
        titleElement.focus()
      }
    },
    blur(node) {
      if (this.getAttr(node, '__', 'isEditing') === true) {
        let titleElement = this.getTitleElement(node)
        titleElement.blur()
      }
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
      if (this.pressEnterToBlur && event.keyCode === 13) {
        this.blur(node)
      }
      this.$emit('keydown', node, event)
    },
    keyupEvent(node, event) {
      this.setAttr(node, '__', 'inputWidth', this.getHiddenTitleWidth(node))

      this.$emit('keyup', node, event)
    },
    keypressEvent(node, event) {
      this.$emit('keypress', node, event)
    },



    //------------------------------ global cache --------------------------------------
    setGlobalCache() {
      if (Object.prototype.hasOwnProperty.call(window, 'twtreeCache') === false) {
        window.twtreeCache = {}
      }

      if (arguments.length === 2) {
        let key = arguments[0]
        let val = arguments[1]
        window.twtreeCache[key] = val
      } else if (arguments.length === 3) {
        let key = arguments[0]
        let subKey = arguments[1]
        let val = arguments[2]
        if (Object.prototype.hasOwnProperty.call(window.twtreeCache, key) === false) {
          window.twtreeCache[key] = {}
        }
        window.twtreeCache[key][subKey] = val
      }
    },
    getGlobalCache() {
      if (arguments.length === 1) {
        let key = arguments[0]
        return window?.twtreeCache?.[key]
      } else if (arguments.length === 2) {
        let key = arguments[0]
        let subKey = arguments[1]
        return window?.twtreeCache?.[key]?.[subKey]
      }
    },


    //------------------------------ drag and drop --------------------------------------
    defaultIsDroppable() {
      /*
      if (this.dragAndDrop.status === this.DND_STATUS.OUT_OF && this.enableDragNodeOut === false) {
        return false
      }
      */

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

      return true
    },
    isDroppable() {
      if (this.dragAndDrop.status === this.DND_STATUS.INTERNAL && this.dropToMove === true) {
        if (this.defaultIsDroppable() === false) {
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

      this.dragAndDrop.status = this.DND_STATUS.INTERNAL
      this.dragAndDrop.dragNode = node
      this.dragAndDrop.overNode = node
      this.dragAndDrop.isTouch = false
      this.dragAndDrop.from = null
      event.dataTransfer.setData('twtree', JSON.stringify({
        'treeId': this.treeId,
        'nodeId': node.id
      }))
      event.dataTransfer.setDragImage(this.emptyImage, 0, 0)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'all'
      this.setGlobalCache('currentDragAndDrop', {
        isTouch: false,
        fromTreeId: this.treeId,
        fromNodeId: node.id,
        beginTimestamp: Date.now(),
      })

      this.dragEnter(node)
      this.$emit('dragstart', this.dragAndDrop, event)
    },
    calcDragAndDropStatus(clientX, clientY) {
      if (this.$refs.tree === undefined) {
        return
      }

      let treeRect = this.$refs.tree.$el.getBoundingClientRect()
      let isInTreeArea = clientX > treeRect.left && clientX < treeRect.right && clientY > treeRect.top && clientY < treeRect.bottom
      let prevStatus = this.dragAndDrop.status

      if (isInTreeArea === false && this.dragAndDrop.dragNode !== null) {
        this.dragAndDrop.status = this.DND_STATUS.OUT_OF
        if (this.dragAndDrop.overNode !== null) {
          this.dragLeave(this.dragAndDrop.overNode)
        }
        if (prevStatus === this.DND_STATUS.INTERNAL) {
          this.$emit('dragleavetree', this.dragAndDrop)
        }

      } else if (isInTreeArea === true && this.dragAndDrop.dragNode !== null) {
        this.dragAndDrop.status = this.DND_STATUS.INTERNAL
        if (prevStatus === this.DND_STATUS.OUT_OF) {
          this.$emit('dragentertree', this.dragAndDrop)
        }

      } else if (isInTreeArea === true && this.dragAndDrop.dragNode === null) {
        this.dragAndDrop.status = this.DND_STATUS.INTO
        if (prevStatus === this.DND_STATUS.NONE) {
          this.dragAndDrop.from = {
            treeId: this.getGlobalCache('currentDragAndDrop', 'fromTreeId'),
            nodeId: this.getGlobalCache('currentDragAndDrop', 'fromNodeId'),
          }
          this.$emit('dragentertree', this.dragAndDrop)
        }

      } else if (isInTreeArea === false && this.dragAndDrop.dragNode === null) {
        this.dragAndDrop.status = this.DND_STATUS.NONE
        if (prevStatus === this.DND_STATUS.INTO) {
          this.$emit('dragleavetree', this.dragAndDrop)
          this.dragAndDrop.from = null
        }
      }

    },
    globalDragOverEvent(event) {
      event.preventDefault()
      this.dragAndDrop.clientX = Math.floor(event.clientX)
      this.dragAndDrop.clientY = Math.floor(event.clientY)

      this.calcDragAndDropStatus(event.clientX, event.clientY)
    },
    dragOverEvent(node, event) {
      if (this.dragAndDrop.status === this.DND_STATUS.INTO && this.enableDropExternalElement === false) {
        return
      }

      if (this.dragAndDrop.status === this.DND_STATUS.NONE) {
        return
      }

      let needToCalcIsDroppable = false
      if (this.dragAndDrop.overNode !== node) {
        needToCalcIsDroppable = true
        this.dragLeave(this.dragAndDrop.overNode)
        this.dragEnter(node)
      }

      const y = event.clientY - this.dragAndDrop.overRect.top
      const nodeHeight = this.dragAndDrop.overRect.height
      let overArea = ''
      if (y < nodeHeight * 0.33) {
        overArea = 'prev'
      } else if (nodeHeight - y < nodeHeight * 0.33) {
        overArea = 'next'
      } else {
        overArea = 'self'
      }
      if (overArea && overArea !== this.dragAndDrop.overArea) {
        this.dragAndDrop.overArea = overArea
        needToCalcIsDroppable = true
      }

      if (needToCalcIsDroppable) {
        this.dragAndDrop.isDroppable = this.isDroppable()
        if (this.dragAndDrop.isDroppable) {
          const el = this.getElement(node)
          el.classList.add(`twtree-node-drag-over-${overArea}`)
        }
      }
      event.preventDefault()

      this.setAttr(node, '__', 'dragOverArea', this.dragAndDrop.overArea)
      this.setAttr(node, '__', 'isDroppable',  this.dragAndDrop.isDroppable)

      this.$emit('dragover', this.dragAndDrop)
    },
    //if there isn't this dragenter event handler, the cursor style will be changed when the mouse is over the edge of another node in chrome, hence the blink.
    dragEnterEvent (event) {
      event.preventDefault()
    },
    dragEnter(node) {
      this.dragAndDrop.overNode = node
      const el = this.getElement(node)
      const rect = el.getBoundingClientRect()
      this.dragAndDrop.overRect = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      }
      this.$emit('dragenter', this.dragAndDrop, node)
    },
    dragLeave(node) {
      if (node !== null) {
        this.dragAndDrop.overNode = null
        const el = this.getElement(node)
        el.classList.remove('twtree-node-drag-over-prev')
        el.classList.remove('twtree-node-drag-over-next')
        el.classList.remove('twtree-node-drag-over-self')
      }
      this.$emit('dragleave', this.dragAndDrop, node)
    },
    // this event is not bound on the nodes like other drag events.
    // sometimes the user may remove the dragged node in the drop event, which may cause the dragend
    // event to not be fired if the dragend event is bound on the deleted node.
    dragEndEvent(event) {
      if (this.dragAndDrop.overNode !== null) {
        this.dragLeave(this.dragAndDrop.overNode)
      }

      // only the tree, one of whose node is being dragged, is allowed to mutate the global cache, or
      // it will cause critical problems when there are multiple trees in the page.
      if (this.dragAndDrop.dragNode !== null) {
        this.setGlobalCache('currentDragAndDrop', 'endTimestamp', Date.now())
        this.setGlobalCache('prevDragAndDrop', this.getGlobalCache('currentDragAndDrop'))
        this.setGlobalCache('currentDragAndDrop', {})
      }

      this.dragAndDrop.dragNode = null
      this.dragAndDrop.overArea = null
      this.dragAndDrop.overRect = {left: null, top: null, width: null, height: null}
      this.dragAndDrop.clientX  = null
      this.dragAndDrop.clientY  = null
      this.dragAndDrop.status   = this.DND_STATUS.NONE
      this.dragAndDrop.isTouch  = false
      this.dragAndDrop.from     = null

      this.$emit('dragend', this.dragAndDrop, event)
    },
    moveOnDrop() {
      if (this.dragAndDrop.status !== this.DND_STATUS.INTERNAL) {
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
    },
    dropEvent(event) {
      if (this.dragAndDrop.status === this.DND_STATUS.INTO && this.enableDropExternalElement === false) {
        return
      }

      if (this.dragAndDrop.status === this.DND_STATUS.NONE) {
        return
      }

      if (this.dragAndDrop.isDroppable === false) {
        return
      }

      if (typeof(this.fnBeforeDrop) === 'function' && this.fnBeforeDrop(this.dragAndDrop) === false) {
        return
      }

      if (this.dragAndDrop.status === this.DND_STATUS.INTERNAL && this.dropToMove === true) {
        this.moveOnDrop()
      } else {
        this.$emit('drop', this.getShallowCopyOfDragAndDrop(), event)
        if (this.dragAndDrop.status === this.DND_STATUS.INTO) {
          this.dragLeave(this.dragAndDrop.overNode)
        }
      }
    },
    getShallowCopyOfDragAndDrop () {
      return {
        isTouch:  this.dragAndDrop.isTouch,
        status:   this.dragAndDrop.status,
        dragNode: this.dragAndDrop.dragNode,
        overNode: this.dragAndDrop.overNode,
        overRect: this.dragAndDrop.overRect,
        overArea: this.dragAndDrop.overArea,
        from:     this.dragAndDrop.from
      }
    },
    getDragFrom() {
      let fromTreeId = this.getGlobalCache('currentDragAndDrop', 'fromTreeId')
      if (fromTreeId === null || fromTreeId === undefined) {
        fromTreeId = this.getGlobalCache('prevDragAndDrop', 'fromTreeId')
      }

      let fromNodeId = this.getGlobalCache('currentDragAndDrop', 'fromNodeId')
      if (fromNodeId === null || fromNodeId === undefined) {
        fromNodeId = this.getGlobalCache('prevDragAndDrop', 'fromNodeId')
      }

      return {
        treeId: fromTreeId,
        nodeId: fromNodeId,
      }
    },

    //-------------------------------------- touch support-------------------------------------------
    touchStartEvent(node, event) {
      if (this.enableTouchSupport === false) {
        return
      }

      if (event.touches.length > 1) {
        return
      }

      if (typeof(this.fnBeforeDrag) === 'function' && this.fnBeforeDrag(node) === false) {
        event.preventDefault()
        return
      }

      this.touchStartTarget = event.touches.item(0).target
      this.dragAndDrop.status = this.DND_STATUS.INTERNAL
      this.dragAndDrop.dragNode = node
      this.dragAndDrop.overNode = node
      this.dragAndDrop.isTouch = true
      this.dragAndDrop.from = null
      this.dragEnter(node)

      this.setGlobalCache('currentDragAndDrop', {
        isTouch: true,
        fromTreeId: this.treeId,
        fromNodeId: node.id,
        touchStartTarget: event.touches.item(0).target,
        beginTimestamp: Date.now(),
      })

      this.$emit('dragstart', this.dragAndDrop, event)
    },
    globalTouchEndEvent(event) {
      if (this.enableTouchSupport === false) {
        this.dragEndEvent(event)
        return
      }

      if (event.changedTouches.length > 1) {
        this.dragEndEvent(event)
        return
      }

      if (this.dragAndDrop.status === this.DND_STATUS.INTERNAL || this.dragAndDrop.status === this.DND_STATUS.INTO) {
        this.dropEvent(event)
      }
      this.dragEndEvent(event)
    },
    globalTouchCancelEvent(event) {
      this.dragEndEvent(event)
    },
    touchMoveEvent(node) {
      console.log('---touch-move-event-' + node.title)
    },
    globalTouchMoveEvent(event) {
      if (this.enableTouchSupport === false) {
        return
      }

      if (event.touches.length > 1) {
        return
      }

      if (this.dragAndDrop.dragNode !== null) {
        event.preventDefault()
      }

      let touch = event.touches.item(0)
      this.dragAndDrop.clientX = touch.clientX
      this.dragAndDrop.clientY = touch.clientY
      this.dragAndDrop.isTouch = true

      this.calcDragAndDropStatus(touch.clientX, touch.clientY)
      if (this.dragAndDrop.status === this.DND_STATUS.INTO && this.enableDropExternalElement === false) {
        return
      }
      if (this.dragAndDrop.status === this.DND_STATUS.INTERNAL || this.dragAndDrop.status === this.DND_STATUS.INTO) {
        this.whichNodeIsBeingTouchedOver(event)
      }
    },
    whichNodeIsBeingTouchedOver(event) {
      if (this.dragAndDrop.status !== this.DND_STATUS.INTERNAL
          && this.dragAndDrop.status !== this.DND_STATUS.INTO) {
        return
      }

      let touch = event.touches.item(0)
      let step = 1
      let from = 0

      if (this.dragAndDrop.overNode !== null) {
        from = this.getAttr(this.dragAndDrop.overNode, '__', 'gpos')
        let nodeElement = this.getElement(this.dragAndDrop.overNode)
        let nodeOffset  = this.getOffset(this.dragAndDrop.overNode)
        let nodeHeight = nodeElement.clientHeight

        if (touch.pageY < nodeOffset.top) {
          step = -1
        } else if (touch.pageY > nodeOffset.top + nodeHeight) {
          step = 1
        }
      } 

      let cur = from
      while (cur >=0 && cur < this.items.length) {
        let cnode = this.getByGpos(cur)
        let cnodeElement = this.getElement(cnode)
        let cnodeOffset = this.getOffset(cnode)
        let cnodeHeight = cnodeElement.clientHeight
        let y = touch.pageY - cnodeOffset.top

        if ( y < 0 || y > cnodeHeight) {
          cur += step
          continue
        }

        event.clientX = touch.clientX
        event.clientY = touch.clientY
        this.dragOverEvent(cnode, event)
        break
      }
    },
    isTheTouchOperationFromTheTree(event) {
      if ((event.type === 'touchend' && event.changedTouches.item(0).target === this.touchStartTarget)
          || (event.type === 'touchmove' && event.touches.item(0).target === this.touchStartTarget)
          || (event.type === 'touchcancel' && event.changedTouches.item(0).target === this.touchStartTarget)) {
        return true
      }
 
      return false
    },

    //---------------------------------------- checkbox -------------------------------------------


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
      this.treeWidth = this.$refs.tree.$el.offsetWidth
    }
  },


  //------------------------------------  hooks ---------------------------------------------

  mounted() {
    this.refresh()

    //drag and drop
    document.body.addEventListener('dragover', this.globalDragOverEvent.bind(this), {capture: true})
    this.emptyImage = new Image()
    this.emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

    //touch devices
    document.body.addEventListener('touchcancel', this.globalTouchCancelEvent.bind(this), {capture: true})
    document.body.addEventListener('touchmove', this.globalTouchMoveEvent.bind(this), {capture:true, passive: false})
    document.body.addEventListener('touchend', this.globalTouchEndEvent.bind(this), {capture:true, passive: false})

    //calculate the tree's width
    this.treeWidthInterval = setInterval(function(){
      let treeWidth = this.$refs.tree.$el.offsetWidth
      if (this.treeWidth !== treeWidth) {
        this.treeWidth = treeWidth
      }
    }.bind(this), 300)
  },
  beforeDestroy() {
    clearInterval(this.treeWidthInterval)
    document.removeEventListener('dragover', this.globalDragOverEvent.bind(this), {capture: true})
    document.removeEventListener('touchend', this.globalTouchEndEvent.bind(this), {capture: true})
    document.removeEventListener('touchmove', this.globalTouchMoveEvent.bind(this), {capture: true})
    document.removeEventListener('touchcancel', this.globalTouchCancelEvent.bind(this), {capture: true})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
  transition: var(--animationDuration);
 }
.twtree-node-enter-to, .twtree-node-leave {
  height: var(--height);
  opacity: 1;
}
.twtree-node-enter {
  height: 3px;
  opacity: 0;
}
.twtree-node-leave-to {
  height: 0;
  opacity: 0;
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
  border: 1px solid #2196F3;
  outline: 1px solid #2196F3;
  background-color: white;
  padding: 0 5px;
  text-indent: 0;
  height: calc(var(--height) - 5px);
  line-height: calc(var(--height) - 5px);
  text-overflow: clip;
  vertical-align: middle;
  border-radius: 0.16em;
  font-size: var(--fontSize);
}
.twtree-node .twtree-title.twtree-title.twtree-title-editing input {
  box-sizing: content-box;
}
.twtree-node .twtree-title.twtree-title-editing.twtree-title-hidden {
  position: absolute;
  visibility: hidden;
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
.twtree-node.twtree-not-droppable .twtree-not-droppable-sign {
  text-indent: 0;
  position: absolute;
  left: var(--mousex);
  top: calc(var(--mousey) + 0.5em);
  z-index: 10;
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
  position: fixed;
  display: block;
  left: var(--mousex);
  top: var(--mousey);
  z-index: 100;
  text-indent: 0;
}
.twtree-wrapper .twtree-node-drag-over-self .twtree-icon-and-title {
  background-color: var(--dragOverBgColor);
}
.twtree-wrapper .twtree-drag-image {
  text-indent: 0;
  font-size: var(--fontSize);
  width: auto;
  height: 1.5em;
  line-height: 1.5em;
  padding: 0.3em 0.5em;
  border: 0;
  border-radius: 5px;
  background-color: #bae7ff;
}
</style>
