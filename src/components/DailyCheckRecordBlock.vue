<template>
  <AreaBlock class="daily-check-record-block">
    <div class="f-col gap-[5px]">
      <div class="f-row gap-[5px]">
        <n-icon size="18"><CheckmarkOutline /></n-icon>
        <p class="font-medium">最後簽到</p>
      </div>

      <p>{{ dailyCheckRecord || '尚未有簽到記錄' }}</p>
    </div>
  </AreaBlock>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AreaBlock from '@/components/AreaBlock.vue'
import { get } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { CheckmarkOutline } from '@vicons/carbon'
import { dateFormat } from '@/utils/date'

export interface DailyCheckRecordBlockProps {
  szUser: any
}

const props = defineProps<DailyCheckRecordBlockProps>()

const dailyCheckRecord = computed(() => {
  const lastCheck = get(props.szUser, 'DailyCheckRecord.lastCheck')
  return lastCheck ? dateFormat(lastCheck) : ''
})
</script>

<style scoped lang="postcss"></style>
