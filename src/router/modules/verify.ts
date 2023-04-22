import type { RouteRecordRaw } from 'vue-router'

const verifyRoutes: RouteRecordRaw[] = [
  {
    path: '/verify',
    name: 'verify',
    meta: {
      hidden: true,
      title: '驗證',
      auth: true,
    },
    children: [
      {
        path: 'confirm',
        name: 'verify-confirm',
        component: () => import('@/views/Verify/SZVerifyConfirm.vue'),
      },
      {
        path: 'form',
        name: 'verify-form',
        meta: { nScrollbar: true },
        component: () => import('@/views/Verify/SZVerifyForm.vue'),
      },
    ],
  },
]

export default verifyRoutes
