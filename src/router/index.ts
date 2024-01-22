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
    path: '/news',
    name: 'News',
    meta: {
      title: '最新公告',
      icon: Rss,
    },
    component: () => import('@/views/News/News.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '關於',
      icon: Magnify,
    },
    component: () => import('@/views/About/About.vue'),
  },
  {
    path: '/sz-team',
    name: 'SZTeam',
    meta: {
      title: 'SZ 開發團隊',
      icon: Code,
    },
    component: () => import('@/views/SZTeam/SZTeam.vue'),
  },

  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: '個人避難所',
      auth: true,
      hidden: true,
      keepAlive: true,
    },
    component: () => import('@/views/Profile/Profile.vue'),
  },
  {
    path: '/register/profile',
    name: 'RegisterProfile',
    meta: {
      title: '避難者驗證',
      hidden: true,
    },
    component: () => import('@/views/RegisterProfile/RegisterProfile.vue'),
  },
  {
    path: '/explore',
    name: 'Explore',
    meta: {
      title: '探索避難所',
      icon: Explore,
      keepAlive: true,
    },
    component: () => import('@/views/Explore/Explore.vue'),
  },
  {
    path: '/shelter/:discordId',
    name: 'PersonalShelter',
    meta: {
      title: '避難所',
      hidden: true,
      keepAlive: true,
    },
    component: () => import('@/views/PersonalShelter/PersonalShelter.vue'),
  },
  {
    path: '/ecosystem',
    name: 'Ecosystem',
    meta: { title: '生態與資源', icon: AppConnectivity },
    component: () => import('@/views/Ecosystem/Ecosystem.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

registerRouterGuard(router)

export default router
