<template>
  <li class="node" :style="cssProps">
      <div class="row" :style="{paddingLeft: indent}">
        <div class="switcher" @click="switchState">
          <slot name="state-icon" v-bind:state="state"></slot>
        </div>
        <a href="#" ref="title" @click="$emit('bubble', 'open', node)">
          <i class="icon" style="{backgroundImage: 'url(' + icon + ')'}" v-if="icon !== null" />
          <input
            ref="titleInput"
            class="title-input"
            @input="adjustTitleInputWidth"
            @change="titleChanged"
            v-model="title"
            v-if="isEditing"/>
          <span class="title" v-else>
            {{title}}
          </span>
        </a>
      </div>
      <ul :class="{'node-group': true, collapsed: state === 'collapsed'}" ref="nodeGroup" v-if="node.hasChild === true">
        <TWTreeNode :key="child.id" :node="child" :level="level + 1" @bubble="bubble" v-for="child of node.children" >
          <template v-slot:state-icon="slotProps">
            <slot name="state-icon" v-bind:state="slotProps.state"></slot>
          </template>
        </TWTreeNode>
      </ul>
  </li>
</template>

<script>
export default {
  name: 'TWTreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    level: {
      type: Number,
      required: true
    }
  },
  inject: ['setNode', 'emitEvent'],
  computed: {
    icon() {
      if (this.node.hasOwnProperty('icon')) {
        return this.node.icon;
      }

      if (this.node.hasOwnProperty('type')
        && this.options.hasOwnProperty('types')
        && this.options.types.hasOwnProperty(this.node.type)
        && this.options.types[this.node.type].hasOwnProperty('icon')) {
        return this.options.types[this.node.type].icon;
      }

      return null;
    },
    state() {
      if (this.node.hasChild !== true) {
        return 'none'
      }

      return this.node.hasOwnProperty('state')
          ? this.node.state
          : 'expanded'
    },
    isEditing() {
      return this.node.hasOwnProperty('isEditing')
        ? this.node.isEditing
        : false
    },
    indent() {
      let indent = this.getAttr('indent')
      return parseFloat(indent) * (this.level - 1) + indent.substr(-2)
    }
  },
  data() {
    return {
      cssProps: {
        '--node-group-max-height' : 'auto',
      },
      defaultAttrs: {
        state: 'expanded',
        isEditing: false,
        indent: '20px'
      },
      title: this.node.title
    }
  },
  methods: {
    bubble() {
      this.$emit('bubble', ...arguments)
    },
    switchState() {
        if (this.state === 'expanded') {
          this.setNode(this.node.id, 'state', 'collapsed')
        } else if (this.state === 'collapsed') {
          this.setNode(this.node.id, 'state', 'expanded')
        }
        setTimeout(function(){
          this.calcNodeGroupMaxHeight()
        }.bind(this), 400)
    },
    calcNodeGroupMaxHeight() {
      if (this.state !== 'none') {
        this.cssProps['--node-group-max-height'] = this.$refs.nodeGroup.scrollHeight + 'px';
      }
    },
    getAttr(key) {
      if (this.node.hasOwnProperty(key)) {
        return this.node[key]
      }

      if (this.options.hasOwnProperty(key)) {
        return this.options[key]
      }

      if (this.defaultAttrs.hasOwnProperty(key)) {
        return this.defaultAttrs[key]
      }

      return null
    },
    adjustTitleInputWidth() {
      if (this.isEditing === true) {
        this.$refs.titleInput.style.width = this.title.length + 'ch'
      }
    },
    titleChanged() {
      this.setNode(this.node.id, 'title', this.title)
      this.setNode(this.node.id, 'isEditing', false)
    }
  },
  mounted() {
    this.calcNodeGroupMaxHeight()
    this.adjustTitleInputWidth()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.node {
  list-style-type: none;
  text-align: left;
  padding-inline-start: 0;
}
.node .icon {
  width: 24px;
  height: 24px;
}
.node .row:hover {
  background: linear-gradient(to bottom, #beebff 0, #a8e4ff 100%);
}
.node-group {
  overflow: hidden;
  padding-inline-start: 0;
  max-height: var(--node-group-max-height);
  transition: max-height 0.3s ease;
}
.node-group.collapsed {
  max-height: 0;
}
.switcher {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>
