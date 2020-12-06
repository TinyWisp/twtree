<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree"  ref="tree"  class="tree" :enableDragNodeOut="true"/>
      <div
        class="container"
        @dragover="dragOver"
        @drop="dropNode">
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
    dragOver (event) {
      event.preventDefault()
    },
    dropNode (event) {
      let obj = JSON.parse(event.dataTransfer.getData('twtree'))
      let node = this.$refs.tree.getById(obj.nodeId)
      this.containerTitle = node.title
      this.$refs.tree.remove(node)
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
  line-height: 100px;
  width: 150px;
  height: 100px;
  border: 2px dashed gray;
  position: absolute;
  left: 60%;
  top: 100px;
}
</style>
