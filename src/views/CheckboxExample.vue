<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        :tree="tree" 
        ref="tree" 
        class="tree" 
        :defaultAttrs="{
          checkbox: {
            show: true
          }
        }"
        @check="refresh()"
        @uncheck="refresh()" />
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
import TWTree from '../components/TWTree.vue'

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
                  title: 'no checkbox',
                  checkbox: {
                    show: false
                  }
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
                  title: 'checkbox disabled',
                  checkbox: {
                    state: 'checked',
                    disable: true
                  }
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

<style>
.example-wrapper {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.panel {
  width: 100%;
  min-height: 500px;
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
.btn {
  width: 100px;
  margin-right: 20px;
}
.result {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.result .list {
  flex-grow: 1;
  width: 30%;
  list-style: none;
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