<template>
  <n-modal class="base-modal" transform-origin="center">
    <div class="base-modal-body">
      <slot />
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal } from 'naive-ui'
</script>

<style scoped lang="postcss">
.base-modal-body {
  @apply p-[15px] tablet:(p-[30px]);
  @apply rounded-normal;
  @apply bg-primary-bg text-base;
}
</style>
