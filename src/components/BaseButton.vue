<template>
    <n-button class="base-button" secondary :style="computedStyle">
        <template v-for="(slot, index) of Object.keys($slots)" :key="index" v-slot:[slot]>
            <slot :name="slot"></slot>
        </template>
    </n-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NButton } from 'naive-ui'


export interface BaseButtonProps {
    border?: boolean,
    borderColor?: string,
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
    border: false,
    borderColor: 'var(--base)',
})

const computedStyle = computed(() => {
    return {
        border: props.border ? `1px solid ${props.borderColor}` : undefined,
    }
})

</script>

<style scoped lang="postcss">
.base-button {
    @apply rounded-normal;
}
</style>