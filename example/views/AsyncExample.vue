<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" class="tree" :fnLoadData="loadData" :defaultAttrs="{directoryState: 'collapsed'}" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'
import axios from 'axios'

export default {
  name: 'async-example',
  components: {
    TWTree
  },
  data() {
    return {
      tree: [
        {
          id: 1,
          title: 'ROOT',
          hasChild: true
        }
      ]
    }
  },
  methods: {
    loadData(node) {
      let url = 'load.json?id=' + node.id;
      let promise = new Promise(function(resolve, reject) {
        axios.get(url).then(function(response){
          resolve(response.data)
        }, function(error) {
          reject(error)
        })
      })

      return promise
    }
  }
}
</script>

<style scoped>
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
</style>