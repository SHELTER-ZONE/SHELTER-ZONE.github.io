import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import { registerRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/error',
      name: 'error',
      component: () => import('@/views/Error/Error.vue'),
      meta: {
        hidden: true,
      },
    },
    {
      path: '/discord/callback',
      name: 'discord callback',
      meta: { hidden: true },
      component: () => import('@/views/Callback/Callback.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '關於',
      },
      component: () => import('@/views/About/About.vue'),
    },
    {
      path: '/sz-team',
      name: 'szteam',
      meta: {
        title: 'SZ 開發團隊',
      },
      component: () => import('@/views/SZTeam/SZTeam.vue'),
    },
    {
      path: '/ecosystem',
      name: 'ecosystem',
      meta: { title: '生態與資源' },
      component: () => import('@/views/Ecosystem/Ecosystem.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        hidden: true,
        title: '個人資料',
        auth: true,
      },
      component: () => import('@/views/Profile/Profile.vue'),
    },
    {
      path: '/register/profile',
      name: 'RegisterProfile',
      meta: {
        hidden: true,
        title: '避難者驗證',
      },
      component: () => import('@/views/RegisterProfile/RegisterProfile.vue'),
    },
  ],
})

registerRouterGuard(router)

export default router
