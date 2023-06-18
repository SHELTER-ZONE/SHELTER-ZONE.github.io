<template>
  <div class="topic-intro">
    <h3 class="topic-name">{{ topic }}</h3>
    <SZBlockContainer class="min-w-[220px]">
      <p class="text-center mb-[10px]">討論度</p>
      <n-progress
        type="line"
        :show-indicator="false"
        :indicator-placement="'inside'"
        status="success"
        :percentage="trends"
        indicator-text-color="#000000"
      />
    </SZBlockContainer>

    <SZBlockContainer title="Channels" class="h-full">
      <p
        v-for="channel in channels.value"
        :key="get(channel, 'id')"
        class="channel-name"
      >
        - {{ get(channel, 'name', '-') }}
      </p>
    </SZBlockContainer>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NProgress } from 'naive-ui'
import { get } from 'lodash-es'

export interface TopicIntroProps {
  topic: string
  id: string
  trends: number
  description: string
  channels: any[]
}

withDefaults(defineProps<TopicIntroProps>(), {
  topic: '',
  id: '',
  trends: 0,
  description: '',
  channels: () => [],
})
</script>

<style scoped lang="postcss">
.topic-intro {
  @apply flex flex-col gap-[20px] w-full h-auto;
  /* @apply tablet:(flex-row flex-row-reverse); */
}

.topic-name {
  @apply text-center text-lg font-medium;
}

.channel-name {
  @apply font-medium cursor-default hover:(text-primary);
}
</style>
