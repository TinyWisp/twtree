# TWTree
[![GitHub](https://img.shields.io/github/license/tinywisp/twtree)](https://github.com/TinyWisp/twtree/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/twtree)](https://www.npmjs.com/package/twtree)
[![codecov](https://codecov.io/gh/TinyWisp/twtree/branch/master/graph/badge.svg)](https://codecov.io/gh/TinyWisp/twtree)
![Travis (.org)](https://img.shields.io/travis/TinyWisp/twtree)

 基于vue的树形组件。

* [主要特色](#主要特色)
* [开始使用](#开始使用)
* [文档](https://github.com/TinyWisp/twtree/wiki/%E6%96%87%E6%A1%A3)
* [示例](https://tinywisp.gitee.io/twtree/#/zh/)
* [开源协议](#开源协议)

A highly customizable tree component for vue.
* [Features](#features)
* [Getting Started](#getting-started)
* [Document](https://github.com/TinyWisp/twtree/wiki/Document)
* [Demos](https://tinywisp.github.io/twtree/#/en/)
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
 *  [示例](https://tinywisp.gitee.io/twtree/)

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
 *  [Demos](https://tinywisp.github.io/twtree/)

## License
 * MIT
 * it is free for commercial use.
 