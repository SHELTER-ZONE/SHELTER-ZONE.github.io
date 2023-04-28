import type { Router } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { useAppStore } from '@/stores/app'

import dayjs from 'dayjs'

export const registerRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    checkExpiresIn() // 檢查登入是否已過期
    if (!to.meta.auth) return next() // 無須登入頁，直接前往
    const { loggedIn } = useOauthStore()
    const { setSignal } = useAppStore()
    if (!loggedIn) return setSignal('requestSignin', true)
    next()
  })
}

export function checkExpiresIn() {
  const { expiresIn, clearUser, loggedIn } = useOauthStore()
  if (!loggedIn) return
  const now = dayjs()
  const expireDate = dayjs(Number(expiresIn))
  if (expireDate.isBefore(now)) {
    window.$message.warning('token expired, please login again !')
    clearUser()
  }
}

export async function checkIsSZMember() {
  const oauthStore = useOauthStore()
  if (!oauthStore.loggedIn) return
  await oauthStore.getDCUserGuilds()
  if (oauthStore.szJoined) return
  window.$message.warning('偵測使用者已離開 Discord Server，已自動登出', {
    closable: true,
    duration: 10000,
  })
  oauthStore.clearUser()
}
