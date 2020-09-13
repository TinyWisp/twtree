<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        :tree="tree" 
        ref="tree"
        class="tree" 
        :checkboxLinkage = "false"
        :defaultAttrs="{
          checkbox: {
            show: true
          }
        }"
        @check="refresh()"
        @uncheck="refresh()"/>
    </div>
    <div class="result">
      <ul class="list">
        <li class="head">checked</li>
        <li class="item" :key="i" v-for="(node, i) in checked">
          {{node.title}}
        </li>
      </ul>
      <ul class="list">
        <li class="head">unchecked</li>
        <li class="item" :key="i" v-for="(node, i) in unchecked">
          {{node.title}}
        </li>
      </ul>
      <ul class="list">
        <li class="head">undetermined</li>
        <li class="item" :key="i" v-for="(node, i) in undetermined">
          {{node.title}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'checkbox-example',
  components: {
    TWTree
  },
  data() {
    return {
      checked: [],
      unchecked: [],
      undetermined: [],
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
                  title: 'child 2-2',
                  checkbox: {
                    state: 'checked'
                  }
                },
                {
                  id: 6,
                  title: 'child 2-3',
                  checkbox: {
                    state: 'checked'
                  }
                }
              ]
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
    refresh() {
      let tree = this.$refs.tree
      this.checked = tree.getChecked()
      this.unchecked = tree.getUnchecked()
      this.undetermined = tree.getUndetermined()
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style scoped>
.panel .tree {
  width: 50%;
}
.result {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 230px;
  margin-bottom: 30px;
}
.result .list {
  flex-grow: 1;
  width: 30%;
  list-style: none;
  padding-left: 0;
}
.result .list .head {
  font-size: 18px;
  font-weight: bold;
  height: 1.5em;
}
.result .list .item {
  height: 1.5em;
}
</style>