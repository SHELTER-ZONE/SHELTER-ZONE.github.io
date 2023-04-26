import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import verifyRoutes from './modules/verify'

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
      path: '/about',
      name: 'about',
      meta: {
        title: '關於',
      },
      component: () => import('@/views/Home/Home.vue'),
    },
    {
      path: '/discord/callback',
      name: 'discord callback',
      component: () => import('@/views/Callback/Callback.vue'),
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
      },
      component: () => import('@/views/Profile/Profile.vue'),
    },
  ],
})

export default router
