<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        :tree="tree" 
        @expand="stripes"
        @collapse="stripes"
        ref="tree" 
        class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'custom-appearance-stripes-example',
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
  },
  methods: {
    stripes() {
        let tree = this.$refs.tree
        tree.traverse(function(node) {
            if (node.__.isVisible) {
                let bgColor = node.__.dpos % 2 === 1
                            ? 'lightblue'
                            : 'transparent';
                tree.setAttr(node, 'style', 'bgColor', bgColor)
            }
        })
    }
  },
  mounted() {
      this.stripes()
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
</style>