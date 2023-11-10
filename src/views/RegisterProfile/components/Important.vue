<template>
  <section>
    <AreaBlock> sacascasc </AreaBlock>

    <n-button
      block
      secondary
      type="primary"
      :disabled="!canNext"
      @click="onConfirm"
    >
      <n-countdown v-if="!canNext" :duration="0" :on-finish="onCooldown" />
      <span v-else>下一步</span>
    </n-button>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NCountdown } from 'naive-ui'
import AreaBlock from '@/components/AreaBlock.vue'

const emits = defineEmits(['complete'])

const canNext = ref(false)

const onCooldown = () => {
  canNext.value = true
}

const onConfirm = () => {
  emits('complete', 'Important')
}
</script>

<style scoped lang="postcss"></style>
