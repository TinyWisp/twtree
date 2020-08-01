<template>
  <div class="example-wrapper">
    <button class="btn" @click="createTopNode()" >create a top level node</button>
    <button class="btn" @click="create()" >create</button>
    <button class="btn" @click="remove()" >remove</button>
    <button class="btn" @click="edit()" >edit</button>
    <input type="text" v-model="keyword" placeholder="search" @input="search()">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" @blur="blur" class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'root-node-no-root-node-example',
  components: {
    TWTree
  },
  data() {
    return {
      counter: 100,
      keyword: '',
      tree: [
        {
          id: 1,
          title: 'node 1',

        },
        {
            id: 2,
            title: 'node 2'
        },
        {
            id: 3,
            title: 'node 3',
            hasChild: true,
            children: [
              {
                id: 4,
                title: 'child 3-1',
              },
              {
                id: 5,
                title: 'child 3-2',
                hasChild: true,
                children: [
                  {
                    id: 6,
                    title: 'child 3-2-1'
                  },
                  {
                    id: 7,
                    title: 'child 3-2-2'
                  },
                  {
                    id: 8,
                    title: 'child 3-2-3'
                  }
                ],
              },
              {
                id: 9,
                title: 'child 3'
              },
              {
                id: 10,
                title: 'child 4'
              }
            ]
        },
        {
            id: 11,
            title: 'node 4'
        },
        {
            id: 12,
            title: 'node 5'
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
    edit() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      tree.edit(node)
    },
    search() {
      let tree = this.$refs.tree
      if (this.keyword === '') {
        tree.clearSearchResult()
      } else {
        tree.search(this.keyword)
      }
    },
    createTopNode() {
        this.counter += 1
        let tree = this.$refs.tree
        tree.create({
            id: this.counter,
            title: 'hello, world!' + this.counter,
            hasChild: false
        }, null)
    }
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
.btn {
  min-width: 100px;
  width: auto;
  margin-right: 20px;
}
</style>
