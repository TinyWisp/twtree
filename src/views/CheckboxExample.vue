<template>
  <div class="example-wrapper">
    <TWTree 
      :tree="tree" 
      class="tree"
      :globalAttrs="{
        showCheckbox : true
      }"/>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'checkbox-example',
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
              title: 'child 8'
            }
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
.tree {
  width: 200px;
}
</style>
