import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from 'lodash-es'

export const usePage = () => {
  const route = useRoute()
  const router = useRouter()

  const pageIcon = computed(() => get(route.meta, 'icon'))

  return { route, router, pageIcon }
}
