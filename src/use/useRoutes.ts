import { useOauthStore } from '@/stores/oauth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'

export const useRoutes = () => {
  const router = useRouter()
  const oauthStore = useOauthStore()
  const routes = computed(() => router.options.routes)
  const displayRoutes = computed(() => {
    return router.options.routes.filter((route) => !get(route, 'meta.hidden'))
  })

  return {
    routes,
    displayRoutes,
  }
}
