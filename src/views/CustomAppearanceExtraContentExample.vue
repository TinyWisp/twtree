<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        class="tree" 
        :tree="tree" 
        :defaultAttrs="{
            style: {
                extraFloatRight:true
        }}">
        <template v-slot:extra>
          <svg viewBox="0 0 32 32" class="extra-content" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
          </svg>
        </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'custom-appearance-extra-content-example',
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
              style: {
                extraAlwaysVisible: true
              }
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
.extra-content {
  width: 0.8em;
  height: 0.8em;
  stroke-width: 2;
  fill: red;
  stroke: red;
  stroke-linecap: round;
  stroke-linejoin: round;
  margin-right: 10em;
}
</style>