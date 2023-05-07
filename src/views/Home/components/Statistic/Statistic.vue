<template>
  <div class="sz-statistic">
    <SZBlockContainer>
      <p class="value">
        {{ szStatistic.members }} <span class="value-unit">Members</span>
      </p>
    </SZBlockContainer>

    <SZBlockContainer>
      <div class="flex gap-[10px]">
        <p class="value">
          {{ szDuration.days }} <span class="value-unit">Days</span>
        </p>
        <p class="value">
          {{ szDuration.hours }} <span class="value-unit">Hours</span>
        </p>
        <p class="value">
          {{ szDuration.mins }} <span class="value-unit">Mins</span>
        </p>
        <p class="value">
          {{ szDuration.secs }} <span class="value-unit">Secs</span>
        </p>
      </div>
    </SZBlockContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { useSZGuild } from '@/stores/szGuild'
import { useNow } from '@vueuse/core'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
const szGuildStore = useSZGuild()

const szStatistic = computed(() => szGuildStore.statistic)

const szDuration = computed(() => {
  const start = dayjs('2018-06-27')
  const now = useNow()
  const times = dayjs.duration(dayjs(now.value).diff(start))
  return {
    days: Math.floor(times.asDays()),
    hours: times.hours(),
    mins: times.minutes(),
    secs: times.seconds(),
  }
})

onMounted(async () => {
  szGuildStore.GetAllMembersCount()
})
</script>

<style scoped lang="postcss">
.sz-statistic {
  @apply flex gap-[20px] justify-center flex-wrap;
}
.value {
  @apply text-primary text-lg;
}

.value-unit {
  @apply text-base text-md;
}
</style>
