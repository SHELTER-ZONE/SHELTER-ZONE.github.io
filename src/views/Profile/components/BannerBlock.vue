<template>
  <AreaBlock class="daily-check-record-block" color="var(--base)">
    <div>Banner</div>
  </AreaBlock>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AreaBlock from '@/components/AreaBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { get } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { CheckmarkOutline } from '@vicons/carbon'
import { dateFormat } from '@/utils/date'

const oauthStore = useOauthStore()
const { user } = storeToRefs(oauthStore)

const dailyCheckRecord = computed(() => {
  const lastCheck = get(user.value, 'sz.DailyCheckRecord.lastCheck')
  return lastCheck ? dateFormat(lastCheck) : ''
})
</script>

<style scoped lang="postcss"></style>
