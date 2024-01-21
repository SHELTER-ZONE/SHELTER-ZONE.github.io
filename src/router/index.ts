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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首頁',
        icon: HomeIcon,
      },
      component: Home,
    },
    {
      path: '/error',
      name: 'error',
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
      name: 'news',
      meta: {
        title: '最新公告',
        icon: Rss,
      },
      component: () => import('@/views/News/News.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '關於',
        icon: Magnify,
      },
      component: () => import('@/views/About/About.vue'),
    },
    {
      path: '/sz-team',
      name: 'szteam',
      meta: {
        title: 'SZ 開發團隊',
        icon: Code,
      },
      component: () => import('@/views/SZTeam/SZTeam.vue'),
    },
    {
      path: '/ecosystem',
      name: 'ecosystem',
      meta: { title: '生態與資源', icon: AppConnectivity },
      component: () => import('@/views/Ecosystem/Ecosystem.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        hidden: true,
        title: '個人避難所',
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
    {
      path: '/explore',
      name: 'Explore',
      meta: {
        title: '探索避難所',
        icon: Explore,
      },
      component: () => import('@/views/Explore/Explore.vue'),
    },
    {
      path: '/shelter/:discordId',
      name: 'PersonalShelter',
      meta: {
        hidden: true,
        title: '避難所',
      },
      component: () => import('@/views/PersonalShelter/PersonalShelter.vue'),
    },
  ],
})

registerRouterGuard(router)

export default router
