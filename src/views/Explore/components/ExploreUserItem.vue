<template>
  <router-link :to="{
    name: 'PersonalShelter',
    params: { discordId: user.discordId },
  }">
    <article class="explore-user-item" :class="{ 'dev-team-member': isDevTeam }">
      <div class="dev-team-deco" v-if="isDevTeam">
        🔰 SZ Team
      </div>
      <SZBlockContainer class="full">
        <n-image class="user-avatar" width="100%" :src="`${user.avatartUrl}?size=128`" alt="discord user avatar"
          :fallback-src="ImagePlaceholder" preview-disabled />
        <header class="f-col gap-[12px] justify-between">
          <n-tooltip trigger="hover">
            <template #trigger>
              <h3 class="user-name">{{ user.name }}</h3>
            </template>
            <span>{{ user.name }}</span>
          </n-tooltip>

          <div class="tags">
            <BaseTag v-for="role in user.displayRoles" :key="role.id" :type="isDevTeamRole(role) ? 'warning' : 'primary'"
              :bordered="false" size="small">
              {{ role.name }}
            </BaseTag>
          </div>
        </header>
      </SZBlockContainer>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NImage, NTooltip } from 'naive-ui'
import BaseTag from '@/components/BaseTag.vue'
import ImagePlaceholder from '@/assets/default/image_placeholder.webp'
import { RouterLink } from 'vue-router'
import { useServerRole } from '@/use/useServerRole'
import { get } from 'lodash-es'
import { computed } from 'vue'

export interface ExploreUserItem {
  user: any
}

const props = defineProps<ExploreUserItem>()

const { haveDevTeamRole, isDevTeamRole } = useServerRole()
const isDevTeam = computed(() => haveDevTeamRole(get(props.user, 'member.roles')))
</script>

<style scoped lang="postcss">
.explore-user-item {
  @apply w-[180px] h-full overflow-hidden rounded-normal;
  @apply shadow-xl relative;
}

.user-name {
  @apply truncate text-md font-medium pt-[10px];
}

.user-avatar {
  @apply w-full rounded-lg;
}



.tags {
  @apply flex flex-wrap gap-[7px] pb-[10px];
}

.dev-team-member {
  @apply border-1 border-solid box-border border-primary;
}

.dev-team-deco {
  @apply absolute bottom-0 right-0 left-0;
  @apply bg-primary px-[5px] py-[1px];
  @apply font-bold text-base text-sm;
}
</style>
