<template>
  <div class="home">
    <div class="header">
      <span class="title">{{text[locale]['headerTitle']}}</span>
    </div>

    <template v-for="(item, i) in items">
      <hr :key="'hr_' + i"/>
      <div class="row" :key="'row_' + i">
        <span class="title">
          {{item.title[locale]}}
        </span>
        <span class="links">
          <svg class="code-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"  fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
            <path d="M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27" />
          </svg>
          <a :href="item.sourceCodeUrl" :title="text[locale]['codeLinkTip']" class="link" target="_blank">{{text[locale]['codeLinkText']}}</a>

          <svg class="try-link-icon" viewBox="0 0 100 100" stroke="currentcolor">
            <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path>
          </svg>
          <a :href="item.codePenUrl" :title="text[locale]['codepenLinkTip']" class="link" target="_blank">{{text[locale]['codepenLinkText']}}</a>
        </span>
        <component :is="item.component"/>
      </div>
    </template>

  </div>
</template>

<script>
import BasicExample from './BasicExample.vue'
import CheckboxExample from './CheckboxExample.vue'
import CheckboxWithoutLinkageExample from './CheckboxWithoutLinkageExample.vue'
import AsyncExample from './AsyncExample.vue'
import EditExample from './EditExample.vue'
import DragAndDropExample from './DragAndDropExample.vue'
import DisableDragAndDropExample from './DisableDragAndDropExample.vue'
import ButtonExample from './ButtonExample.vue'
import ContextMenuExample from './ContextMenuExample.vue'
import SearchExample from './SearchExample.vue'
import MultiSelectExample from './MultiSelectExample.vue'
import RadioButtonExample from './RadioButtonExample.vue'
import SortExample from './SortExample.vue'
import NoRootExample from './NoRootExample.vue'
import CustomAppearanceSizeExample from './CustomAppearanceSizeExample.vue'
import CustomAppearanceIconExample from './CustomAppearanceIconExample.vue'
import CustomAppearanceDragAndDropExample from './CustomAppearanceDragAndDropExample.vue'
import CustomAppearanceCheckboxExample from './CustomAppearanceCheckboxExample.vue'
import CustomAppearanceBackgroundColorExample from './CustomAppearanceBackgroundColorExample.vue'
import CustomAppearanceStripesExample from './CustomAppearanceStripesExample.vue'
import CustomAppearanceDisableAnimationsExample from './CustomAppearanceDisableAnimationsExample.vue'
import CustomAppearanceExtraContentExample from './CustomAppearanceExtraContentExample.vue'
import CustomAppearanceLimitTitleWidthExample from './CustomAppearanceLimitTitleWidthExample.vue'

