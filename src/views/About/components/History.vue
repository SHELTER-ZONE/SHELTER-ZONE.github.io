<template>
  <section class="history">
    <SectionTitle title="History" />

    <n-timeline class="w-[fit-content]">
      <n-timeline-item
        title="Success"
        content="正式命名為 SHELTER ZONE，並開始公開對外招募成員"
        time="2018-06-27"
      />
      <n-timeline-item
        type="success"
        title="伺服器重組"
        content="確立伺服器發展方向與整頓頻道風氣、分類身份組、分類頻道主題"
        time="2018-08-20"
      />
      <n-timeline-item
        type="error"
        title="伺服器人員重組"
        content="大量清除幽靈、潛水人員，並開始實施每月幽靈清除機制"
        time="2019-01-19"
      />
      <n-timeline-item
        type="warning"
        title="伺服器結構與機制"
        content="確立邊境哨站的功能，將伺服器定為兩層結構，需進行驗證才可正式進入"
        time="2019-07-23"
      />
      <n-timeline-item
        type="info"
        title="螢幕分享課程審核"
        content="將課程分為正式課程與交流性課程，正式課程需先通過課程審核機制確保質量"
        time="2019-09-19"
        line-type="dashed"
      />
      <n-timeline-item
        type="warning"
        title="Coder驗證"
        content="發起 Coder 身份組驗證機制，通過驗證考試才可獲取 Coder 身份組"
        time="2020-04-12"
      />
      <n-timeline-item
        type="warning"
        title="官網2.0 / SZ組織化"
        content="手刻網站"
        time="2020-05-19"
      />
      <n-timeline-item content="Oops" />
    </n-timeline>
  </section>
</template>

<script setup>
import SectionTitle from '@/components/Title/SectionTitle.vue'
import { Code } from '@vicons/carbon'
import { NTimeline, NTimelineItem } from 'naive-ui'
</script>

<style scoped lang="postcss">
.history {
  @apply flex flex-col justify-center items-center;
}
</style>
