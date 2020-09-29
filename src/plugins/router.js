import { createRouter, createWebHashHistory } from 'vue-router'
import HomeRouter from '@/modules/home/home.router'
import UserRouter from '@/modules/user/user.router'

const routes = [
  ...HomeRouter,
  ...UserRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
