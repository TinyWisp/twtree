<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree
        ref="tree"
        class="tree"
        :tree="tree"
        :fnBeforeDrag="beforeDrag"
        :fnIsDroppable="isDroppable"
        :enableTouchSupport="true"
        @dragover="showInfo"
        @dragend="showInfo"
      />
    </div>
    <span class="info">
      <span class="key">dragNode:</span> <span class="val">{{dragNode}}</span> <br>
      <span class="key">overNode:</span> <span class="val">{{overNode}}</span> <br>
      <span class="key">overArea:</span> <span class="val">{{overArea}}</span>
    </span>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'drag-and-drop-with-touch-support-advanced-example',
  components: {
    TWTree
  },
  data() {
    return {
      dragNode: '',
      overNode: '',
      overArea: '',
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
                  title: 'not draggable',
                  draggable: false
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
              title: 'cannot drop before this node'
            },
            {
              id: 9,
              title: 'annot drop after this node'
            },
            {
              id: 10,
              title: 'cannot be parent'
            }
          ]
        }
      ]
    }
  },
  methods: {
    beforeDrag(node) {
      return node.draggable !== false
    },
    isDroppable(dragAndDrop) {
      //cannot drop before node 8
      if (dragAndDrop.overNode.id === 8 && dragAndDrop.overArea === 'prev') {
        return false
      }

      if (dragAndDrop.overNode.id === 7 && dragAndDrop.overArea === 'next') {
        return false
      }

      //cannot drop after node 9
      if (dragAndDrop.overNode.id === 9 && dragAndDrop.overArea === 'next') {
        return false
      }

      if (dragAndDrop.overNode.id === 10 && dragAndDrop.overArea === 'prev') {
        return false
      }

      //node 10 cannot be parent
      if (dragAndDrop.overNode.id === 10 && dragAndDrop.overArea === 'self') {
        return false
      }

      return true
    },
    showInfo() {
      let tree = this.$refs.tree

      this.dragNode = tree.dragAndDrop.dragNode !== null
        ? tree.dragAndDrop.dragNode.title
        : ''
      this.overNode = tree.dragAndDrop.overNode !== null
        ? tree.dragAndDrop.overNode.title
        : ''
      this.overArea = tree.dragAndDrop.overArea !== null
        ? tree.dragAndDrop.overArea
        : ''
    }
  }
}
</script>

<style scoped>
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
</style>
