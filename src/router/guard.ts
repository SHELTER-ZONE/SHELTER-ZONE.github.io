import type { Router } from 'vue-router'

export const createRouterGuards = async (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    next()
  })

  router.afterEach((to, _, failure) => {})

  router.onError((error) => {
    console.log('路由错误', error)
  })
}
