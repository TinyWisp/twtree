<template>
  <div class="example-wrapper">
    <span class="controller">
        <input class="input" type="text" v-model="from"/> ~ <input class="input" type="text" v-model="to" /> <button class="btn" type="button" @click="search" >search</button>
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
      from: 1,
      to: 5,
      tree: [
        {
          id: 1,
          title: '1',
          hasChild: true,
          children: [
            {
              id: 2,
              title: '2',
            },
            {
              id: 3,
              title: '3',
              hasChild: true,
              children: [
                {
                  id: 4,
                  title: '4'
                },
                {
                  id: 5,
                  title: '5'
                },
                {
                  id: 6,
                  title: '6'
                }
              ],
            },
            {
              id: 7,
              title: '7'
            },
            {
              id: 8,
              title: '8',
              hasChild: true,
              children: [
                  {
                      id: 9,
                      title: '9'
                  },
                  {
                      id: 10,
                      title: '10'
                  },
                  {
                      id: 11,
                      title: '11'
                  }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    search() {
      let tree = this.$refs.tree
      let keyword = {
          from: parseInt(this.from),
          to: parseInt(this.to)
      }

      tree.clearSearchResult()
      tree.search(keyword, this.match)
    },
    match(node, keyword) {
        let from = keyword.from
        let to = keyword.to
        let val = parseInt(node.title)

        return (val >= from && val <= to)
    }
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
.btn {
  width: 7em;
  vertical-align: middle;
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
