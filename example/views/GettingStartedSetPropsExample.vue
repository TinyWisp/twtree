<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
      :tree="tree"
      :defaultAttrs="{
        style: {
          titleMaxWidth: '3em',
          titleOverflow: 'ellipsis'
        }
      }"
      class="tree" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'getting-started-set-props-example',
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
              title: 'hello, world! hello, world! hello, world! hello, world! hello, world!',
            },
            {
              id: 3,
              title: 'hello, world! hello, world! hello, world! hello, world! hello, world!',
              hasChild: true,
              children: [
                {
                  id: 4,
                  title: 'hello, world! hello, world! hello, world! hello, world! hello, world!',
                  style: {
                      titleMaxWidth: '15em'
                  }
                },
                {
                  id: 5,
                  title: 'hello, world! hello, world! hello, world! hello, world! hello, world!'
                },
                {
                  id: 6,
                  title: 'hello, world! hello, world! hello, world! hello, world! hello, world!'
                }
              ],
            },
            {
              id: 7,
              title: 'hello, world! hello, world! hello, world! hello, world! hello, world!'
            },
            {
              id: 8,
              title: 'hello, world! hello, world! hello, world! hello, world! hello, world!'
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