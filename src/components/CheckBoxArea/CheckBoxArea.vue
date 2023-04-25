<template>
  <SZBlockContainer class="checkbox-area">
    <p
      v-if="title"
      class="checkbox-area-title"
      :class="{
        'text-left': titlePosition === 'start',
        'text-center': titlePosition === 'center',
        'text-right': titlePosition === 'end',
      }"
    >
      {{ title }}
      <slot name="titleHint" />
    </p>
    <slot name="title" />
    <n-checkbox-group v-model:value="syncModel">
      <div class="check-options-wrapper">
        <n-checkbox
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </div>
    </n-checkbox-group>
  </SZBlockContainer>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { useVModel } from '@vueuse/core'
import { NCheckboxGroup, NCheckbox } from 'naive-ui'
import type { CheckBoxOption } from './types'

const props = defineProps<{
  title?: string
  titlePosition?: 'start' | 'center' | 'end'
  value: (string | number)[]
  options: CheckBoxOption[]
}>()

const emits = defineEmits(['update:value'])

const syncModel: (string | number)[] = useVModel(props, 'value', emits)
</script>

<style scoped lang="postcss">
.checkbox-area-title {
  @apply mb-[10px];
}

.check-options-wrapper {
  @apply flex flex-wrap;
  @apply justify-between;
}
</style>
