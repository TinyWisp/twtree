<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
      :tree="tree"
      class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'getting-started-display-a-tree-example',
  components: {
    TWTree
  },
  data() {
    return {
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
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
</style>