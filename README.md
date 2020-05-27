# TWTree
[![GitHub](https://img.shields.io/github/license/tinywisp/twtree)](https://github.com/TinyWisp/twtree/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/twtree)](https://www.npmjs.com/package/twtree)
[![codecov](https://codecov.io/gh/TinyWisp/twtree/branch/master/graph/badge.svg)](https://codecov.io/gh/TinyWisp/twtree)
![Travis (.org)](https://img.shields.io/travis/TinyWisp/twtree)

 基于vue的树形组件。

* [主要特色](#主要特色)
* [开始使用](#开始使用)
* [文档](https://github.com/TinyWisp/twtree/wiki/%E6%96%87%E6%A1%A3)
* [示例](#示例)
* [开源协议](#开源协议)

A highly customizable tree component for vue.
* [Features](#features)
* [Getting Started](#getting-started)
* [Document](https://github.com/TinyWisp/twtree/wiki/Document)
* [Demos](#demos)
* [License](#license)


## 主要特色
 *  支持复选框
 *  可异步加载
 *  拖放操作
 *  右键菜单
 *  按钮
 *  自定义外观

## 文档
 *  [文档](https://github.com/TinyWisp/twtree/wiki/%E6%96%87%E6%A1%A3)

## 开始使用

 npm
 ```
   npm install twtree --save
 ```

 引入
 ```
   import TWTree from 'twtree'
 ```

 示例
 ```javascript
<template>
  <div id="app">
    <TWTree :tree="tree" ref="tree" class="tree" />
  </div>
</template>

<script>
import TWTree from 'twtree'

export default {
  name: 'App',
  components: {
    TWTree
  },
  data() {
    return {
      tree: [
        {
          id: 1,
          title: 'ROOT',
          hasChild: true,
          children: [
            {
              id: 2,
              title: 'child 1',
            },
            {
              id: 3,
              title: 'child 2',
              hasChild: true,
              children: [
                {
                  id: 4,
                  title: 'child 2-1'
                },
                {
                  id: 5,
                  title: 'child 2-2'
                },
                {
                  id: 6,
                  title: 'child 2-3'
                }
              ],
            },
            {
              id: 7,
              title: 'child 3'
            },
            {
              id: 8,
              title: 'child 4'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.tree {
  width: 200px;
  height: 300px;
}
</style>

 ```

## 示例
 示例|源码
 ---|---
 [基础](https://tinywisp.github.io/twtree/#/example/basic) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/BasicExample.vue)
 [复选框](https://tinywisp.github.io/twtree/#/example/checkbox) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/CheckboxExample.vue)
 [单选按钮](https://tinywisp.github.io/twtree/#/example/radio-button) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/RadioButtonExample.vue)
 [异步加载](https://tinywisp.github.io/twtree/#/example/async) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/AsyncExample.vue)
 [编辑](https://tinywisp.github.io/twtree/#/example/edit) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/EditExample.vue)
 [按钮](https://tinywisp.github.io/twtree/#/example/button) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/ButtonExample.vue)
 [拖放](https://tinywisp.github.io/twtree/#/example/drag-and-drop) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/DragAndDropExample.vue)
 [右键菜单](https://tinywisp.github.io/twtree/#/example/contextmenu) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/ContextMenuExample.vue)
 [查找](https://tinywisp.github.io/twtree/#/example/search) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/SearchExample.vue)
 [多选](https://tinywisp.github.io/twtree/#/example/multi-select) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/MultiSelectExample.vue)
 [排序](https://tinywisp.github.io/twtree/#/example/sort) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/SortExample.vue)
 [无根结点](https://tinywisp.github.io/twtree/#/example/no-root) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/NoRootExample.vue)
 [自定义外观](https://tinywisp.github.io/twtree/#/example/custom-appearance) | [源码](https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceExample.vue)


## 开源协议
 * MIT
 * 无论个人还是公司，都可以免费自由使用
 
 ---
 

## Features
 *  checkbox
 *  async loading
 *  drag and drop
 *  context menu
 *  button
 *  customizable appearance

## Getting Started

 npm
 ```
   npm install twtree --save
 ```

 import the library
 ```
   import TWTree from 'twtree'
 ```

 usage
 ```javascript
<template>
  <div id="app">
    <TWTree :tree="tree" ref="tree" class="tree" />
  </div>
</template>

<script>
import TWTree from 'twtree'

export default {
  name: 'App',
  components: {
    TWTree
  },
  data() {
    return {
      tree: [
        {
          id: 1,
          title: 'ROOT',
          hasChild: true,
          children: [
            {
              id: 2,
              title: 'child 1',
            },
            {
              id: 3,
              title: 'child 2',
              hasChild: true,
              children: [
                {
                  id: 4,
                  title: 'child 2-1'
                },
                {
                  id: 5,
                  title: 'child 2-2'
                },
                {
                  id: 6,
                  title: 'child 2-3'
                }
              ],
            },
            {
              id: 7,
              title: 'child 3'
            },
            {
              id: 8,
              title: 'child 4'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.tree {
  width: 200px;
  height: 300px;
}
</style>

 ```

## Document
 *  [Document](https://github.com/TinyWisp/twtree/wiki/Document)

## Demos
 demo | code
 --- | ---
 [basic](https://tinywisp.github.io/twtree/#/example/basic) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/BasicExample.vue)
 [checkbox](https://tinywisp.github.io/twtree/#/example/checkbox) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/CheckboxExample.vue)
 [radio button](https://tinywisp.github.io/twtree/#/example/radio-button) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/RadioButtonExample.vue)
 [ansyc loading](https://tinywisp.github.io/twtree/#/example/async) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/AsyncExample.vue)
 [edit](https://tinywisp.github.io/twtree/#/example/edit) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/EditExample.vue)
 [button](https://tinywisp.github.io/twtree/#/example/button) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/ButtonExample.vue)
 [drag and drop](https://tinywisp.github.io/twtree/#/example/drag-and-drop) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/DragAndDropExample.vue)
 [context menu](https://tinywisp.github.io/twtree/#/example/contextmenu) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/ContextMenuExample.vue)
 [search](https://tinywisp.github.io/twtree/#/example/search) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/SearchExample.vue)
 [multiple select](https://tinywisp.github.io/twtree/#/example/multi-select) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/MultiSelectExample.vue)
 [sort](https://tinywisp.github.io/twtree/#/example/sort) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/SortExample.vue)
 [no root](https://tinywisp.github.io/twtree/#/example/no-root) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/NoRootExample.vue)
 [custom appearance](https://tinywisp.github.io/twtree/#/example/custom-appearance) | [code](https://github.com/TinyWisp/twtree/blob/master/src/views/CustomAppearanceExample.vue)
 
## License
 * MIT
 * it is free for commercial use.
 