import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BasicExample from '../views/BasicExample.vue'
import CheckboxExample from '../views/CheckboxExample.vue'
import AsyncExample from '../views/AsyncExample.vue'
import EditExample from '../views/EditExample.vue'
import DragAndDropExample from '../views/DragAndDropExample.vue'

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
    path: '/example/drag_and_drop',
    name: 'drag-and-drop-example',
    component: DragAndDropExample
  }
]

const router = new VueRouter({
  routes
})

export default router
