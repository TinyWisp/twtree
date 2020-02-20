<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" class="tree">
          <template v-slot:icon="{node}">
              <img class="node-icon" src="../assets/folder.svg" v-if="node.hasChild && node.__.directoryState === 'collapsed'"/>
              <img class="node-icon" src="../assets/folder-open.svg" v-else-if="node.hasChild && node.__.directoryState === 'expanded'"/>
              <img class="node-icon" src="../assets/video.svg" v-else-if="!node.hasChild && node.type === 'video'"/>
              <img class="node-icon" src="../assets/audio.svg" v-else-if="!node.hasChild && node.type === 'audio'"/>
              <img class="node-icon" src="../assets/text.svg" v-else />
          </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'custom-icon-example',
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
              id: 3,
              title: 'videos',
              hasChild: true,
              children: [
                {
                  id: 4,
                  title: 'song of ice and fire',
                  type: 'video'
                },
                {
                  id: 5,
                  title: 'harry potter',
                  type: 'video'
                },
                {
                  id: 6,
                  title: 'the lord of the rings',
                  type: 'video'
                }
              ],
            },
            {
              id: 7,
              title: 'audios',
              hasChild: true,
              children: [
                  {
                      id: 8,
                      title: 'yesterday once more',
                      type: 'audio'
                  },
                  {
                      id: 9,
                      title: 'my heart will go on',
                      type: 'audio'
                  },
                  {
                      id: 10,
                      title: 'lovers',
                      type: 'audio'
                  }
              ]
            },
            {
              id: 11,
              title: 'text 1'
            },
            {
              id: 12,
              title: 'text 2'
            }
          ]
        }
      ]
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
.node-icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
    vertical-align: middle;
}
</style>
