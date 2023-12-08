import type { Router } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { useAppStore } from '@/stores/app'

import dayjs from 'dayjs'

export const registerRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { loggedIn, szRegistered } = useOauthStore()
    // checkExpiresIn() // 檢查登入是否已過期
    // if (to.meta.registeredBlock && szRegistered) return next({ name: 'home' })
    // if (to.meta.szRegistered && !szRegistered) return next({ name: 'home' })
    if (!to.meta.auth) return next() // 無須登入頁，直接前往
    const { setSignal } = useAppStore()
    if (!loggedIn) return setSignal('requestSignin', true)
    next()
  })

  router.afterEach(() => {
    console.log('afterEach')
    const layout = document.getElementById('layout')
    if (!layout) return
    const res = layout.scrollTo({
      top: 0,
    })

    console.log('res', res)
  })
}

export function checkExpiresIn() {
  const { expiresIn, clearUser, loggedIn } = useOauthStore()
  if (!loggedIn) return
  const now = dayjs()
  const expireDate = dayjs(Number(expiresIn))
  if (expireDate.isBefore(now)) {
    if (window.$message)
      window.$message.warning('token expired, please login again !')
    clearUser()
  }
}
