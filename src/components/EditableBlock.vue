<template>
  <div class="editable-block">
    <button class="edit-btn">
      <n-icon color="var(--primary-bg)"><Edit /></n-icon>
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { NIcon, NButton } from 'naive-ui'
import { Edit } from '@vicons/carbon'
</script>

<style scoped lang="postcss">
.editable-block {
  @apply p-[20px] relative border-primary border-1 rounded-normal;
}

.edit-btn {
  @apply absolute top-0 right-0;
  @apply bg-primary hover:(opacity-80);
  @apply px-[10px] py-[5px] rounded-bl-normal;
}
</style>
