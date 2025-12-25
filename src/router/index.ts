import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import { registerRouterGuard } from './guard'
import {
  Home as HomeIcon,
  Magnify,
  Code,
  Bookmark,
  Rss,
  AppConnectivity,
  Explore,
} from '@vicons/carbon'

export const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首頁',
      icon: HomeIcon,
    },
    component: Home,
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/views/Error/Error.vue'),
    meta: {
      title: '錯誤',
      hidden: true,
    },
  },
  {
    path: '/discord/callback',
    name: 'discord callback',
    meta: {
      title: '登入跳轉中',
      hidden: true,
    },
    component: () => import('@/views/Callback/Callback.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: '編輯個人避難所',
      auth: true,
      hidden: true,
      keepAlive: true,
    },
    component: () => import('@/views/Profile/Profile.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/NotFound.vue'),
    meta: {
      title: '查無此頁面',
      hidden: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

registerRouterGuard(router)

export default router
