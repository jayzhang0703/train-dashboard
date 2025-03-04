import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../components/layout/BasicLayout.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: Dashboard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 