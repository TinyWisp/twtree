<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
      :tree="tree"
      :fnCustomClasses="fnCustomClasses"
      class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'custom-appearance-custom-classes-example',
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
                  title: 'child 2-1',
                  type: 'red'
                },
                {
                  id: 5,
                  title: 'child 2-2',
                  type: 'blue'
                },
                {
                  id: 6,
                  title: 'child 2-3',
                  type: 'brown'
                }
              ],
            },
            {
              id: 7,
              title: 'child 3',
            },
            {
              id: 8,
              title: 'child 4',
            }
          ]
        }
      ]
    }
  },
  methods: {
    fnCustomClasses(node) {
      if (node.type !== undefined) {
        return ['twtree-node-' + node.type]
      }
    }
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
.panel .tree >>> .twtree-node-red {
  color: red;
}
.panel .tree >>> .twtree-node-blue {
  color: blue;
}
.panel .tree >>> .twtree-node-brown {
  color: brown;
}
</style>