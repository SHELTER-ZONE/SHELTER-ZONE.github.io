<template>
  <div
    class="editable-block"
    :class="{
      hide: hideEdit,
      'editable-block-hover-effect': !hideEdit,
    }"
  >
    <button
      class="edit-btn"
      @click="emits('edit')"
      :style="hideEdit ? `opacity: 0` : ''"
    >
      <n-icon color="var(--primary-bg)"><Edit /></n-icon>
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { Edit } from '@vicons/carbon'

export interface EditableBlockProps {
  hideEdit?: boolean
  disabled?: boolean
}

defineProps<EditableBlockProps>()

const emits = defineEmits(['edit'])
</script>

<style scoped lang="postcss">
.editable-block {
  @apply p-[20px] relative border-base border-1 border-solid rounded-normal;

  @apply ease-in-out transition-all duration-300;
  @apply overflow-hidden;
}

.editable-block-hover-effect {
  @apply hover:(border-primary bg-secondary-bg);
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
  @apply ease-in-out transition-all duration-300;
}

.hide {
  @apply border-transparent;
}
</style>
