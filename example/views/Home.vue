<template>
  <div :class="['home', isNarrow ? 'narrow' : 'wide']" @click="toggleAside($event)">

    <div class="aside" v-show="showAside">
      <div class="menu-tree-wrapper">
        <TWTree 
          ref="tree" 
          class="menu-tree" 
          :tree="menuTree"
          :defaultAttrs="{
            style: {
              titleMaxWidth: '-5%',
              titleOverflow: 'ellipsis'
            }
          }"
          @select="showDemo"/>
      </div>
    </div>

    <div class="main">
      <div class="demo">
        <span class="title">
          {{demo.title}}
        </span>
        <span class="links">
          <svg class="code-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"  fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
            <path d="M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27" />
          </svg>
          <a :href="demo.sourceCodeUrl" :title="text[locale]['codeLinkTip']" class="link" target="_blank">{{text[locale]['codeLinkText']}}</a>

          <svg class="try-link-icon" viewBox="0 0 100 100" stroke="currentcolor">
            <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path>
          </svg>
          <a :href="demo.codepenUrl" :title="text[locale]['codepenLinkTip']" class="link" target="_blank">{{text[locale]['codepenLinkText']}}</a>
        </span>
        <span class="note" v-html="demo.note">
        </span>
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'home',
  components: {
    TWTree
  },
  data() {
    return {
      isNarrow: false,
      showAside: true,

      locale: 'en',
      text: {
        en: {
          headerTitle:     'DEMOS',
          codeLinkText:    'code',
          codeLinkTip:     'View source code',
          codepenLinkText: 'Try it!',
          codepenLinkTip:  'Edit in codepen'
        },
        zh: {
          headerTitle:     '示例',
          codeLinkText:    '源码',
          codeLinkTip:     '查看源码',
          codepenLinkText: '试一试',
          codepenLinkTip:  '在codepen中编辑'
        },
      },

      demo: {
        title: '',
        note: '',
        sourceCodeUrl: '',
        codepenUrl: ''
      },

      menuTree: [
        {
          title_en:      'getting started',
          title_zh:      '开始使用',
          hasChild:      true,
          children:      [
            {
              title_en:      'displaying a tree',
              title_zh:      '显示一颗树',
              route:         '/example/getting-started/display-a-tree',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/GettingStartedDisplayATreeExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/MWKNvvb'
            },
            {
              title_en:      'basic operations',
              title_zh:      '基本操作',
              route:         '/example/getting-started/basic-operations',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/GettingStartedBasicOperationsExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/oNbyRwj'
            },
            {
              title_en:      'setting props of nodes',
              title_zh:      '设置结点的属性',
              note_en:       'use \'defaultAttrs\' property to set the default properties of the nodes. ' + 
                             'if a node doesn\'t have a property, which exists in the \'defaultAttrs\', then this property\'s value in \'defaultAttrs\' will be assigned to this property of the node.',
              note_zh:       'defaultAttrs，可用来设置结点的缺省属性。<br>当结点没有某个属性，而defaultAttrs中有时，则会使用defaultAttrs中的该属性。',
              route:         '/example/getting-started/set-props',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/GettingStartedSetPropsExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/ExPqvqp'
            }
          ]
        },

        {
          title_en:      'drag and drop',
          title_zh:      '拖放操作',
          hasChild:      true,
          children:      [
            {
              title_en:      'basic',
              title_zh:      '基础',
              route:         '/example/drag-and-drop/basic',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropBasicExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/VweNWyV'
            },
            {
              title_en:      'advanced',
              title_zh:      '高级',
              route:         '/example/drag-and-drop/advanced',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropAdvancedExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/LYGBrgp'
            },
            {
              title_en:      'disabling drag and drop',
              title_zh:      '禁止拖放操作',
              route:         '/example/drag-and-drop/disable',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropDisableExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/zYrMoxE'
            },
            {
              title_en:      'custom appearance',
              title_zh:      '自定义外观',
              route:         '/example/drag-and-drop/custom-appearance',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropCustomAppearanceExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/dyGqXON'
            },
            {
              title_en:      'dragging a node out',
              title_zh:      '将结点拖动到树的外部',
              route:         '/example/drag-and-drop/drag-a-node-out',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropDragANodeOutExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/wvzGXwM'
            },
            {
              title_en:      'dropping an external element',
              title_zh:      '将外部元素拖放到树上',
              route:         '/example/drag-and-drop/drop-an-external-element',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropDropAnExternalElementExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/VwKadaO'
            },
            {
              title_en:      'multiple trees',
              title_zh:      '多棵树',
              route:         '/example/drag-and-drop/multiple-trees',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/DragAndDropMultipleTreesExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/NWRNzpp'
            },

          ]
        },

        {
          title_en:      'checkbox',
          title_zh:      '复选框',
          hasChild:      true,
          children:      [
            {
              title_en:      'parent-child linkage',
              title_zh:      '父子结点联动',
              route:         '/example/checkbox/with-linkage',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CheckboxWithLinkageExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/NWxBMob'
            },
            {
              title_en:      'no parent-child linkage',
              title_zh:      '父子结点无联动',
              route:         '/example/checkbox/without-linkage',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CheckboxWithoutLinkageExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/BajGavr'
            },
            {
              title_en:      'custom appearance',
              title_zh:      '自定义外观',
              route:         '/example/checkbox/custom-appearance',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CheckboxCustomAppearanceExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/vYLzKmJ'
            }
          ]
        },


        {
          title_en:      'radio button',
          title_zh:      '单选框',
          route:         '/example/radio-button',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/RadioButtonExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/gOPjKPM'
        },
        {
          title_en:      'async loading',
          title_zh:      '异步加载',
          route:         '/example/async',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/AsyncExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/RwrBBRj'
        },
        {
          title_en:      'editing',
          title_zh:      '编辑',
          route:         '/example/edit',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/EditExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/jOWpKdv'
        },
        {
          title_en:      'buttons',
          title_zh:      '按钮',
          route:         '/example/button',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/ButtonExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/oNbMywg'
        },
        {
          title_en:      'context menu',
          title_zh:      '右键菜单',
          route:         '/example/contextmenu',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/ContextMenuExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/gOPjKGg'
        },
        {
          title_en:      'searching',
          title_zh:      '查找',
          route:         '/example/search',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/SearchExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/bGEjjNj'
        },
        {
          title_en:      'multiple selecting',
          title_zh:      '多选',
          route:         '/example/multi-select',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/MultiSelectExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/qBbyKwb'
        },
        {
          title_en:      'sorting',
          title_zh:      '排序',
          route:         '/example/sort',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/SortExample.vue',
          codepenUrl:    'https://codepen.io/tinywisp/pen/NWxBBGO'
        },

        {
          title_en:      'root node',
          title_zh:      '根结点',
          hasChild:      true,
          children:      [
            {
              title_en:      'no root node',
              title_zh:      '无根结点',
              route:         '/example/root-node/no-root-node',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/RootNodeNoRootNodeExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/qBbyKeZ'
            },
            {
              title_en:      'no expander/collapser',
              title_zh:      '无展开/折叠按钮',
              route:         '/example/root-node/no-switcher',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/RootNodeNoSwitcherExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/gOPVRBj'
            },
            {
              title_en:      'checking if a node is the root node',
              title_zh:      '判断是否根结点',
              route:         '/example/root-node/checking',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/RootNodeCheckingExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/xxZvrQg'
            },
            {
              title_en:      'custom appearance',
              title_zh:      '自定义外观',
              route:         '/example/root-node/custom-appearance',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/RootNodeCustomAppearanceExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/WNrVEOv'
            }
          ]
        },

        {
          title_en:      'custom appearance',
          title_zh:      '自定义外观',
          hasChild:      true,
          children:      [
            {
              title_en:      'size',
              title_zh:      '大小',
              route:         '/example/custom-appearance/size',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceSizeExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/GRoXZOj'
            },
            {
              title_en:      'icons',
              title_zh:      '图标',
              route:         '/example/custom-appearance/icon',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceIconExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/eYJLZjb'
            },
            {
              title_en:      'no icons',
              title_zh:      '无图标',
              route:         '/example/custom-appearance/no-icons',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceNoIconsExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/NWxmvRp'
            },
            {
              title_en:      'no directory toggles',
              title_zh:      '无目录展开/折叠按钮',
              route:         '/example/custom-appearance/no-directory-toggles',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceNoDirectoryTogglesExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/eYZOZLL'
            },
            {
              title_en:      'background color',
              title_zh:      '背景色',
              route:         '/example/custom-appearance/background-color',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceBackgroundColorExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/RwrYRLj'
            },
            {
              title_en:      'stripes',
              title_zh:      '条纹',
              component:     'CustomAppearanceStripesExample',
              route:         '/example/custom-appearance/stripes',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceStripesExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/oNbPLpW'
            },
            {
              title_en:      'disabling animations',
              title_zh:      '禁止动画效果',
              route:         '/example/custom-appearance/disable-animations',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceDisableAnimationsExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/ZEQMOxY'
            },
            {
              title_en:      'extra content',
              title_zh:      '附加内容',
              route:         '/example/custom-appearance/extra-content',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceExtraContentExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/NWxLrMo'
            },
            {
              title_en:      'limiting widths of titles',
              title_zh:      '限制标题宽度',
              route:         '/example/custom-appearance/limit-title-width',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceLimitTitleWidthExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/yLexJQL'
            },
            {
              title_en:      'custom classes',
              title_zh:      '自定义样式类',
              note_en:       'use the fnCustomClasses property to add custom classes to the nodes',
              note_zh:       '使用fnCustomClasses为节点添加自定义样式类',
              route:         '/example/custom-appearance/custom-classes',
              sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/example/views/CustomAppearanceCustomClassesExample.vue',
              codepenUrl:    'https://codepen.io/tinywisp/pen/NWjdjQM'
            }
          ]
        }

      ]

    }
  },
  methods: {
    showDemo(node) {
      if (Object.prototype.hasOwnProperty.call(node, 'route')) {
        this.demo = {
          sourceCodeUrl: node.sourceCodeUrl,
          codepenUrl:    node.codepenUrl,
          title:         node.__.parent === null
                          ? node.title
                          : node.__.parent.title + ': ' + node.title,
          note:          node.note
        }
        let currentPath = this.$route.path.replace(/^\/[a-zA-Z]*/, '')
        if (currentPath !== node.route) {
          this.$router.push('/' + this.locale + node.route)
        }
      }
    },
    init() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.isNarrow = (width < 1025)

      this.locale = this.$route.params.lang === 'zh'
        ? 'zh'
        : 'en'

      this.$refs.tree.traverse(function (node) {
        let titleKey = 'title_' + this.locale
        let noteKey  = 'note_' + this.locale
        node.title = node[titleKey]
        node.note  = Object.prototype.hasOwnProperty.call(node, noteKey)
          ? node[noteKey]
          : ''
      }.bind(this))

      let routePath = this.$route.path.replace(/^\/[a-zA-Z]*/, '')
      let gotoNode = null
      this.$refs.tree.traverse(function (node) {
        if (Object.prototype.hasOwnProperty.call(node, 'route') && node.route === routePath) {
          gotoNode = node
        }
      }.bind(this))
      if (gotoNode !== null) {
        this.$refs.tree.select(gotoNode)
      }
    },
    noAction() {
      return
    },
    toggleAside(event) {
      if (!this.isNarrow) {
        return
      }

      const ignoredTags = ['A', 'INPUT', 'BUTTON']
      if (ignoredTags.includes(event.target.tagName)) {
        return
      }

      let el = event.target
      while (el !== null && el !== undefined) {
        let classList = el.classList
        if (classList.contains('twtree-node') || classList.contains('twtree')) {
          return
        }

        el = el.parentElement
      }

      this.showAside = !this.showAside
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
.home.wide .example-wrapper {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.home.narrow .example-wrapper {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}
.panel {
  width: 100%;
  min-height: 500px;
  box-sizing: border-box;
  padding: 10px;
  margin: 20px 0 20px 0;
  border: 1px solid gray;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>

<style scoped>
.title:lang(zh) {
  letter-spacing: 0.2em;
}

.home.wide {
  display: flex;
  flex-direction: row;
  margin: 0;
  height: 100vh;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
.home.wide .aside {
  flex-basis: 250px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid black;
  flex-grow: 0;
  display: block;
}
.home.wide .main {
  flex: calc(100% - 250px);
  height: auto;
  min-height: 100vh;
  flex-grow: 1;
}

.home.narrow {
  display: block;
  width: 100%;
  min-height: 100vh;
  position: relative;
}
.home.narrow .aside {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  overflow-y: scroll;
  border-right: 1px solid black;
  z-index: 100;
  background-color: white;
}
.home.narrow .aside::-webkit-scrollbar {
  width: 0;
}
.home.narrow .main {
  width: 100%;
  min-height: 100vh;
  height: auto;
}

.menu-tree-wrapper {
  position: relative;
  width: 250px;
  left: 0;
  top: 0;
  overflow: hidden;
}
.menu-tree-wrapper .menu-tree {
  width: 100%;
}
.demo {
  border: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 1em;
}
.links {
  margin-bottom: 2em;
}
.link {
  text-decoration: none;
  vertical-align: middle;
  color: rgb(102, 177, 255);
}
.link:hover {
  text-decoration: underline;
}
.link:first-of-type {
  margin-right: 10em;
}
.code-link-icon {
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  vertical-align: middle;
  color: brown;
}
.try-link-icon {
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  vertical-align: middle;
  fill: brown;
}
.note {
  display: block;
  width: min(100vw, 800px);
  text-align: left;
  min-height: 2em;
}
</style>