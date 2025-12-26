import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuards } from './guard'
import { App } from 'vue'

const routes = [
  {
    name: 'Landing',
    path: '/',
    component: () => import('@/views/Landing/Landing.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
})

export function setupRouter(app: App) {
  app.use(router)
  createRouterGuards(router)
}

export default router
