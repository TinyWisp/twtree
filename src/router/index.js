import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BasicExample from '../views/BasicExample.vue'
import CheckboxExample from '../views/CheckboxExample.vue'
import AsyncExample from '../views/AsyncExample.vue'
import EditExample from '../views/EditExample.vue'
import DragAndDropExample from '../views/DragAndDropExample.vue'
import CustomIconExample from '../views/CustomIconExample.vue'
import ButtonExample from '../views/ButtonExample.vue'
import ContextMenuExample from '../views/ContextMenuExample.vue'
import ALotOfNodesExample from '../views/ALotOfNodesExample.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/example/basic',
    name: 'basic-example',
    component: BasicExample
  },
  {
    path: '/example/checkbox',
    name: 'checkbox-example',
    component: CheckboxExample
  },
  {
    path: '/example/async',
    name: 'async-example',
    component: AsyncExample
  },
  {
    path: '/example/edit',
    name: 'edit-example',
    component: EditExample
  },
  {
    path: '/example/drag-and-drop',
    name: 'drag-and-drop-example',
    component: DragAndDropExample
  },
  {
    path: '/example/button',
    name: 'button-example',
    component: ButtonExample
  },
  {
    path: '/example/custom-icon',
    name: 'custom-icon-example',
    component: CustomIconExample
  },
  {
    path: '/example/contextmenu',
    name: 'contextmenu-example',
    component: ContextMenuExample
  },
  {
    path: '/example/a-lot-of-nodes',
    name: 'a-lot-of-nodes-example',
    component: ALotOfNodesExample
  },
]

const router = new VueRouter({
  routes
})

export default router
