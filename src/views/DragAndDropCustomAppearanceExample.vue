<template>
  <div class="example-wrapper">
    <div class="panel">
        <TWTree :tree="tree" ref="dndtree" class="tree">
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
          <svg viewBox="0 0 32 32" :style="{overflow: 'visible'}" width="1.7em" height="2em" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M22 6 L30 16 22 26 M30 16 L2 16" />
          </svg>
        </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'drag-and-drop-custom-appearance-example',
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
.panel .tree {
  width: 50%;
}
.drag-image-icon {
  width: 1em;
  height: 1em;
  margin-right: 1em;
  stroke-width: 6px;
}
.drag-image-icon.droppable {
  color: green;
}
.drag-image-icon.notDroppable {
  color: red;
}
.drag-image-title {
  text-indent: 0;
  width: auto;
  height: 1.5em;
  line-height: 1.5em;
  padding: 0.3em 0.5em;
  border: 0;
  border-radius: 5px;
  background-color: #eb801c;
  box-shadow: 3px 3px 3px 0px rgba(0,0,0,0.2);
}
</style>