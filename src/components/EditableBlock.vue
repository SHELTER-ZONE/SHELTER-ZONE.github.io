<template>
  <div class="editable-block">
    <button class="edit-btn" @click="$emit('edit')">
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
  @apply p-[20px] relative border-base border-1 border-solid rounded-normal;
  @apply hover:(border-primary);
}

.editable-block:hover {
  .edit-btn {
    @apply bg-primary;
  }
}

.edit-btn {
  @apply absolute top-0 right-0;
  @apply bg-base hover:(opacity-80);
  @apply px-[10px] py-[5px] rounded-bl-normal;
}
</style>
