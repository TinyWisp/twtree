<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" class="tree">
          <template v-slot:icon="{node}">
            <svg v-if="node.__.parent === null" class="root-node-icon" viewBox="0 0 32 32" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
            </svg>
          </template>
           <template v-slot:title="{node}">
            <span v-if="node.__.parent === null" class="root-node-title">
              {{node.title}}
            </span>
          </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'root-node-custom-appearance-example',
  components: {
    TWTree
  },
  data() {
    return {
      text: '',
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
.root-node-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: brown;
  stroke: brown;
}
.root-node-title {
  font-weight: bold;
  color: brown;
}
</style>