import type { RouteRecordRaw } from 'vue-router'

const verifyRoutes: RouteRecordRaw[] = [
  {
    path: '/verify',
    name: 'verify',
    meta: {
      hidden: true,
      title: '驗證',
      auth: true,
      registeredBlock: true,
    },
    children: [
      {
        path: 'confirm',
        name: 'verify-confirm',
        component: () => import('@/views/Verify/SZVerifyConfirm.vue'),
      },
      {
        path: 'sz-join-confirm',
        name: 'sz-join-confirm',
        component: () => import('@/views/Verify/SZJoinConfirm.vue'),
      },
      {
        path: 'form',
        name: 'verify-form',
        component: () => import('@/views/Verify/SZVerifyForm.vue'),
      },
    ],
  },
]

export default verifyRoutes
