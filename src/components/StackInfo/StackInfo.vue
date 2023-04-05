<template>
  <div class="stack-info">
    <StackInfoItem v-for="item in syncModel" :key="item.id" :data="item" />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { StackInfoItemData } from './types'
import StackInfoItem from './components/StackInfoItem.vue'

const props = defineProps<{
  value: Array<any>
}>()

const emit = defineEmits(['update:value'])

const syncModel = useVModel(props, 'value', emit)
</script>

<style scoped lang="postcss">
.stack-info {
  @apply flex flex-col gap-[20px];
}
</style>
