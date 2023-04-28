import type { Router } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { useAppStore } from '@/stores/app'

import dayjs from 'dayjs'

export const registerRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    if (!to.meta.auth) return next() // 無須登入頁，直接前往
    checkExpiresIn() // 檢查登入是否已過期
    const { loggedIn } = useOauthStore()
    const { setSignal } = useAppStore()
    if (!loggedIn) return setSignal('requestSignin', true)
    next()
  })
}

function checkExpiresIn() {
  const { expiresIn, clearUser } = useOauthStore()
  const now = dayjs()
  const expireDate = dayjs(Number(expiresIn))
  if (expireDate.isBefore(now)) {
    window.$message.warning('token expired, please login again !')
    clearUser()
  }
}
