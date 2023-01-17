<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree
        ref="leftTree" 
        class="tree left"
        treeId="leftTree"
        :tree="leftTree"
        :enableDragNodeOut="true"
        :enableDropExternalElement="true"
        @drop="drop('leftTree', arguments[0])"/>
      <TWTree
        ref="rightTree" 
        class="tree right"
        treeId="rightTree"
        :tree="rightTree"
        :enableDragNodeOut="true"
        :enableDropExternalElement="true"
        @drop="drop('rightTree', arguments[0])"/>
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'drag-and-drop-multiple-trees-example',
  components: {
    TWTree
  },
  data() {
    return {
      leftTree: [
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
      ],


      rightTree: [
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
    drop (thisTreeId, dragAndDrop) {
      if (dragAndDrop.status !== 3) {
        return
      }

      let fromTree = this.$refs[dragAndDrop.from.treeId]
      let dragNode = fromTree.getById(dragAndDrop.from.nodeId)
      let toTree   = this.$refs[thisTreeId]
      let overNode = dragAndDrop.overNode

      let node  = {
        id: Date.now(),
        title: dragAndDrop.from.treeId + ' ' + dragNode.title,
        hasChild: false
      }

      switch (dragAndDrop.overArea) {
        case 'prev':
          toTree.create(node, overNode.__.parent, overNode.__.pos)
          fromTree.remove(dragNode)
          break
        
        case 'self':
          toTree.create(node, overNode)
          fromTree.remove(dragNode)
          break

        case 'next':
          toTree.create(node, overNode.__.parent, overNode.__.pos + 1)
          fromTree.remove(dragNode)
          break
      }
    }
  },
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
</style>
