import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/modules/home/home.component.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/modules/user/user.component.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
