<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" class="tree" :fnIsDroppable="isDroppable" />
    </div>
    dragNode: {{dragNode}}
    overNode: {{overNode}}
    overArea: {{overArea}}
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'basic-example',
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
    }
  }
}
</script>
fconfigeth0734

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
</style>
