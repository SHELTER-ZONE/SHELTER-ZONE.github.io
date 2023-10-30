<template>
  <div class="area-block">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface AreaBlockProps {
  bg?: string
  border?: string
}

const props = withDefaults(defineProps<AreaBlockProps>(), {
  bg: 'transparent',
  border: 'var(--primary-bg)',
})
</script>

<style scoped lang="postcss">
.area-block {
  @apply border-[1.5px] p-[20px] rounded-md;

  background-color: v-bind(props.bg);
  border-color: v-bind(props.border);
}
</style>
