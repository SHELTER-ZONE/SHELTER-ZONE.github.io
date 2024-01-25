<template>
  <n-spin :show="loading">
    <section>
      <ExploreUserItem v-for="user in displayData" :key="user.id" :user="user" />
    </section>
  </n-spin>
</template>

<script setup lang="ts">
import { useSZGuild } from '@/stores/szGuild'
import ExploreUserItem from './ExploreUserItem.vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { get, map } from 'lodash-es'
import { useServerRole } from '@/use/useServerRole'
import { discordUserAvatartUrl } from '@/utils/discord'
import { GetShelterByDiscordIds } from '@/api/shelter'
import { szTeamUserDiscordIds } from '@/configs/explore'
import { useMessage, NSpin } from 'naive-ui'

const { filterMainRoles } = useServerRole()
const szGuildStore = useSZGuild()
const { szTeamMembers } = storeToRefs(szGuildStore)
const message = useMessage()


const loading = ref(true)
const displayData = computed(() => {
  return map(szTeamMembers.value.shelter, (user) => {
    const member = get(user, 'DiscordMember')
    return {
      id: user.id,
      name: user.name,
      discordId: user.discordId,
      member,
      mainRoles: filterMainRoles(get(member, 'roles', [])),
      avatartUrl: discordUserAvatartUrl(get(member, 'user')),
    }
  })
})

const getSzTeamMembersShelter = async () => {
  const [shelters, err]: any = await GetShelterByDiscordIds({
    discordIds: map(szTeamUserDiscordIds, 'id'),
  })
  loading.value = false
  if (err) {
    message.error(err.message)
    return
  }
  szTeamMembers.value.shelter = shelters.data
}

onMounted(async () => {
  if (szTeamMembers.value.shelter.length) {
    loading.value = false
    return
  }
  getSzTeamMembersShelter()
})
</script>

<style scoped lang="postcss"></style>
