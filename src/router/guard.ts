import type { Router } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
export const registerRouterGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) return next()
    const { loggedIn } = useOauthStore()
    // if(!loggedIn)
  })
}
