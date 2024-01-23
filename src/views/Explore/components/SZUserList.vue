<template>
  <main class="sz-user-list">
    <router-link
      v-for="user in displayData"
      :key="user.id"
      :to="{
        name: 'PersonalShelter',
        params: { discordId: user.discordId },
      }"
    >
      <ExploreUserItem :user="user" />
    </router-link>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ExploreUserItem from './ExploreUserItem.vue'
import type { APIGuildMember } from 'discord-api-types/v10'
import { computed } from 'vue'
import { get, find, map, filter, includes } from 'lodash-es'
import { useServerRole } from '@/use/useServerRole'
import { discordUserAvatartUrl } from '@/utils/discord'

export interface SZUserListProps {
  szUserList: any[]
  dcMemberList: APIGuildMember[]
  sheltersList: any[]
}

const props = withDefaults(defineProps<SZUserListProps>(), {
  szUserList: () => [],
  dcMemberList: () => [],
  sheltersList: () => [],
})

const { filterMainRoles } = useServerRole()

const displayData = computed(() => {
  return map(props.sheltersList, (user) => {
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
</script>

<style scoped lang="postcss">
.sz-user-list {
  @apply flex flex-wrap gap-[40px];
}
</style>
