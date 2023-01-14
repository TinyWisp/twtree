<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree
        ref="tree"
        class="tree"
        :tree="tree"
        :enableDragNodeOut="true"
        :enableTouchSupport="true"/>
      <div
        :class="['container', isHover ? 'container-hover' : '']"
        ref="container"
      >
        {{containerTitle}}
      </div>
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'drag-and-drop-drag-a-node-out-example',
  components: {
    TWTree
  },
  data() {
    return {
      containerTitle: 'Drag a node here!',
      isHover: false,
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
    isInDropArea(touch) {
      if (!this.$refs.container) {
        return false
      }

      let container = this.$refs.container
      let containerRect = container.getBoundingClientRect()
      return (touch.clientX >= containerRect.left && touch.clientX <= containerRect.right && touch.clientY >= containerRect.top && touch.clientY <= containerRect.bottom) 
    },
    touchMoveHandler(event) {
      this.isHover = (this.isInDropArea(event.touches.item(0)) && this.$refs.tree.isTheTouchOperationFromTheTree(event))
    },
    touchEndHandler (event) {
      if (this.isInDropArea(event.changedTouches.item(0)) && this.$refs.tree.isTheTouchOperationFromTheTree(event)) {
        const from = this.$refs.tree.getDragFrom(event)
        const dragNode = this.$refs.tree.getById(from.nodeId)
        this.containerTitle = dragNode.title
        this.$refs.tree.remove(dragNode)
      }
    },
  },
  mounted() {
    document.addEventListener('touchmove', this.touchMoveHandler.bind(this))
    document.addEventListener('touchend', this.touchEndHandler.bind(this))
  },
  beforeDestroy() {
    document.removeEventListener('touchmove', this.touchMoveHandler.bind(this))
    document.removeEventListener('touchend', this.touchEndHandler.bind(this))
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
  line-height: 100px;
  width: 150px;
  height: 100px;
  border: 2px dashed gray;
  position: absolute;
  left: 60%;
  top: 100px;
}
.container-hover {
  background-color: lightgray;
}
</style>
