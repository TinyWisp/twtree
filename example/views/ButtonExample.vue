<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" :defaultAttrs="{style:{extraFloatRight:true}}" ref="tree" class="tree" @blur="blur">
        <template v-slot:extra="{node}">
          <svg class="button create" viewBox="0 0 32 32" @click="create(node)">
            <path d="M16 2 L16 30 M2 16 L30 16" />
          </svg>
          <svg class="button remove" viewBox="0 0 32 32" @click="remove(node)">
            <path d="M2 16 L30 16" />
          </svg>
          <svg class="button edit" viewBox="0 0 32 32" @click="edit(node)">
            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
          </svg>
        </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'button-example',
  components: {
    TWTree
  },
  data() {
    return {
      counter: 100,
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
    blur(node) {
      let tree = this.$refs.tree
      let newTitle = tree.getNewTitle(node)
      tree.setTitle(node, newTitle)
      tree.quitEdit(node)
    },
    create(node) {
      this.counter += 1
      let tree = this.$refs.tree
      let child = {
        id:  this.counter,
        title: 'hello, world!' + this.counter,
        hasChild: false
      }
      tree.create(child, node)
    },
    remove(node) {
      let tree = this.$refs.tree
      tree.remove(node)
    },
    edit(node) {
      let tree = this.$refs.tree
      tree.edit(node)
    }
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
.btn {
  width: 100px;
  margin-right: 20px;
}
.tree .button {
  width: 0.8em;
  height: 0.8em;
  margin-right: 0.5em;
  stroke-width: 2;
  fill: none;
  stroke: black;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.tree .button.edit{
  margin-right: 10em;
}
.tree .button:hover {
  stroke-width: 4;
  stroke: rebeccapurple;
}
</style>
