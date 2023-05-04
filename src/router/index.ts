import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import verifyRoutes from './modules/verify'
import { registerRouterGuard } from './guard'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首頁',
      },
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '關於',
        auth: true,
      },
      component: () => import('@/views/Home/Home.vue'),
    },
    {
      path: '/discord/callback',
      name: 'discord callback',
      meta: { hidden: true },
      component: () => import('@/views/Callback/Callback.vue'),
    },
    {
      path: '/ecosystem',
      name: 'ecosystem',
      meta: { title: '生態與資源' },
      component: () => import('@/views/Ecosystem/Ecosystem.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/Error/Error.vue'),
    },
    ...verifyRoutes,
    {
      path: '/profile',
      name: 'profile',
      meta: {
        hidden: true,
        title: '個人資料',
        auth: true,
        szRegistered: true,
      },
      component: () => import('@/views/Profile/Profile.vue'),
    },
  ],
})

registerRouterGuard(router)

export default router
