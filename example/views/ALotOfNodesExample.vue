<template>
  <div class="example-wrapper">
    <button class="btn" @click="create()" >create</button>
    <button class="btn" @click="remove()" >remove</button>
    <button class="btn" @click="edit()" >edit</button>
    <input type="text" v-model="keyword" placeholder="search" @input="search()">
    <div class="panel">
      <TWTree :tree="tree" ref="tree" @blur="blur" class="tree" :autoReload="false" />
    </div>
  </div>
</template>

<script>
import TWTree from '../../src/TWTree.vue'

export default {
  name: 'a-lot-of-nodes-example',
  components: {
    TWTree
  },
  data() {
    return {
      counter: 1000,
      keyword: '',
      tree:[{
        "title": "ROOT",
        "hasChild": true,
        "children": [{
                "title": "child 1"
            },
            {
                "title": "child 3",
                "hasChild": true,
                "children": [{
                        "title": "child 3-1"
                    },
                    {
                        "title": "child 3-2"
                    },
                    {
                        "title": "child 3-3"
                    },
                    {
                        "title": "child 3-4"
                    },
                    {
                        "title": "child 3-5"
                    },
                    {
                        "title": "child 3-6"
                    },
                    {
                        "title": "child 3-7"
                    },
                    {
                        "title": "child 3-8"
                    },
                    {
                        "title": "child 3-9"
                    },
                    {
                        "title": "child 3-10"
                    },
                    {
                        "title": "child 3-11"
                    },
                    {
                        "title": "child 3-12"
                    },
                    {
                        "title": "child 3-13"
                    },
                    {
                        "title": "child 3-14"
                    },
                    {
                        "title": "child 3-15"
                    },
                    {
                        "title": "child 3-16"
                    },
                    {
                        "title": "child 3-17"
                    },
                    {
                        "title": "child 3-18"
                    },
                    {
                        "title": "child 3-19"
                    },
                    {
                        "title": "child 3-20"
                    }
                ]
            },
            {
                "title": "child 3",
                "hasChild": true,
                "children": [{
                        "title": "child 3-1"
                    },
                    {
                        "title": "child 3-2"
                    },
                    {
                        "title": "child 3-3"
                    },
                    {
                        "title": "child 3-4"
                    },
                    {
                        "title": "child 3-5"
                    },
                    {
                        "title": "child 3-6"
                    },
                    {
                        "title": "child 3-7"
                    },
                    {
                        "title": "child 3-8"
                    },
                    {
                        "title": "child 3-9"
                    },
                    {
                        "title": "child 3-10"
                    },
                    {
                        "title": "child 3-11"
                    },
                    {
                        "title": "child 3-12"
                    },
                    {
                        "title": "child 3-13"
                    },
                    {
                        "title": "child 3-14"
                    },
                    {
                        "title": "child 3-15"
                    },
                    {
                        "title": "child 3-16"
                    },
                    {
                        "title": "child 3-17"
                    },
                    {
                        "title": "child 3-18"
                    },
                    {
                        "title": "child 3-19"
                    },
                    {
                        "title": "child 3-20"
                    }
                ]
            },
            {
                "title": "child 4",
                "hasChild": true,
                "children": [{
                        "title": "child 4-1"
                    },
                    {
                        "title": "child 4-2"
                    },
                    {
                        "title": "child 4-3"
                    },
                    {
                        "title": "child 4-4"
                    },
                    {
                        "title": "child 4-5"
                    },
                    {
                        "title": "child 4-6"
                    },
                    {
                        "title": "child 4-7"
                    },
                    {
                        "title": "child 4-8"
                    },
                    {
                        "title": "child 4-9"
                    },
                    {
                        "title": "child 4-10"
                    },
                    {
                        "title": "child 4-11"
                    },
                    {
                        "title": "child 4-12"
                    },
                    {
                        "title": "child 4-13"
                    },
                    {
                        "title": "child 4-14"
                    },
                    {
                        "title": "child 4-15"
                    },
                    {
                        "title": "child 4-16"
                    },
                    {
                        "title": "child 4-17"
                    },
                    {
                        "title": "child 4-18"
                    },
                    {
                        "title": "child 4-19"
                    },
                    {
                        "title": "child 4-20"
                    }
                ]
            },
            {
                "title": "child 5",
                "hasChild": true,
                "children": [{
                        "title": "child 5-1"
                    },
                    {
                        "title": "child 5-2"
                    },
                    {
                        "title": "child 5-3"
                    },
                    {
                        "title": "child 5-4"
                    },
                    {
                        "title": "child 5-5"
                    },
                    {
                        "title": "child 5-6"
                    },
                    {
                        "title": "child 5-7"
                    },
                    {
                        "title": "child 5-8"
                    },
                    {
                        "title": "child 5-9"
                    },
                    {
                        "title": "child 5-10"
                    },
                    {
                        "title": "child 5-11"
                    },
                    {
                        "title": "child 5-12"
                    },
                    {
                        "title": "child 5-13"
                    },
                    {
                        "title": "child 5-14"
                    },
                    {
                        "title": "child 5-15"
                    },
                    {
                        "title": "child 5-16"
                    },
                    {
                        "title": "child 5-17"
                    },
                    {
                        "title": "child 5-18"
                    },
                    {
                        "title": "child 5-19"
                    },
                    {
                        "title": "child 5-20"
                    }
                ]
            },
            {
                "title": "child 6",
                "hasChild": true,
                "children": [{
                        "title": "child 6-1"
                    },
                    {
                        "title": "child 6-2"
                    },
                    {
                        "title": "child 6-3"
                    },
                    {
                        "title": "child 6-4"
                    },
                    {
                        "title": "child 6-5"
                    },
                    {
                        "title": "child 6-6"
                    },
                    {
                        "title": "child 6-7"
                    },
                    {
                        "title": "child 6-8"
                    },
                    {
                        "title": "child 6-9"
                    },
                    {
                        "title": "child 6-10"
                    },
                    {
                        "title": "child 6-11"
                    },
                    {
                        "title": "child 6-12"
                    },
                    {
                        "title": "child 6-13"
                    },
                    {
                        "title": "child 6-14"
                    },
                    {
                        "title": "child 6-15"
                    },
                    {
                        "title": "child 6-16"
                    },
                    {
                        "title": "child 6-17"
                    },
                    {
                        "title": "child 6-18"
                    },
                    {
                        "title": "child 6-19"
                    },
                    {
                        "title": "child 6-20"
                    }
                ]
            },
            {
                "title": "child 7",
                "hasChild": true,
                "children": [{
                        "title": "child 7-1"
                    },
                    {
                        "title": "child 7-2"
                    },
                    {
                        "title": "child 7-3"
                    },
                    {
                        "title": "child 7-4"
                    },
                    {
                        "title": "child 7-5"
                    },
                    {
                        "title": "child 7-6"
                    },
                    {
                        "title": "child 7-7"
                    },
                    {
                        "title": "child 7-8"
                    },
                    {
                        "title": "child 7-9"
                    },
                    {
                        "title": "child 7-10"
                    },
                    {
                        "title": "child 7-11"
                    },
                    {
                        "title": "child 7-12"
                    },
                    {
                        "title": "child 7-13"
                    },
                    {
                        "title": "child 7-14"
                    },
                    {
                        "title": "child 7-15"
                    },
                    {
                        "title": "child 7-16"
                    },
                    {
                        "title": "child 7-17"
                    },
                    {
                        "title": "child 7-18"
                    },
                    {
                        "title": "child 7-19"
                    },
                    {
                        "title": "child 7-20"
                    }
                ]
            },
            {
                "title": "child 8",
                "hasChild": true,
                "children": [{
                        "title": "child 8-1"
                    },
                    {
                        "title": "child 8-2"
                    },
                    {
                        "title": "child 8-3"
                    },
                    {
                        "title": "child 8-4"
                    },
                    {
                        "title": "child 8-5"
                    },
                    {
                        "title": "child 8-6"
                    },
                    {
                        "title": "child 8-7"
                    },
                    {
                        "title": "child 8-8"
                    },
                    {
                        "title": "child 8-9"
                    },
                    {
                        "title": "child 8-10"
                    },
                    {
                        "title": "child 8-11"
                    },
                    {
                        "title": "child 8-12"
                    },
                    {
                        "title": "child 8-13"
                    },
                    {
                        "title": "child 8-14"
                    },
                    {
                        "title": "child 8-15"
                    },
                    {
                        "title": "child 8-16"
                    },
                    {
                        "title": "child 8-17"
                    },
                    {
                        "title": "child 8-18"
                    },
                    {
                        "title": "child 8-19"
                    },
                    {
                        "title": "child 8-20"
                    }
                ]
            },
            {
                "title": "child 9",
                "hasChild": true,
                "children": [{
                        "title": "child 9-1"
                    },
                    {
                        "title": "child 9-2"
                    },
                    {
                        "title": "child 9-3"
                    },
                    {
                        "title": "child 9-4"
                    },
                    {
                        "title": "child 9-5"
                    },
                    {
                        "title": "child 9-6"
                    },
                    {
                        "title": "child 9-7"
                    },
                    {
                        "title": "child 9-8"
                    },
                    {
                        "title": "child 9-9"
                    },
                    {
                        "title": "child 9-10"
                    },
                    {
                        "title": "child 9-11"
                    },
                    {
                        "title": "child 9-12"
                    },
                    {
                        "title": "child 9-13"
                    },
                    {
                        "title": "child 9-14"
                    },
                    {
                        "title": "child 9-15"
                    },
                    {
                        "title": "child 9-16"
                    },
                    {
                        "title": "child 9-17"
                    },
                    {
                        "title": "child 9-18"
                    },
                    {
                        "title": "child 9-19"
                    },
                    {
                        "title": "child 9-20"
                    }
                ]
            },
            {
                "title": "child 10",
                "hasChild": true,
                "children": [{
                        "title": "child 10-1"
                    },
                    {
                        "title": "child 10-2"
                    },
                    {
                        "title": "child 10-3"
                    },
                    {
                        "title": "child 10-4"
                    },
                    {
                        "title": "child 10-5"
                    },
                    {
                        "title": "child 10-6"
                    },
                    {
                        "title": "child 10-7"
                    },
                    {
                        "title": "child 10-8"
                    },
                    {
                        "title": "child 10-9"
                    },
                    {
                        "title": "child 10-10"
                    },
                    {
                        "title": "child 10-11"
                    },
                    {
                        "title": "child 10-12"
                    },
                    {
                        "title": "child 10-13"
                    },
                    {
                        "title": "child 10-14"
                    },
                    {
                        "title": "child 10-15"
                    },
                    {
                        "title": "child 10-16"
                    },
                    {
                        "title": "child 10-17"
                    },
                    {
                        "title": "child 10-18"
                    },
                    {
                        "title": "child 10-19"
                    },
                    {
                        "title": "child 10-20"
                    }
                ]
            },
            {
                "title": "child 11",
                "hasChild": true,
                "children": [{
                        "title": "child 11-1"
                    },
                    {
                        "title": "child 11-2"
                    },
                    {
                        "title": "child 11-3"
                    },
                    {
                        "title": "child 11-4"
                    },
                    {
                        "title": "child 11-5"
                    },
                    {
                        "title": "child 11-6"
                    },
                    {
                        "title": "child 11-7"
                    },
                    {
                        "title": "child 11-8"
                    },
                    {
                        "title": "child 11-9"
                    },
                    {
                        "title": "child 11-10"
                    },
                    {
                        "title": "child 11-11"
                    },
                    {
                        "title": "child 11-12"
                    },
                    {
                        "title": "child 11-13"
                    },
                    {
                        "title": "child 11-14"
                    },
                    {
                        "title": "child 11-15"
                    },
                    {
                        "title": "child 11-16"
                    },
                    {
                        "title": "child 11-17"
                    },
                    {
                        "title": "child 11-18"
                    },
                    {
                        "title": "child 11-19"
                    },
                    {
                        "title": "child 11-20"
                    }
                ]
            },
            {
                "title": "child 12",
                "hasChild": true,
                "children": [{
                        "title": "child 12-1"
                    },
                    {
                        "title": "child 12-2"
                    },
                    {
                        "title": "child 12-3"
                    },
                    {
                        "title": "child 12-4"
                    },
                    {
                        "title": "child 12-5"
                    },
                    {
                        "title": "child 12-6"
                    },
                    {
                        "title": "child 12-7"
                    },
                    {
                        "title": "child 12-8"
                    },
                    {
                        "title": "child 12-9"
                    },
                    {
                        "title": "child 12-10"
                    },
                    {
                        "title": "child 12-11"
                    },
                    {
                        "title": "child 12-12"
                    },
                    {
                        "title": "child 12-13"
                    },
                    {
                        "title": "child 12-14"
                    },
                    {
                        "title": "child 12-15"
                    },
                    {
                        "title": "child 12-16"
                    },
                    {
                        "title": "child 12-17"
                    },
                    {
                        "title": "child 12-18"
                    },
                    {
                        "title": "child 12-19"
                    },
                    {
                        "title": "child 12-20"
                    }
                ]
            },
            {
                "title": "child 13",
                "hasChild": true,
                "children": [{
                        "title": "child 13-1"
                    },
                    {
                        "title": "child 13-2"
                    },
                    {
                        "title": "child 13-3"
                    },
                    {
                        "title": "child 13-4"
                    },
                    {
                        "title": "child 13-5"
                    },
                    {
                        "title": "child 13-6"
                    },
                    {
                        "title": "child 13-7"
                    },
                    {
                        "title": "child 13-8"
                    },
                    {
                        "title": "child 13-9"
                    },
                    {
                        "title": "child 13-10"
                    },
                    {
                        "title": "child 13-11"
                    },
                    {
                        "title": "child 13-12"
                    },
                    {
                        "title": "child 13-13"
                    },
                    {
                        "title": "child 13-14"
                    },
                    {
                        "title": "child 13-15"
                    },
                    {
                        "title": "child 13-16"
                    },
                    {
                        "title": "child 13-17"
                    },
                    {
                        "title": "child 13-18"
                    },
                    {
                        "title": "child 13-19"
                    },
                    {
                        "title": "child 13-20"
                    }
                ]
            },
            {
                "title": "child 14",
                "hasChild": true,
                "children": [{
                        "title": "child 14-1"
                    },
                    {
                        "title": "child 14-2"
                    },
                    {
                        "title": "child 14-3"
                    },
                    {
                        "title": "child 14-4"
                    },
                    {
                        "title": "child 14-5"
                    },
                    {
                        "title": "child 14-6"
                    },
                    {
                        "title": "child 14-7"
                    },
                    {
                        "title": "child 14-8"
                    },
                    {
                        "title": "child 14-9"
                    },
                    {
                        "title": "child 14-10"
                    },
                    {
                        "title": "child 14-11"
                    },
                    {
                        "title": "child 14-12"
                    },
                    {
                        "title": "child 14-13"
                    },
                    {
                        "title": "child 14-14"
                    },
                    {
                        "title": "child 14-15"
                    },
                    {
                        "title": "child 14-16"
                    },
                    {
                        "title": "child 14-17"
                    },
                    {
                        "title": "child 14-18"
                    },
                    {
                        "title": "child 14-19"
                    },
                    {
                        "title": "child 14-20"
                    }
                ]
            },
            {
                "title": "child 15",
                "hasChild": true,
                "children": [{
                        "title": "child 15-1"
                    },
                    {
                        "title": "child 15-2"
                    },
                    {
                        "title": "child 15-3"
                    },
                    {
                        "title": "child 15-4"
                    },
                    {
                        "title": "child 15-5",
                        "hasChild": true,
                        "children": [{
                                "title": "child 15-5-1"
                            },
                            {
                                "title": "child 15-5-2"
                            },
                            {
                                "title": "child 15-5-3"
                            },
                            {
                                "title": "child 15-5-4"
                            },
                            {
                                "title": "child 15-5-5"
                            },
                            {
                                "title": "child 15-5-6"
                            },
                            {
                                "title": "child 15-5-7"
                            },
                            {
                                "title": "child 15-5-8"
                            },
                            {
                                "title": "child 15-5-9"
                            },
                            {
                                "title": "child 15-5-10"
                            },
                            {
                                "title": "child 15-5-11"
                            },
                            {
                                "title": "child 15-5-12"
                            },
                            {
                                "title": "child 15-5-13"
                            },
                            {
                                "title": "child 15-5-14"
                            },
                            {
                                "title": "child 15-5-15"
                            },
                            {
                                "title": "child 15-5-16"
                            },
                            {
                                "title": "child 15-5-17"
                            },
                            {
                                "title": "child 15-5-18"
                            },
                            {
                                "title": "child 15-5-19"
                            },
                            {
                                "title": "child 15-5-20"
                            },
                            {
                                "title": "child 15-5-21"
                            },
                            {
                                "title": "child 15-5-22"
                            },
                            {
                                "title": "child 15-5-23"
                            },
                            {
                                "title": "child 15-5-24"
                            },
                            {
                                "title": "child 15-5-25"
                            },
                            {
                                "title": "child 15-5-25",
                                "hasChild": true,
                                "children": [{
                                        "title": "child 15-5-25-1"
                                    },
                                    {
                                        "title": "child 15-5-25-2"
                                    },
                                    {
                                        "title": "child 15-5-25-3"
                                    },
                                    {
                                        "title": "child 15-5-25-4"
                                    },
                                    {
                                        "title": "child 15-5-25-5"
                                    },
                                    {
                                        "title": "child 15-5-25-6"
                                    },
                                    {
                                        "title": "child 15-5-25-7",
                                        "hasChild": true,
                                        "children": [{
                                                "title": "child 15-5-25-7-1"
                                            },
                                            {
                                                "title": "child 15-5-25-7-2"
                                            },
                                            {
                                                "title": "child 15-5-25-7-3"
                                            },
                                            {
                                                "title": "child 15-5-25-7-4"
                                            },
                                            {
                                                "title": "child 15-5-25-7-5"
                                            },
                                            {
                                                "title": "child 15-5-25-7-6"
                                            },
                                            {
                                                "title": "child 15-5-25-7-7"
                                            },
                                            {
                                                "title": "child 15-5-25-7-8"
                                            },
                                            {
                                                "title": "child 15-5-25-7-9"
                                            },
                                            {
                                                "title": "child 15-5-25-7-10"
                                            },
                                            {
                                                "title": "child 15-5-25-7-11"
                                            },
                                            {
                                                "title": "child 15-5-25-7-12"
                                            },
                                            {
                                                "title": "child 15-5-25-7-13"
                                            },
                                            {
                                                "title": "child 15-5-25-7-14"
                                            },
                                            {
                                                "title": "child 15-5-25-7-15"
                                            },
                                            {
                                                "title": "child 15-5-25-7-16"
                                            },
                                            {
                                                "title": "child 15-5-25-7-17",
                                                "hasChild": true,
                                                "children": [{
                                                        "title": "child 15-5-25-7-17-1"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-2"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-3"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-4"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-5",
                                                        "hasChild": true,
                                                        "children": [{
                                                                "title": "child 15-5-25-7-17-5-1"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-2"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-3"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-4"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-5"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-6"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-7"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-8"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-9"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-10"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-11"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-12"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-13"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-14"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-15"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-16"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-17"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-18",
                                                                "hasChild": true,
                                                                "children": [{
                                                                        "title": "child 15-5-25-7-17-5-18-1"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-2"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-3"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-4"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-5"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-6"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-7",
                                                                        "hasChild": true,
                                                                        "children": [{
                                                                                "title": "child 15-5-25-7-17-5-18-7-1"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-2"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-3"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-4"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-5"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-6"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-7"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-8"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-9",
                                                                                "hasChild": true,
                                                                                "children": [{
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-1"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-2"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-3"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-4"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-5"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-6"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-7"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-8"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-9"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-10"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-11"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-12"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-13"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-14"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-15"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-16"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-17"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-18"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-19"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 15-5-25-7-17-5-18-7-8-20"
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-10"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-11"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-12"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-13"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-14"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-15"
                                                                            },
                                                                            {
                                                                                "title": "child 15-5-25-7-17-5-18-7-16"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-8"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-9"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-10"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-11"
                                                                    },
                                                                    {
                                                                        "title": "child 15-5-25-7-17-5-18-12"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-19"
                                                            },
                                                            {
                                                                "title": "child 15-5-25-7-17-5-20"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-6"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-7"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-8"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-9"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-10"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-11"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-12"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-13"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-14"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-15"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-16"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-17"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-18"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-19"
                                                    },
                                                    {
                                                        "title": "child 15-5-25-7-17-20"
                                                    }
                                                ]
                                            },
                                            {
                                                "title": "child 15-5-25-7-18"
                                            },
                                            {
                                                "title": "child 15-5-25-7-19"
                                            },
                                            {
                                                "title": "child 15-5-25-7-20"
                                            },
                                            {
                                                "title": "child 15-5-25-7-21"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "child 15-5-25-8"
                                    },
                                    {
                                        "title": "child 15-5-25-9"
                                    },
                                    {
                                        "title": "child 15-5-25-10"
                                    },
                                    {
                                        "title": "child 15-5-25-11"
                                    },
                                    {
                                        "title": "child 15-5-25-12"
                                    },
                                    {
                                        "title": "child 15-5-25-13"
                                    },
                                    {
                                        "title": "child 15-5-25-14"
                                    },
                                    {
                                        "title": "child 15-5-25-15"
                                    },
                                    {
                                        "title": "child 15-5-25-16"
                                    },
                                    {
                                        "title": "child 15-5-25-17"
                                    },
                                    {
                                        "title": "child 15-5-25-18"
                                    },
                                    {
                                        "title": "child 15-5-25-19"
                                    },
                                    {
                                        "title": "child 15-5-25-20"
                                    },
                                    {
                                        "title": "child 15-5-25-21"
                                    },
                                    {
                                        "title": "child 15-5-25-22"
                                    },
                                    {
                                        "title": "child 15-5-25-23"
                                    },
                                    {
                                        "title": "child 15-5-25-24"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "title": "child 15-6"
                    },
                    {
                        "title": "child 15-7"
                    },
                    {
                        "title": "child 15-8"
                    },
                    {
                        "title": "child 15-9"
                    },
                    {
                        "title": "child 15-10"
                    },
                    {
                        "title": "child 15-11"
                    },
                    {
                        "title": "child 15-12"
                    },
                    {
                        "title": "child 15-13"
                    },
                    {
                        "title": "child 15-14"
                    },
                    {
                        "title": "child 15-15"
                    },
                    {
                        "title": "child 15-16"
                    },
                    {
                        "title": "child 15-17"
                    },
                    {
                        "title": "child 15-18"
                    },
                    {
                        "title": "child 15-19"
                    },
                    {
                        "title": "child 15-20"
                    }
                ]
            },
            {
                "title": "child 16"
            },
            {
                "title": "child 17"
            },
            {
                "title": "child 18"
            },
            {
                "title": "child 19"
            },
            {
                "title": "child 20"
            },
            {
                "title": "child 21"
            },
            {
                "title": "child 22"
            },
            {
                "title": "child 23"
            },
            {
                "title": "child 24"
            },
            {
                "title": "child 25"
            },
            {
                "title": "child 26"
            },
            {
                "title": "child 27"
            },
            {
                "title": "child 28"
            },
            {
                "title": "child 29"
            },
            {
                "title": "child 30"
            },
            {
                "title": "child 31"
            },
            {
                "title": "child 32"
            },
            {
                "title": "child 33"
            },
            {
                "title": "child 34"
            },
            {
                "title": "child 35"
            },
            {
                "title": "child 36"
            },
            {
                "title": "child 37"
            },
            {
                "title": "child 38"
            },
            {
                "title": "child 39"
            },
            {
                "title": "child 40"
            },
            {
                "title": "child 41"
            },
            {
                "title": "child 42"
            },
            {
                "title": "child 43"
            },
            {
                "title": "child 44"
            },
            {
                "title": "child 45"
            },
            {
                "title": "child 46"
            },
            {
                "title": "child 47"
            },
            {
                "title": "child 48"
            },
            {
                "title": "child 49"
            },
            {
                "title": "child 50"
            },
            {
                "title": "child 51"
            },
            {
                "title": "child 52",
                "hasChild": true,
                "children": [{
                        "title": "child 52-1"
                    },
                    {
                        "title": "child 52-2"
                    },
                    {
                        "title": "child 52-3"
                    },
                    {
                        "title": "child 52-4"
                    },
                    {
                        "title": "child 52-5",
                        "hasChild": true,
                        "children": [{
                                "title": "child 52-5-1"
                            },
                            {
                                "title": "child 52-5-2"
                            },
                            {
                                "title": "child 52-5-3"
                            },
                            {
                                "title": "child 52-5-4"
                            },
                            {
                                "title": "child 52-5-5"
                            },
                            {
                                "title": "child 52-5-6"
                            },
                            {
                                "title": "child 52-5-7"
                            },
                            {
                                "title": "child 52-5-8"
                            },
                            {
                                "title": "child 52-5-9"
                            },
                            {
                                "title": "child 52-5-10"
                            },
                            {
                                "title": "child 52-5-11"
                            },
                            {
                                "title": "child 52-5-12"
                            },
                            {
                                "title": "child 52-5-13"
                            },
                            {
                                "title": "child 52-5-14"
                            },
                            {
                                "title": "child 52-5-15"
                            },
                            {
                                "title": "child 52-5-16"
                            },
                            {
                                "title": "child 52-5-17"
                            },
                            {
                                "title": "child 52-5-18"
                            },
                            {
                                "title": "child 52-5-19"
                            },
                            {
                                "title": "child 52-5-20"
                            },
                            {
                                "title": "child 52-5-21"
                            },
                            {
                                "title": "child 52-5-22"
                            },
                            {
                                "title": "child 52-5-23"
                            },
                            {
                                "title": "child 52-5-24"
                            },
                            {
                                "title": "child 52-5-25"
                            },
                            {
                                "title": "child 52-5-25",
                                "hasChild": true,
                                "children": [{
                                        "title": "child 52-5-25-1"
                                    },
                                    {
                                        "title": "child 52-5-25-2"
                                    },
                                    {
                                        "title": "child 52-5-25-3"
                                    },
                                    {
                                        "title": "child 52-5-25-4"
                                    },
                                    {
                                        "title": "child 52-5-25-5"
                                    },
                                    {
                                        "title": "child 52-5-25-6"
                                    },
                                    {
                                        "title": "child 52-5-25-7",
                                        "hasChild": true,
                                        "children": [{
                                                "title": "child 52-5-25-7-1"
                                            },
                                            {
                                                "title": "child 52-5-25-7-2"
                                            },
                                            {
                                                "title": "child 52-5-25-7-3"
                                            },
                                            {
                                                "title": "child 52-5-25-7-4"
                                            },
                                            {
                                                "title": "child 52-5-25-7-5"
                                            },
                                            {
                                                "title": "child 52-5-25-7-6"
                                            },
                                            {
                                                "title": "child 52-5-25-7-7"
                                            },
                                            {
                                                "title": "child 52-5-25-7-8"
                                            },
                                            {
                                                "title": "child 52-5-25-7-9"
                                            },
                                            {
                                                "title": "child 52-5-25-7-10"
                                            },
                                            {
                                                "title": "child 52-5-25-7-11"
                                            },
                                            {
                                                "title": "child 52-5-25-7-12"
                                            },
                                            {
                                                "title": "child 52-5-25-7-13"
                                            },
                                            {
                                                "title": "child 52-5-25-7-14"
                                            },
                                            {
                                                "title": "child 52-5-25-7-15"
                                            },
                                            {
                                                "title": "child 52-5-25-7-16"
                                            },
                                            {
                                                "title": "child 52-5-25-7-17",
                                                "hasChild": true,
                                                "children": [{
                                                        "title": "child 52-5-25-7-17-1"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-2"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-3"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-4"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-5",
                                                        "hasChild": true,
                                                        "children": [{
                                                                "title": "child 52-5-25-7-17-5-1"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-2"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-3"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-4"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-5"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-6"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-7"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-8"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-9"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-10"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-11"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-12"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-13"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-14"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-15"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-16"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-17"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-18",
                                                                "hasChild": true,
                                                                "children": [{
                                                                        "title": "child 52-5-25-7-17-5-18-1"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-2"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-3"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-4"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-5"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-6"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-7",
                                                                        "hasChild": true,
                                                                        "children": [{
                                                                                "title": "child 52-5-25-7-17-5-18-7-1"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-2"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-3"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-4"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-5"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-6"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-7"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-8"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-9",
                                                                                "hasChild": true,
                                                                                "children": [{
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-1"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-2"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-3"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-4"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-5"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-6"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-7"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-8"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-9"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-10"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-11"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-12"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-13"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-14"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-15"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-16"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-17"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-18"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-19"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 52-5-25-7-17-5-18-7-8-20"
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-10"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-11"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-12"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-13"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-14"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-15"
                                                                            },
                                                                            {
                                                                                "title": "child 52-5-25-7-17-5-18-7-16"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-8"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-9"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-10"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-11"
                                                                    },
                                                                    {
                                                                        "title": "child 52-5-25-7-17-5-18-12"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-19"
                                                            },
                                                            {
                                                                "title": "child 52-5-25-7-17-5-20"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-6"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-7"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-8"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-9"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-10"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-11"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-12"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-13"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-14"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-15"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-16"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-17"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-18"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-19"
                                                    },
                                                    {
                                                        "title": "child 52-5-25-7-17-20"
                                                    }
                                                ]
                                            },
                                            {
                                                "title": "child 52-5-25-7-18"
                                            },
                                            {
                                                "title": "child 52-5-25-7-19"
                                            },
                                            {
                                                "title": "child 52-5-25-7-20"
                                            },
                                            {
                                                "title": "child 52-5-25-7-21"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "child 52-5-25-8"
                                    },
                                    {
                                        "title": "child 52-5-25-9"
                                    },
                                    {
                                        "title": "child 52-5-25-10"
                                    },
                                    {
                                        "title": "child 52-5-25-11"
                                    },
                                    {
                                        "title": "child 52-5-25-12"
                                    },
                                    {
                                        "title": "child 52-5-25-13"
                                    },
                                    {
                                        "title": "child 52-5-25-14"
                                    },
                                    {
                                        "title": "child 52-5-25-15"
                                    },
                                    {
                                        "title": "child 52-5-25-16"
                                    },
                                    {
                                        "title": "child 52-5-25-17"
                                    },
                                    {
                                        "title": "child 52-5-25-18"
                                    },
                                    {
                                        "title": "child 52-5-25-19"
                                    },
                                    {
                                        "title": "child 52-5-25-20"
                                    },
                                    {
                                        "title": "child 52-5-25-21"
                                    },
                                    {
                                        "title": "child 52-5-25-22"
                                    },
                                    {
                                        "title": "child 52-5-25-23"
                                    },
                                    {
                                        "title": "child 52-5-25-24"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "title": "child 52-6"
                    },
                    {
                        "title": "child 52-7"
                    },
                    {
                        "title": "child 52-8"
                    },
                    {
                        "title": "child 52-9"
                    },
                    {
                        "title": "child 52-10"
                    },
                    {
                        "title": "child 52-11"
                    },
                    {
                        "title": "child 52-12"
                    },
                    {
                        "title": "child 52-13"
                    },
                    {
                        "title": "child 52-14"
                    },
                    {
                        "title": "child 52-15"
                    },
                    {
                        "title": "child 52-16"
                    },
                    {
                        "title": "child 52-17"
                    },
                    {
                        "title": "child 52-18"
                    },
                    {
                        "title": "child 52-19"
                    },
                    {
                        "title": "child 52-20"
                    }
                ]
            },
            {
                "title": "child 53",
                "hasChild": true,
                "children": [{
                        "title": "child 53-1"
                    },
                    {
                        "title": "child 53-2"
                    },
                    {
                        "title": "child 53-3"
                    },
                    {
                        "title": "child 53-4"
                    },
                    {
                        "title": "child 53-5",
                        "hasChild": true,
                        "children": [{
                                "title": "child 53-5-1"
                            },
                            {
                                "title": "child 53-5-2"
                            },
                            {
                                "title": "child 53-5-3"
                            },
                            {
                                "title": "child 53-5-4"
                            },
                            {
                                "title": "child 53-5-5"
                            },
                            {
                                "title": "child 53-5-6"
                            },
                            {
                                "title": "child 53-5-7"
                            },
                            {
                                "title": "child 53-5-8"
                            },
                            {
                                "title": "child 53-5-9"
                            },
                            {
                                "title": "child 53-5-10"
                            },
                            {
                                "title": "child 53-5-11"
                            },
                            {
                                "title": "child 53-5-12"
                            },
                            {
                                "title": "child 53-5-13"
                            },
                            {
                                "title": "child 53-5-14"
                            },
                            {
                                "title": "child 53-5-15"
                            },
                            {
                                "title": "child 53-5-16"
                            },
                            {
                                "title": "child 53-5-17"
                            },
                            {
                                "title": "child 53-5-18"
                            },
                            {
                                "title": "child 53-5-19"
                            },
                            {
                                "title": "child 53-5-20"
                            },
                            {
                                "title": "child 53-5-21"
                            },
                            {
                                "title": "child 53-5-22"
                            },
                            {
                                "title": "child 53-5-23"
                            },
                            {
                                "title": "child 53-5-24"
                            },
                            {
                                "title": "child 53-5-25"
                            },
                            {
                                "title": "child 53-5-25",
                                "hasChild": true,
                                "children": [{
                                        "title": "child 53-5-25-1"
                                    },
                                    {
                                        "title": "child 53-5-25-2"
                                    },
                                    {
                                        "title": "child 53-5-25-3"
                                    },
                                    {
                                        "title": "child 53-5-25-4"
                                    },
                                    {
                                        "title": "child 53-5-25-5"
                                    },
                                    {
                                        "title": "child 53-5-25-6"
                                    },
                                    {
                                        "title": "child 53-5-25-7",
                                        "hasChild": true,
                                        "children": [{
                                                "title": "child 53-5-25-7-1"
                                            },
                                            {
                                                "title": "child 53-5-25-7-2"
                                            },
                                            {
                                                "title": "child 53-5-25-7-3"
                                            },
                                            {
                                                "title": "child 53-5-25-7-4"
                                            },
                                            {
                                                "title": "child 53-5-25-7-5"
                                            },
                                            {
                                                "title": "child 53-5-25-7-6"
                                            },
                                            {
                                                "title": "child 53-5-25-7-7"
                                            },
                                            {
                                                "title": "child 53-5-25-7-8"
                                            },
                                            {
                                                "title": "child 53-5-25-7-9"
                                            },
                                            {
                                                "title": "child 53-5-25-7-10"
                                            },
                                            {
                                                "title": "child 53-5-25-7-11"
                                            },
                                            {
                                                "title": "child 53-5-25-7-12"
                                            },
                                            {
                                                "title": "child 53-5-25-7-13"
                                            },
                                            {
                                                "title": "child 53-5-25-7-14"
                                            },
                                            {
                                                "title": "child 53-5-25-7-15"
                                            },
                                            {
                                                "title": "child 53-5-25-7-16"
                                            },
                                            {
                                                "title": "child 53-5-25-7-17",
                                                "hasChild": true,
                                                "children": [{
                                                        "title": "child 53-5-25-7-17-1"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-2"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-3"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-4"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-5",
                                                        "hasChild": true,
                                                        "children": [{
                                                                "title": "child 53-5-25-7-17-5-1"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-2"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-3"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-4"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-5"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-6"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-7"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-8"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-9"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-10"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-11"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-12"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-13"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-14"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-15"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-16"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-17"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-18",
                                                                "hasChild": true,
                                                                "children": [{
                                                                        "title": "child 53-5-25-7-17-5-18-1"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-2"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-3"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-4"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-5"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-6"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-7",
                                                                        "hasChild": true,
                                                                        "children": [{
                                                                                "title": "child 53-5-25-7-17-5-18-7-1"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-2"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-3"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-4"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-5"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-6"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-7"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-8"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-9",
                                                                                "hasChild": true,
                                                                                "children": [{
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-1"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-2"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-3"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-4"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-5"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-6"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-7"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-8"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-9"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-10"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-11"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-12"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-13"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-14"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-15"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-16"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-17"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-18"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-19"
                                                                                    },
                                                                                    {
                                                                                        "title": "child 53-5-25-7-17-5-18-7-8-20"
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-10"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-11"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-12"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-13"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-14"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-15"
                                                                            },
                                                                            {
                                                                                "title": "child 53-5-25-7-17-5-18-7-16"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-8"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-9"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-10"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-11"
                                                                    },
                                                                    {
                                                                        "title": "child 53-5-25-7-17-5-18-12"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-19"
                                                            },
                                                            {
                                                                "title": "child 53-5-25-7-17-5-20"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-6"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-7"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-8"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-9"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-10"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-11"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-12"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-13"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-14"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-15"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-16"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-17"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-18"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-19"
                                                    },
                                                    {
                                                        "title": "child 53-5-25-7-17-20"
                                                    }
                                                ]
                                            },
                                            {
                                                "title": "child 53-5-25-7-18"
                                            },
                                            {
                                                "title": "child 53-5-25-7-19"
                                            },
                                            {
                                                "title": "child 53-5-25-7-20"
                                            },
                                            {
                                                "title": "child 53-5-25-7-21"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "child 53-5-25-8"
                                    },
                                    {
                                        "title": "child 53-5-25-9"
                                    },
                                    {
                                        "title": "child 53-5-25-10"
                                    },
                                    {
                                        "title": "child 53-5-25-11"
                                    },
                                    {
                                        "title": "child 53-5-25-12"
                                    },
                                    {
                                        "title": "child 53-5-25-13"
                                    },
                                    {
                                        "title": "child 53-5-25-14"
                                    },
                                    {
                                        "title": "child 53-5-25-15"
                                    },
                                    {
                                        "title": "child 53-5-25-16"
                                    },
                                    {
                                        "title": "child 53-5-25-17"
                                    },
                                    {
                                        "title": "child 53-5-25-18"
                                    },
                                    {
                                        "title": "child 53-5-25-19"
                                    },
                                    {
                                        "title": "child 53-5-25-20"
                                    },
                                    {
                                        "title": "child 53-5-25-21"
                                    },
                                    {
                                        "title": "child 53-5-25-22"
                                    },
                                    {
                                        "title": "child 53-5-25-23"
                                    },
                                    {
                                        "title": "child 53-5-25-24"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "title": "child 53-6"
                    },
                    {
                        "title": "child 53-7"
                    },
                    {
                        "title": "child 53-8"
                    },
                    {
                        "title": "child 53-9"
                    },
                    {
                        "title": "child 53-10"
                    },
                    {
                        "title": "child 53-11"
                    },
                    {
                        "title": "child 53-12"
                    },
                    {
                        "title": "child 53-13"
                    },
                    {
                        "title": "child 53-14"
                    },
                    {
                        "title": "child 53-15"
                    },
                    {
                        "title": "child 53-16"
                    },
                    {
                        "title": "child 53-17"
                    },
                    {
                        "title": "child 53-18"
                    },
                    {
                        "title": "child 53-19"
                    },
                    {
                        "title": "child 53-20"
                    }
                ]
            }
        ]
    }] 
    }
  },
  methods: {
    blur(node) {
      let tree = this.$refs.tree
      let newTitle = tree.getNewTitle(node)
      tree.setTitle(node, newTitle)
      tree.quitEdit(node)
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
      tree.create(child, node)
    },
    remove() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      tree.remove(node)
    },
    edit() {
      let tree = this.$refs.tree
      let node = tree.getSelectedOne()
      tree.edit(node)
    },
    search() {
      let tree = this.$refs.tree
      if (this.keyword === '') {
        tree.clearSearchResult()
      } else {
        tree.search(this.keyword)
      }
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
