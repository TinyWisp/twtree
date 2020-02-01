<template>
  <div class="example-wrapper">
    <button class="btn" @click="create()" >create</button>
    <button class="btn" @click="remove()" >remove</button>
    <button class="btn" @click="edit()" >edit</button>
    <div class="panel">
      <TWTree 
        :tree="tree" 
        ref="tree"
        @select="handleSelectEvent"
        @unselect="handleUnselectEvent"
        @create="handleCreateEvent"
        @remove="handleRemoveEvent"
        @edit="handleEditEvent"
        @quitEdit="handleQuitEditEvent"
        @input="handleInputEvent"
        @blur="handleBlurEvent"
        @rename="handleRenameEvent"
        class="tree"
        :globalAttrs="{
          showCheckbox : false
        }"/>
      <ul class="logs">
        <li v-for="(log, i) in logs" class="log" :key=i>
          <span class="text prefix" :key="i + '_0'">{{log[0].text}}</span>
          <template v-for="(fragment, j) in log">
            <span class="object" :key="i + '_' + j" v-if="j>0 && fragment.type === 'object'"> object... <span class="tip"><pre>{{fragment.text}}</pre></span></span>
            <span class="text" :key="i + '_' + j" v-else-if="j > 0">{{fragment.text}}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'basic-example',
  components: {
    TWTree
  },
  data() {
    return {
      logs: [],
      counter: 1,
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
    output() {
      let fragments = []

      for (let i=0; i<arguments.length; i++) {
        let argument = arguments[i]
        let type = typeof(argument)
        let text = argument

        if (type === 'object') {
          text = JSON.stringify(argument, function(key, val){
            switch (key) {
              case 'parent':
                return 'object...'

              case 'path':
                return '[...]'

              case 'children':
                return '[...]'

              default:
                return val
            }
          }, 2)
        }

        fragments.push({
          type: type,
          text: text
        })
      }
      this.logs.push(fragments)
    },
    handleSelectEvent(node) {
      this.output('event: ', 'select (', node, ')')
    },
    handleUnselectEvent(node) {
      this.output('event: ', 'unselect (', node, ')')
    },
    handleCreateEvent(node) {
      this.output('event: ', 'create (', node, ')')
    },
    handleRemoveEvent(node) {
      this.output('event: ', 'remove (', node, ')')
    },
    handleRenameEvent(node, fromTitle, toTitle) {
      this.output('event: ', 'rename (', node, ' , ', fromTitle, ' , ', toTitle, ')')
    },
    handleEditEvent(node) {
      this.output('event: ', 'edit (', node, ')')
    },
    handleQuitEditEvent(node) {
      this.output('event: ', 'quitEdit (', node, ')')
    },
    handleBlurEvent(node, newTitle) {
      this.output('event: ', 'blur (', node, ' , ', newTitle, ')')

      let tree = this.$refs.tree
      this.output('call method: ', 'setTitle (', node, ' , ', newTitle, ')')
      tree.setTitle(node, newTitle)
      this.output('call method: ', 'quitEdit (', node, ')')
      tree.quitEdit(node)
    },
    handleInputEvent(node) {
      this.output('event: ', 'input (', node, ')')
    },
    create() {
      this.counter += 1
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      let child = {
        id:  this.counter,
        title: 'hello, world!' + this.counter,
        hasChild: false
      }
      this.output('call method: ', 'create (', child, ',', node, ')')
      tree.create(child, node)
    },
    remove() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      this.output('call method: ', 'remove (', node, ')')
      tree.remove(node)
    },
    edit() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      this.output('call method: ', 'edit(', node, ')')
      tree.edit(node)
    }
  }
}
</script>

<style>
.example-wrapper {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.panel {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  padding: 10px;
  margin: 20px 0 20px 0;
  border: 1px solid gray;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.panel .tree {
  width: 50%;
}
.panel .logs {
  width: 50%;
  border-left: 1px dashed gray;
  padding-left: 10px;
  overflow-y: scroll;
}
.panel .logs .log {
  font-size: 12px;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  list-style: none;
  text-align: left;
  text-indent: 1em;
}
.panel .logs .log:nth-child(even) {
  background-color: #f3f3f3;
}
.panel .logs .log .text.prefix {
  color: gray;
  margin-right: 2em;
}
.panel .logs .object {
  position: relative;
  text-decoration: underline;
  font-style: italic;
  font-size: 0.8em;
  margin-left: 0.2em;
  margin-right: 0.2em;
  text-indent: 0;
}
.panel .logs .object .tip {
  display: none;
  width: auto;
  position: absolute;
  left: 0;
  top: 2em;
  background-color: white;
  border: 1px solid lightgray;
  box-shadow: 0 0 3px #ccc;
  padding: 5px;
  font-size: 10px;
  border-radius: 3px;
  text-decoration: none;
  font-style: normal;
  text-indent: 0;
  z-index: 999;
}
.panel .logs .object:hover .tip {
  display: block;
}
.btn {
  width: 100px;
  margin-right: 20px;
}
</style>
