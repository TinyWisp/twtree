<template>
  <div>
    <ul class="tree">
      <TWTreeNode :level="1" :key="node.id" :node="node" v-for="node of nodes">
        <template v-slot:state-icon="slotProps">
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" v-if="slotProps.state === 'expanded'">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" v-else-if="slotProps.state === 'collapsed'">
            <path d="M10 17l5-5-5-5v10z"/>
          </svg>
        </template>
      </TWTreeNode>
    </ul>
  </div>
</template>

<script>
import TWTreeNode from './TWTreeNode.vue'

export default {
  name: 'TWTree',
  props: {
    tree: Array
  },
  components: {
    TWTreeNode
  },
  provide() {
    return {
      setNode: this.setNode,
      emitEvent: this.emitEvent
    }
  },
  data() {
    return {
      nodes: this.tree,
    }
  },
  methods: {
    bubble() {
      let name = arguments[0]
      let params = []
      for (let i=1; i<arguments.length; i++) {
        params.push(arguments[i])
      }

      this.$emit(name, ...params)
    },
    setNode(nodeId, key, val) {
      let stack = []

      for (let i=this.nodes.length-1; i>=0; i--) {
        let node = this.nodes[i]
        stack.push(node)
      }

      while (stack.length > 0) {
        let node = stack.pop()

        if (node.id == nodeId) {
          this.$set(node, key, val)
          break
        }

        if (node.hasChild === true) {
          for (let i=node.children.length-1; i>=0; i--) {
            let child = node.children[i]
            stack.push(child)
          }
        }
      }
    },
    emitEvent() {
      let name = arguments[0]
      let params = []
      for (let i=1; i<arguments.length; i++) {
        params.push(arguments[i])
      }

      this.$emit(name, ...params)
    },
    edit(nodeId) {
      this.setNode(nodeId, 'isEditing', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree {
  position: relative;
  padding-inline-start: 0;
}
</style>
