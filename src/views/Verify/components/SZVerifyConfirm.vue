<template>
  <div class="sz-verify-confirm">
    <!-- <SZBlockContainer> csacs </SZBlockContainer> -->
    <div>
      <n-icon><WarningFilled /></n-icon>
      csacascascs
    </div>

    <div>
      <n-button ghost>不同意</n-button>
      <n-button ghost type="primary" @click="emit('confirm')">同意</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Warning, WarningFilled } from '@vicons/carbon'
import { NButton, NIcon } from 'naive-ui'

const emit = defineEmits(['confirm'])
</script>

<style scoped lang="postcss">
.sz-verify-confirm {
  @apply flex flex-col gap-[30px];
  @apply justify-center;
}
</style>
