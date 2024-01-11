import Vue from 'vue'
import VueRouter from 'vue-router'
import CodexEditor from '../views/CodexEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Editor',
    component: CodexEditor
  }
]

const router = new VueRouter({
  routes
})

export default router
