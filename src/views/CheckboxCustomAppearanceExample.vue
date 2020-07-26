<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" ref="ctree" class="tree" :defaultAttrs="{checkbox:{show:true}}">
        <template v-slot:checkbox="{node}">
          <svg class="checkbox-icon checked" viewBox="0 0 24 24" v-if="node.checkbox.state === 'checked'">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg class="checkbox-icon unchecked" viewBox="0 0 24 24" v-else-if="node.checkbox.state === 'unchecked'">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <svg class="checkbox-icon undetermined" viewBox="0 0 24 24" v-else-if="node.checkbox.state === 'undetermined'">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'custom-appearance-checkbox-example',
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
.checkbox-icon {
    width: 12px;
    height: 12px;
    vertical-align: middle;
    stroke: #eb801c;
    stroke-width: 2px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    margin-right: 0.3em;
}
</style>