import type { Router } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { useAppStore } from '@/stores/app'

export const registerRouterGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (!to.meta.auth) return next()
    const { loggedIn } = useOauthStore()
    const { setSignal } = useAppStore()
    if (!loggedIn) return setSignal('requestSignin', true)
    console.log('here')
    next()
  })
}
