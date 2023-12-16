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
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { get } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { CheckmarkOutline } from '@vicons/carbon'

const oauthStore = useOauthStore()
const { user } = storeToRefs(oauthStore)

const dailyCheckRecord = computed(() => get(user.value, 'sz.DailyCheckRecord'))
</script>

<style scoped lang="postcss"></style>
