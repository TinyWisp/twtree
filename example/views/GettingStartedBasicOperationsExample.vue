<template>
  <div class="example-wrapper">
    <button class="btn" @click="create()" >create</button>
    <button class="btn" @click="createAndEdit()" style="width: 150px;">create and edit</button>
    <button class="btn" @click="remove()" >remove</button>
    <button class="btn" @click="edit()" >edit</button>
    <input type="text" v-model="keyword" placeholder="search" @input="search()">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" @blur="blur" class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'getting-started-basic-operations-example',
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
    blur(node) {
      let tree = this.$refs.tree
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
    createAndEdit() {
      this.counter += 1
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      let child = {
        id:  this.counter,
        title: 'hello, world!' + this.counter,
        hasChild: false
      }
      tree.createAndEdit(child, node)
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
