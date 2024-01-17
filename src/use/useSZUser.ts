import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { get } from 'lodash-es'

export const useSZUser = () => {
  const oauthStore = useOauthStore()
  const { user } = storeToRefs(oauthStore)

  const userDCMember = computed(() => get(user.value, 'discord'))
  const userDCUser = computed(
    () => get(user.value, 'discord.user') || get(user.value, 'discord'),
  )
  const userSZUser = computed(() => get(user.value, 'sz'))

  return { userDCMember, userDCUser, userSZUser }
}
