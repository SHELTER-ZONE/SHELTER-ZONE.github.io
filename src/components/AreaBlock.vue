<template>
  <div class="area-block">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface AreaBlockProps {
  bg?: string
  border?: number
  color?: string
}

const props = withDefaults(defineProps<AreaBlockProps>(), {
  bg: 'transparent',
  border: 1.5,
  color: 'var(--primary-bg)',
})
</script>

<style scoped lang="postcss">
.area-block {
  @apply border-[1.5px] p-[20px] rounded-md;
  border-width: v-bind(props.border + 'px');
  background-color: v-bind(props.bg);
  border-color: v-bind(props.color);
}
</style>
