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
  @apply bg-primary-bg text-base m-15px;
  box-shadow: 10px 10px 29px 5px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 10px 10px 29px 5px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 10px 10px 29px 5px rgba(0, 0, 0, 0.4);
}
</style>
