<template>
  <div class="example-wrapper">
    <button class="btn" @click="edit()" >edit</button>
    <div class="panel">
      <TWTree :tree="tree" ref="tree" @blur="blur" @keypress="keypress" class="tree" />
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
    keypress(node, event) {
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

<style scoped>
.panel .tree {
  width: 50%;
}
.btn {
  width: 100px;
  margin-right: 20px;
}
</style>
