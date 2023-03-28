<template>
  <div class="stage-checking">
    <div
      class="stage-item"
      v-for="stage in syncModel"
      :key="stage.id"
      v-show="stage.state !== 'idle'"
    >
      <p>{{ stage.name }}</p>
      <p class="ml-[10px]">...</p>
      <NSpin v-if="stage.state === 'processing'" size="small" />
      <p v-if="showState(stage.state)" class="stage-state">
        <span :class="stage.state">{{ stage.state }}</span>
        <NIcon :color="get(stateIcons, `${stage.state}.color`)"
          ><component :is="get(stateIcons, `${stage.state}.icon`)"
        /></NIcon>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { NSpin, NIcon } from 'naive-ui'
import { computed } from 'vue'
import { CloseFilled, CheckmarkFilled } from '@vicons/carbon'
import { get } from 'lodash-es'
import type { Stage } from '../types'

const props = defineProps<{
  value: Stage[]
}>()

const emit = defineEmits(['update:value'])

const syncModel = useVModel(props, 'value', emit)

const showState = computed(
  () => (state: string) => ['resolve', 'error'].includes(state),
)

const stateIcons = {
  error: {
    color: 'rose',
    icon: CloseFilled,
  },
  resolve: {
    color: 'skyblue',
    icon: CheckmarkFilled,
  },
}
</script>

<style scoped lang="postcss">
.stage-item {
  @apply text-lg text-left;
  @apply flex items-center;
}

.stage-state {
  @apply flex items-center gap-[5px];
}

.resolve {
  @apply text-primary;
}
.error {
  @apply text-primary;
}
</style>
