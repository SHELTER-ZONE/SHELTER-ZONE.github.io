<template>
  <main class="sz-user-list">
    <ExploreUserItem v-for="user in displayData" :key="user.id" :user="user" />
  </main>
</template>

<script setup lang="ts">
import ExploreUserItem from './ExploreUserItem.vue'
import { computed } from 'vue'
import { get, map } from 'lodash-es'
import { useServerRole } from '@/use/useServerRole'
import { discordUserAvatartUrl } from '@/utils/discord'

export interface SZUserListProps {
  sheltersList: any[]
}

const props = withDefaults(defineProps<SZUserListProps>(), {
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
  @apply max-w-[900px] w-full;
  @apply grid gap-[20px] justify-items-center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  /* @apply grid grid-cols-5 gap-[40px];
  @apply <laptop:(grid-cols-4);
  @apply <tablet:(gap-[20px]);
  @apply <md:(grid-cols-2); */
}
</style>
