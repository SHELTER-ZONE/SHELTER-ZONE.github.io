<template>
  <SZHighLightContainer class="team-member-card">
    <img :src="data.avatar" alt="" />
    <div class="info">
      <p class="team-member-name">{{ data.name }}</p>
      <div class="team-member-tags">
        <NTag
          :bordered="false"
          v-for="tag in data.tags"
          :key="tag"
          :color="tagTypes[tag]?.color"
        >
          {{ tag }}
          <template #icon>
            <NIcon :size="14" :component="tagTypes[tag]?.icon" />
          </template>
        </NTag>
      </div>
    </div>
  </SZHighLightContainer>
</template>

<script setup lang="ts">
import { SZHighLightContainer } from '@shelter-zone/shelter-ui'
import { NTag, NIcon } from 'naive-ui'
import {
  FlashFilled,
  StarFilled,
  IbmCloudPakWatsonAiops,
  Integration,
  Layers,
  Chemistry,
} from '@vicons/carbon'

defineProps({
  data: Object,
})

const tagTypes = {
  fullStack: {
    icon: StarFilled,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
  },
  frontend: {
    icon: FlashFilled,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
  },
  backend: {
    icon: Chemistry,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
  },
  ops: {
    icon: IbmCloudPakWatsonAiops,
    color: { color: 'rgba(95, 246, 180, 0.3)' },
  },
}
</script>

<style scoped lang="postcss">
.team-member-card {
}

.team-member-name {
  @apply font-medium;
}

.team-member-tags {
  @apply flex items-center gap-[10px];
}

.info {
  @apply flex flex-col justify-between;
}
</style>
