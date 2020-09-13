<template>
  <div class="example-wrapper">
    <span class="controller">
        <button class="btn" type="button" @click="sortByTitle" >sort by title</button>
        &nbsp; &nbsp;
        <button class="btn" type="button" @click="sortById" >sort by id</button>
    </span>
    <div class="panel">
      <TWTree :tree="tree" ref="tree" class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'search-example',
  components: {
    TWTree
  },
  data() {
    return {
      tree: [
        {
          id: 1,
          title: 'root',
          hasChild: true,
          children: [
            {
              id: 2,
              title: 'node 2',
            },
            {
              id: 3,
              title: 'node 1',
              hasChild: true,
              children: [
                {
                  id: 4,
                  title: 'child c'
                },
                {
                  id: 5,
                  title: 'child b'
                },
                {
                  id: 6,
                  title: 'child a'
                }
              ],
            },
            {
              id: 7,
              title: 'node 7'
            },
            {
              id: 8,
              title: 'node 8',
              hasChild: true,
              children: [
                  {
                      id: 9,
                      title: 'child f'
                  },
                  {
                      id: 10,
                      title: 'child e'
                  },
                  {
                      id: 11,
                      title: 'child d'
                  }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    sortById() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()

      tree.sort(node, true, function(node1, node2) {
          return node1.id - node2.id
      })
    },
    sortByTitle() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()

      tree.sort(node, true)
    }
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
.btn {
  width: auto;
  vertical-align: middle;
}
.btn:first-of-type {
  margin-right: 3em;
}
.input {
  width: 3em;
  vertical-align: middle;
}
.controller {
  display: block;
  width: 100%;
  text-align: center;
  line-height: 2em;
}
</style>
