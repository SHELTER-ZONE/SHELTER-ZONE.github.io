<template>
  <StatusMask status="blocked" text="(封面圖) 尚未開放">
    <AreaBlock class="daily-check-record-block" color="var(--base)">
      <div class="text-center min-h-[100px]"></div>
    </AreaBlock>
  </StatusMask>
</template>

<script setup lang="ts">
import AreaBlock from '@/components/AreaBlock.vue'
import StatusMask from '@/components/StatusMask.vue'
</script>

<style scoped lang="postcss"></style>
