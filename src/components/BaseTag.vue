<template>
  <n-tag
    class="base-tag"
    :class="{ 'optional-tag': $attrs.type === 'base' }"
    v-bind="$attrs"
  >
    <template
      v-for="(slot, index) of Object.keys($slots)"
      :key="index"
      v-slot:[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </n-tag>
</template>

<script setup lang="ts">
import { NTag } from 'naive-ui'
</script>

<style scoped lang="postcss">
.base-tag {
  @apply rounded-normal;
}

.optional-tag {
  @apply bg-base text-white;
}
</style>
