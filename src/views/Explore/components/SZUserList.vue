<template>
  <NCollapseTransition :show="!loading && loaded && displayData.length > 0">
    <section class="user-list-container">
      <ExploreUserItem
        v-for="user in displayData"
        :key="user.id"
        :user="user"
      />
    </section>
  </NCollapseTransition>

  <NCollapseTransition :show="loading && loaded">
    <section class="loading-holder-container"></section>
  </NCollapseTransition>

  <NCollapseTransition :show="loading && !loaded">
    <section class="user-list-container">
      <ExploreUserItemSkeleton v-for="idx in 8" :key="idx" />
    </section>
  </NCollapseTransition>

  <NCollapseTransition :show="!displayData.length && loaded && !loading">
    <section class="py-[40px]">
      <p class="text-warning text-center">Oops, No User Found (x __ x) !</p>
    </section>
  </NCollapseTransition>
</template>

<script setup lang="ts">
import ExploreUserItem from './ExploreUserItem.vue'
import ExploreUserItemSkeleton from './ExploreUserItemSkeleton.vue'
import { computed, ref } from 'vue'
import { get, map } from 'lodash-es'
import { useServerRole } from '@/use/useServerRole'
import { discordUserAvatartUrl } from '@/utils/discord'
import { NCollapseTransition } from 'naive-ui'

export interface SZUserListProps {
  sheltersList: any[]
  loaded: boolean
  loading: boolean
}

const props = withDefaults(defineProps<SZUserListProps>(), {
  sheltersList: () => [],
})

const { excludeOptionalRoles } = useServerRole()

const displayData = computed(() => {
  return map(props.sheltersList, (user) => {
    const member = get(user, 'DiscordMember')
    return {
      id: user.id,
      name: user.name,
      discordId: user.discordId,
      member,
      displayRoles: excludeOptionalRoles(get(member, 'roles', [])),
      avatartUrl: discordUserAvatartUrl(get(member, 'user')),
    }
  })
})
</script>

<style scoped lang="postcss">
.user-list-container {
  @apply w-full;
  @apply grid gap-[20px] justify-items-center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.loading-holder-container {
  @apply h-[200px];
}
</style>
