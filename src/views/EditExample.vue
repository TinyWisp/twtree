<template>
  <div class="example-wrapper">
    <button class="btn" @click="edit()" >edit</button>
    <div class="panel">
      <TWTree :tree="tree" ref="tree" @blur="blur" @keydown="keydown" class="tree" />
    </div>
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
      counter: 0,
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
                  title: 'numbers only!'
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
  },
  methods: {
    blur(node) {
      let tree = this.$refs.tree
      let newTitle = tree.getNewTitle(node)
      tree.setTitle(node, newTitle)
      tree.quitEdit(node)
    },
    edit() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      tree.edit(node)
    },
    keydown(node, event) {
        if (node.id === 4) {
            let key = event.keyCode
            let min = '0'.charCodeAt(0)
            let max = '9'.charCodeAt(0)

            if (key < min || key > max) {
                event.returnValue = false
                event.preventDefault()
            }
        }
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
</style>
