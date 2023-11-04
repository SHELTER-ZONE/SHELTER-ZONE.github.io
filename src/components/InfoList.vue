<template>
  <table>
    <tbody>
      <tr v-for="(value, label) in data" :key="label">
        <td class="label">{{ label }}</td>
        <td class="value">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface InfoListProps {
  labelAlign?: 'left' | 'center' | 'right'
  gapX?: number
  gapY?: number
  data?: Record<string, any>
}

const props = withDefaults(defineProps<InfoListProps>(), {
  labelAlign: 'left',
  gapX: 20,
  gapY: 12,
  data: () => ({}),
})

const computedProps = computed(() => {
  return {
    labelAlign: props.labelAlign,
    gapX: `${props.gapX}px`,
    gapY: `${props.gapY}px`,
  }
})
</script>

<style scoped lang="postcss">
.label {
  @apply font-medium;
  vertical-align: top;
  text-align: v-bind('computedProps.labelAlign');
  padding-right: v-bind('computedProps.gapX');
}
.value {
  @apply break-all text-left;
  padding-bottom: v-bind('computedProps.gapY');
}

tr:last-child {
  .value {
    @apply pb-0;
  }
}
</style>
