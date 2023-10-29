<template>
  <AreaBlock class="action-block">
    <section class="upper">
      <div>
        <n-icon :size="48"><slot name="icon" /></n-icon>
      </div>

      <div>
        <slot name="title">
          <p class="title">{{ title }}</p>
        </slot>
        <div name="description">
          <slot />
        </div>
      </div>
    </section>

    <slot name="footer">
      <section class="footer">
        <slot name="action-button">
          <n-button block secondary :type="actionType" @click="emits('action')">
            {{ actionName }}
          </n-button>
        </slot>

        <slot name="hint">
          <div v-if="hint" class="hint">{{ hint }}</div>
        </slot>
      </section>
    </slot>
  </AreaBlock>
</template>

<script setup lang="ts">
import AreaBlock from '@/components/AreaBlock.vue'
import { NIcon, NButton } from 'naive-ui'
import { withDefaults } from 'vue'

export interface ActionBlockProps {
  title: string
  actionName: string
  actionType?: string
  hint?: string
}

withDefaults(defineProps<ActionBlockProps>(), {
  actionType: 'primary',
})

const emits = defineEmits(['action'])
</script>

<style scoped lang="postcss">
.action-block {
  @apply flex flex-col gap-[10px];
}
.action-block .upper {
  @apply flex items-center gap-[20px];
}

.action-block .title {
  @apply text-md font-bold;
}

.action-block .footer {
  @apply flex flex-col gap-[10px];
}

.action-block .footer .hint {
  @apply text-sm;
}
</style>
