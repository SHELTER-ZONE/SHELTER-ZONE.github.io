import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuards } from './guard'
import type { App } from 'vue'
import Landing from '@/views/Landing/Landing.vue'

const routes = [
  {
    name: 'Landing',
    path: '/',
    component: Landing,
  },
  {
    name: 'DiscordCallback',
    path: '/discord/callback',
    component: () => import('@/views/Callback/Callback.vue'),
  },
  {
    name: 'Error',
    path: '/error',
    component: () => import('@/views/Error/Error.vue'),
  },
  // 404 頁面必須放在最後
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundCatch',
    component: () => import('@/views/NotFound/NotFound.vue'),
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
