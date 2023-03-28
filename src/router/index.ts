import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首頁',
        layout: 'home',
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
    {
      path: '/verify',
      name: 'verify',
      meta: {
        hidden: true,
        title: '驗證',
        auth: true,
      },
      component: () => import('@/views/Verify/Verify.vue'),
    },
  ],
})

export default router
