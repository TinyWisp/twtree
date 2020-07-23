<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" class="tree" :defaultAttrs="{style:{titleMaxWidth: '3em', titleOverflow: 'ellipsis'}}">
      </TWTree>
    </div>
    <div class="panel">
      <TWTree :tree="tree" class="tree" :defaultAttrs="{style:{titleMaxWidth: '20%', titleOverflow: 'ellipsis'}}">
      </TWTree>
    </div>
    <div class="panel">
      <TWTree :tree="tree" class="tree" :defaultAttrs="{style:{titleMaxWidth: '-20%', titleOverflow: 'ellipsis'}}">
      </TWTree>
    </div>

  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'custom-appearance-limit-title-width-example',
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
                  title: 'hello, world! hello, world! hello, world! hello, world! hello, world!'
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