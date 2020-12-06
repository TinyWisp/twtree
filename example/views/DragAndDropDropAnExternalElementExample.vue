<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        :tree="tree" 
        ref="tree" 
        class="tree"
        :enableDropExternalElement="true"
        @drop="drop"/>
      <div class="container">
        <div 
          class="draggable-element"
          :draggable="true"
          @dragstart="dragStartHandler(i)"
          :key = i
          v-for="(title, i) of draggableElements">
          {{title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'drag-and-drop-drop-an-external-element-example',
  components: {
    TWTree
  },
  data() {
    return {
      draggableElements: [
        'element 1',
        'element 2',
        'element 3'
      ],
      draggedIdx: null,
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
            },
            {
              id: 9,
              title: 'child 5'
            },
            {
              id: 10,
              title: 'child 6'
            }
          ]
        }
      ]
    }
  },
  methods: {
    dragStartHandler (idx) {
      this.draggedIdx = idx
    },
    drop (dragAndOver) {
      if (dragAndOver.status !== 3) {
        return
      }

      let title = this.draggableElements[this.draggedIdx]
      let node  = {
        id: Date.now(),
        title: title,
        hasChild: false
      }

      let overNode = dragAndOver.overNode
      switch (dragAndOver.overArea) {
        case 'prev':
          this.$refs.tree.create(node, overNode.__.parent, overNode.__.pos)
          break
        
        case 'self':
          this.$refs.tree.create(node, overNode)
          break

        case 'next':
          this.$refs.tree.create(node, overNode.__.parent, overNode.__.pos + 1)
          break
      }
    }
  }
}
</script>

<style scoped>
.panel {
  position: relative;
}
.panel .tree {
  width: 50%;
}
.btn {
  width: 100px;
  margin-right: 20px;
}
.info {
  display: block;
  width: 100%;
  text-align: left;
}
.key {
  font-weight: bold;
  font-size: 18px;
}
.container {
  padding: 0 2em;
  width: 100px;
  border: 0;
  position: absolute;
  left: 60%;
  top: 100px;
}
.container .draggable-element {
  border: 1px solid gray;
  width: auto;
  height: 1em;
  padding: 0.2em;
  margin-bottom: 1em;
  font-size: 12px;
}
.container .draggable-element:hover {
  background-color: #bae7ff;
}
</style>
