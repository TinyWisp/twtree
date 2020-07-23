<template>
  <div class="example-wrapper">
    <div class="panel">
      <TWTree 
        :tree="tree" 
        ref="tree" 
        class="tree"
        :checkboxLinkage ="false"
        :defaultAttrs="{
            checkbox: {
                show: true,
                checked: false
            }
        }"
        @check="checkEvent">
        <template v-slot:checkbox="{node}">
          <svg class="radio-button unchecked" viewBox="0 0 24 24" v-if="node.checkbox.state === 'unchecked'">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          <svg class="radio-button checked" viewBox="0 0 24 24" v-if="node.checkbox.state === 'checked'">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
        </template>
      </TWTree>
    </div>
  </div>
</template>

<script>
import TWTree from '../components/TWTree.vue'

export default {
  name: 'radio-button-example',
  components: {
    TWTree
  },
  data() {
    return {
      tree: [
        {
          id: 3,
          title: 'gender',
          checkbox: {
            show: false
          },
          hasChild: true,
          children: [
            {
              id: 4,
              title: 'male',
              checkbox: {
                state: 'checked'
              }
            },
            {
              id: 5,
              title: 'female'
            },
            {
              id: 6,
              title: 'mtf'
            },
            {
              id: 7,
              title: 'ftm'
            }
          ],
        },
        {
          id: 13,
          title: 'age',
          checkbox: {
            show: false
          },
          hasChild: true,
          children: [
            {
              id: 14,
              title: '0 ~ 20'
            },
            {
              id: 15,
              title: '20 ~ 40',
              checkbox: {
                state: 'checked'
              }
            },
            {
              id: 16,
              title: '40 ~ 60'
            },
            {
              id: 17,
              title: '60 ~ 80'
            },
            {
              id: 18,
              title: '80 ~ 100'
            },
            {
              id: 19,
              title: '> 100'
            }
          ]
        },
        {
          id: 33,
          title: 'weight',
          checkbox: {
            show: false
          },
          hasChild: true,
          children: [
            {
              id: 34,
              title: '0 ~ 50kg'
            },
            {
              id: 35,
              title: '50kg ~ 100kg',
              checkbox: {
                state: 'checked'
              }
            },
            {
              id: 36,
              title: '100kg ~ 150kg'
            },
            {
              id: 37,
              title: '150kg ~ 200kg'
            },
            {
              id: 38,
              title: '> 200kg'
            }
          ]
        }
      ]
    }
  },
  methods: {
    checkEvent(node) {
      let tree = this.$refs.tree

      let items = node.__.parent.children
      for (let item of items) {
        if (node !== item) {
          tree.uncheck(item)
        }
      }
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
.radio-button {
  width: 1em;
  height: 1em;
  stroke: #2d8cf0;
  fill: #2d8cf0;
}
</style>
