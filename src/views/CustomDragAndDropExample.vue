<template>
  <div class="example-wrapper">
    <input type="text" v-model="keyword" placeholder="search" @input="search()">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" class="tree">
        <template v-slot:drag-image="{dnd}">
          <svg class="drag-image-icon droppable" viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" v-if="dnd.overNode.__.isDroppable">
            <path d="M2 20 L12 28 30 4" />
          </svg>
          <svg class="drag-image-icon notDroppable" viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" v-else>
            <path d="M2 30 L30 2 M30 30 L2 2" />
          </svg> 
          <span class="drag-image-title">{{dnd.dragNode.title}}</span>
        </template>
        <template v-slot:drag-arrow>
          <svg class="drag-arrow" viewBox="0 0 32 32">
            <path d="M22 10 L30 16 22 22 M30 16 L2 16"></path>
          </svg>
        </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'custom-drag-and-drop-example',
  components: {
    TWTree
  },
  data() {
    return {
      counter: 100,
      keyword: '',
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

<style>
.example-wrapper {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
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
.panel .tree {
  width: 50%;
}
.btn {
  width: 100px;
  margin-right: 20px;
}
.tree .drag-image-icon {
  width: 1em;
  height: 1em;
  margin-right: 1em;
  stroke-width: 6px;
}
.tree .drag-image-icon.droppable {
  color: green;
}
.tree .drag-image-icon.notDroppable {
  color: red;
}
.tree .drag-image-title {
  text-indent: 0;
  width: auto;
  height: 1.5em;
  line-height: 1.5em;
  padding: 0.3em 0.5em;
  border: 0;
  border-radius: 5px;
  background-color: #bae7ff;
}
.tree .drag-arrow {
  stroke-width: 3px;
  stroke: green;
  width: 1em;
  height: 1em;
  fill: none;
}
</style>
