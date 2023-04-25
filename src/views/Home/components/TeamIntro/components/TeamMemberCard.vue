<template>
  <SZHighLightContainer
    class="team-member-card"
    :color="data?.color"
    glow="4.5"
    lightWidth="7"
    lightPosition="right"
  >
    <div class="content-wrapper">
      <img
        class="team-member-avatar"
        :src="data?.avatar"
        :alt="`${data?.name}-avatar`"
      />
      <div class="info">
        <p class="team-member-name">{{ data?.name }}</p>
        <div class="team-member-links">
          <a
            v-for="link in data?.links || []"
            :key="link.name"
            :href="link.link"
            target="_blank"
            rel="noopener noreferrer"
            :title="link.name"
          >
            <NIcon :size="20" :component="link.icon" />
          </a>
        </div>
        <div class="team-member-tags">
          <NTag
            :bordered="false"
            v-for="tag in data?.tags || []"
            :key="tag"
            :type="tagTypes[tag]?.type"
          >
            {{ tag }}
            <template #icon>
              <NIcon :size="14" :component="tagTypes[tag]?.icon" />
            </template>
          </NTag>
        </div>
      </div>
    </div>
  </SZHighLightContainer>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { SZHighLightContainer } from '@shelter-zone/shelter-ui'
import { NTag, NIcon } from 'naive-ui'
import {
  FlashFilled,
  StarFilled,
  IbmCloudPakWatsonAiops,
  Chemistry,
} from '@vicons/carbon'

type TagsTypes = Record<
  string,
  {
    icon: Component
    color: { color: string }
    type: 'info' | 'warning' | 'success' | 'error'
  }
>

defineProps({
  data: Object,
})

const tagTypes: TagsTypes = {
  fullStack: {
    icon: StarFilled,
    color: { color: 'rgba(99, 226, 183, 0.16)' },
    type: 'info',
  },
  frontend: {
    icon: FlashFilled,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
    type: 'warning',
  },
  backend: {
    icon: Chemistry,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
    type: 'success',
  },
  ops: {
    icon: IbmCloudPakWatsonAiops,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
    type: 'error',
  },
}
</script>

<style scoped lang="postcss">
.team-member-card {
  @apply max-w-[350px] w-full;
}
.content-wrapper {
  @apply flex gap-[10px];
  @apply tablet:(gap-[20px]);
}

.team-member-avatar {
  @apply max-w-[90px] h-full rounded-md;
}

.team-member-name {
  @apply font-medium;
}

.team-member-links {
  @apply flex gap-[10px];
  @apply mb-[5px];
}

.team-member-tags {
  @apply flex items-center gap-[10px];
  @apply <mb:(flex-wrap);
}

.info {
  @apply flex flex-col justify-between;
}
</style>
