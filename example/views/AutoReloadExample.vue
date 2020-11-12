<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree
      ref="tree"
      :autoReload="false"
      :tree="tree"
      class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'auto-reload-example',
  components: {
    TWTree
  },
  data() {
    return {
      autoId: 100,
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
  mounted () {
    this.tree[0].title = 'hello, world!'
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
</style>