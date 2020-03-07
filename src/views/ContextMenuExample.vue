<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" class="tree">
          <template v-slot:contextmenu="{node}">
            <ul class="menu" v-if="node.__.depth > 0">
              <li class="menu-item" @click="create">create</li>
              <li class="menu-item" @click="remove">remove</li>
            </ul>
          </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'contextmenu-example',
  components: {
    TWTree
  },
  data() {
    return {
      counter: 100,
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
            }
          ]
        }
      ]
    }
  },
  methods: {
    create() {
      this.counter += 1
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      let child = {
        id:  this.counter,
        title: 'hello, world!' + this.counter,
        hasChild: false
      }
      tree.create(child, node)
    },
    remove() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      tree.remove(node)
    },
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
.node-icon {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
  vertical-align: middle;
}
.menu {
  width: 10em;
  height: 5em;
  border: 1px solid gray;
  background-color: white;
  padding: 10px 0px;
  list-style-type: none;
  box-shadow: 5px 5px 5px 0px rgba(230,231,230,1);
  border-radius: 3px;
}
.menu .menu-item {
  line-height: 2em;
  text-indent: 2em;
}
.menu .menu-item:hover {
  background-color: lightblue;
}
</style>
