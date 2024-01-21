<template>
  <SZBlockContainer class="h-full">
    <article class="explore-user-item">
      <n-image
        class="user-avatar"
        :src="`${user.avatartUrl}?size=128`"
        alt="discord user avatar"
        :fallback-src="ImagePlaceholder"
      />
      <header class="f-col gap-[12px] justify-between">
        <n-tooltip trigger="hover">
          <template #trigger>
            <h3 class="user-name">{{ user.name }}</h3>
          </template>
          <span>{{ user.name }}</span>
        </n-tooltip>

        <div>
          <BaseTag v-for="role in user.mainRoles" :key="role.id" type="primary">
            {{ role.name }}
          </BaseTag>
        </div>
      </header>
    </article>
  </SZBlockContainer>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NImage, NTooltip } from 'naive-ui'
import BaseTag from '@/components/BaseTag.vue'
import ImagePlaceholder from '@/assets/default/image_placeholder.webp'

export interface ExploreUserItem {
  user: any
}

const props = defineProps<ExploreUserItem>()
</script>

<style scoped lang="postcss">
.explore-user-item {
  @apply w-[130px] overflow-hidden;
}
.user-name {
  @apply truncate text-md font-medium;
}

.user-avatar {
  @apply w-full rounded-lg;
}
</style>
