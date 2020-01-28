<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="create()" >create</button>
    <button @click="remove()" >remove</button>
    <button @click="edit()" >edit</button>
    <TWTree 
      :tree="tree" 
      ref="tree" 
      @open="open" 
      class="tree"
      :globalAttrs="{
        showCheckbox : true
      }"/>
  </div>
</template>

<script>
import TWTree from './TWTree.vue'

export default {
  name: 'app',
  components: {
    TWTree
  },
  data() {
    return {
      counter: 1000,
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
              title: 'child 3',
            },
            {
              id: 8,
              title: 'child 8',
              isEditing: true
            }
          ]
        }
      ]
    }
  },
  methods: {
    open(node) {
      console.log('event: open the node')
      console.log(node)
    },
    create() {
      this.counter += 1
      
      let tree = this.$refs.tree
      let node = tree.getSelectedNode()
      let child = {
        id:  this.counter,
        title: 'hello, world!' + this.counter,
        hasChild: false
      }
      tree.create(child, node)
    },
    remove() {
      let tree = this.$refs.tree
      let node = tree.getSelectedNode()
      tree.remove(node)
    },
    edit() {
      let tree = this.$refs.tree
      let node = tree.getSelectedNode()
      tree.edit(node)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tree {
  width: 200px;
}
</style>
