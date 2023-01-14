<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        :tree="tree" 
        ref="tree" 
        class="tree"
        :enableDropExternalElement="true"
        :enableTouchSupport="true"
        @drop="drop"/>
      <div class="container">
        <div 
          class="draggable-element"
          @touchstart="touchStartHandler(i, $event)"
          @touchmove="touchMoveHandler($event)"
          @touchend="touchEndHandler()"
          :key = i
          v-for="(title, i) of draggableElements">
          {{title}}
        </div>
      </div>
      <div class="ghost-image" v-show="ghostImage.show" :style="{left: ghostImage.x + 'px', top: ghostImage.y + 'px'}">{{ghostImage.text}}</div>
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'drag-and-drop-with-touch-support-drop-an-external-element-example',
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
      draggedIdx: -1,
      ghostImage: {
        show: false,
        text: '',
        x: 0,
        y: 0,
      },
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
    touchStartHandler (idx, event) {
      event.preventDefault()
      this.draggedIdx = idx
      this.setGhostImage(event)
      this.showGhostImage()
      this.$refs.tree.allowExternalTouchOperation(event)
    },
    touchMoveHandler (event) {
      event.preventDefault()
      this.setGhostImage(event)
    },
    touchEndHandler () {
      this.hideGhostImage()
    },
    setGhostImage (event) {
      this.ghostImage.text = this.draggableElements[this.draggedIdx]
      let touch = event.touches.item(0)
      this.ghostImage.x = touch.pageX + 10
      this.ghostImage.y = touch.pageY + 10
    },
    showGhostImage () {
      this.ghostImage.show = true
    },
    hideGhostImage () {
      this.ghostImage.show = false
    },
    drop (dragAndDrop) {
      let title = this.draggableElements[this.draggedIdx]
      let node  = {
        id: Date.now(),
        title: title,
        hasChild: false
      }

      let overNode = dragAndDrop.overNode
      switch (dragAndDrop.overArea) {
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

      this.draggedIdx = -1
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
.ghost-image {
  position: fixed;
  width: calc(100px - 2em);
  height: 1em;
  border: 1px solid gray;
  padding: 0.2em;
  font-size: 12px;
  background-color: #bae7ff;
}
</style>