export default {
  name: 'home',
  components: {
    BasicExample, 
    CheckboxExample, 
    CheckboxWithoutLinkageExample,
    AsyncExample, 
    EditExample, 
    DragAndDropExample,
    DisableDragAndDropExample,
    ButtonExample,
    ContextMenuExample,
    SearchExample,
    MultiSelectExample,
    RadioButtonExample,
    SortExample,
    NoRootExample,
    CustomAppearanceSizeExample,
    CustomAppearanceIconExample,
    CustomAppearanceDragAndDropExample,
    CustomAppearanceCheckboxExample,
    CustomAppearanceBackgroundColorExample,
    CustomAppearanceStripesExample,
    CustomAppearanceDisableAnimationsExample,
    CustomAppearanceExtraContentExample,
    CustomAppearanceLimitTitleWidthExample
  },
  data() {
    return {
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
      items: [
        {
          title: {
            en:          'basic',
            zh:          '基本功能'
          },
          component:     'BasicExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/BasicExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/oNbyRwj'
        },
        {
          title: {
            en:          'checkbox',
            zh:          '复选框'
          },
          component:     'CheckboxExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CheckboxExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/NWxBMob'
        },
        {
          title: {
            en:          'checkbox: no linkage relationship between parent and child nodes',
            zh:          '复选框: 无联动'
          },
          component:     'CheckboxWithoutLinkageExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CheckboxWithoutLinkageExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/BajGavr'
        },
        {
          title: {
            en:          'radio button',
            zh:          '单选框'
          },
          component:     'RadioButtonExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/RadioButtonExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/gOPjKPM'
        },
        {
          title:{
            en:          'async loading',
            zh:          '异步加载'
          },
          component:     'AsyncExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/AsyncExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/RwrBBRj'
        },
        {
          title:{
            en:          'edit',
            zh:          '编辑'
          },
          component:     'EditExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/EditExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/jOWpKdv'
        },
        {
          title: {
            en:          'button',
            zh:          '按钮'
          },
          component:     'ButtonExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/ButtonExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/oNbMywg'
        },
        {
          title: {
            en:          'drag and drop',
            zh:          '拖放'
          },
          component:     'DragAndDropExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/DragAndDropExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/LYGBrgp'
        },
        {
          title: {
            en:          'disable drag and drop',
            zh:          '禁止拖放'
          },
          component:     'DisableDragAndDropExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/DisableDragAndDropExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/zYrMoxE'
        },
        {
          title: {
            en:          'context menu',
            zh:          '右键菜单'
          },
          component:     'ContextMenuExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/ContextMenuExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/gOPjKGg'
        },
        {
          title: {
            en:          'search',
            zh:          '查找'
          },
          component:     'SearchExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/SearchExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/bGEjjNj'
        },
        {
          title: {
            en:          'multiple select',
            zh:          '多选'
          },
          component:     'MultiSelectExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/MultiSelectExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/qBbyKwb'
        },
        {
          title: {
            en:          'sort',
            zh:          '排序'
          },
          component:     'SortExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/SortExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/NWxBBGO'
        },
        {
          title: {
            en:          'no root node',
            zh:          '无根结点'
          },
          component:     'NoRootExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/NoRootExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/qBbyKeZ'
        },
        {
          title: {
            en:          'custom appearance: size',
            zh:          '自定义外观: 大小'
          },
          component:     'CustomAppearanceSizeExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceSizeExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/GRoXZOj'
        },
        {
          title: {
            en:          'custom appearance: icon',
            zh:          '自定义外观: 图标'
          },
          component:     'CustomAppearanceIconExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceIconExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/eYJLZjb'
        },
        {
          title: {
            en:          'custom appearance: drag and drop',
            zh:          '自定义外观: 拖放操作的图像及箭头'
          },
          component:     'CustomAppearanceDragAndDropExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceDragAndDropExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/dyGqXON'
        },
        {
          title: {
            en:          'custom appearance: checkbox',
            zh:          '自定义外观: 复选框'
          },
          component:     'CustomAppearanceCheckboxExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceCheckboxExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/vYLzKmJ'
        },
        {
          title: {
            en:          'custom appearance: background color',
            zh:          '自定义外观: 背景色'
          },
          component:     'CustomAppearanceBackgroundColorExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceBackgroundColorExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/RwrYRLj'
        },
        {
          title: {
            en:          'custom appearance: stripes',
            zh:          '自定义外观: 条纹'
          },
          component:     'CustomAppearanceStripesExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceStripesExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/oNbPLpW'
        },
        {
          title: {
            en:          'custom appearance: disable animations',
            zh:          '自定义外观: 禁止动画效果'
          },
          component:     'CustomAppearanceDisableAnimationsExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceDisableAnimationsExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/ZEQMOxY'
        },
        {
          title: {
            en:          'custom appearance: extra content',
            zh:          '自定义外观: 附加内容'
          },
          component:     'CustomAppearanceExtraContentExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceExtraContentExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/NWxLrMo'
        },
        {
          title: {
            en:          'custom appearance: limit title width',
            zh:          '自定义外观: 限制标题宽度'
          },
          component:     'CustomAppearanceLimitTitleWidthExample',
          sourceCodeUrl: 'https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceLimitTitleWidthExample.vue',
          codePenUrl:    'https://codepen.io/tinywisp/pen/yLexJQL'
        }
      ]
    }
  },
  mounted() {
    let lang = navigator.languages
        ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage)
    if (lang.indexOf('zh') === 0) {
      this.locale = 'zh'
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  background-color: green;
  margin: 0;
}
.header .title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  display: inline-block;
  position: relative;
  top: 30px;
}
.title:lang(zh) {
  letter-spacing: 0.2em;
}
hr:first-of-type {
  background-color: green;
  margin-top: 0;
}
hr {
  border:none;
	height: 30px;
	border-bottom: 5px solid green;
	box-shadow: 0 10px 10px -10px #333;
  margin-bottom: 50px;
}
.row {
  border: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
}
.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 1em;
}
.links {
  margin-bottom: 5em;
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
</style>