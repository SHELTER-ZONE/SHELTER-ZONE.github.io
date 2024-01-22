<template>
  <main class="personal-shelter">
    <PageTitle :icon="Campsite" title="Personal Shelter" />
    <n-spin :show="loading">
      <div class="f-col">
        <!-- <BannerBlock /> -->
        <div class="wrapper">
          <AreaBlock>
            <UserBaseInfoBlock :sz-user="szUser" :dc-user="dcUser" />
          </AreaBlock>
          <DailyCheckRecordBlock :sz-user="szUser" />
        </div>
        <AreaBlock>
          <UserServerRolesBlock :dc-member="dcMember" />
        </AreaBlock>
      </div>
    </n-spin>
  </main>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import UserBaseInfoBlock from '@/components/UserBaseInfoBlock.vue'
import DailyCheckRecordBlock from '@/components/DailyCheckRecordBlock.vue'
import UserServerRolesBlock from '@/components/UserServerRolesBlock.vue'
import AreaBlock from '@/components/AreaBlock.vue'
// import Loading from '@/components/Loading.vue'
import { NSpin } from 'naive-ui'
import { FindSZUser } from '@/api/szUser'
import { FindDCMember } from '@/api/discord'

import { onBeforeMount, ref, computed, watchEffect, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { get } from 'lodash-es'
import { useFetch } from '@/use/useFetch'
import { Campsite } from '@vicons/carbon'
import dayjs from 'dayjs'

const route = useRoute()
const { fetchDataToValue } = useFetch()

const loading = ref(true)
const szUser = ref(null)
const dcMember = ref(null)
const dcUser = computed(() => get(dcMember.value, 'user'))
const discordId = computed(() => get(route.params, 'discordId'))
const lastUser = reactive({
  id: null,
  timeStamp: null,
})

const recordLastUser = () => {
  lastUser.id = discordId.value
  lastUser.timeStamp = new Date()
}

const stillCachedUser = () => {
  if (lastUser.id === discordId.value) {
    if (dayjs(lastUser.timeStamp).add(5, 'minutes').isAfter(dayjs(), 'seconds'))
      return true
  }
  return false
}

watchEffect(async () => {
  if (!discordId.value) return
  if (stillCachedUser()) return
  loading.value = true
  try {
    recordLastUser()
    await Promise.all([
      fetchDataToValue(
        FindSZUser,
        { discordId: discordId.value },
        { ref: szUser },
        null,
        { throwError: true },
      ),
      fetchDataToValue(
        FindDCMember,
        { discordId: discordId.value },
        { ref: dcMember },
        null,
        { throwError: true },
      ),
    ])
    loading.value = false
  } catch (error) {
    loading.value = false
  }
})

// onBeforeMount(async () => {
//   try {
//     await Promise.all([
//       fetchDataToValue(
//         FindSZUser,
//         { discordId: discordId.value },
//         { ref: szUser },
//         null,
//         { throwError: true },
//       ),
//       fetchDataToValue(
//         FindDCMember,
//         { discordId: discordId.value },
//         { ref: dcMember },
//         null,
//         { throwError: true },
//       ),
//     ])
//     loading.value = false
//   } catch (error) {
//     loading.value = false
//   }
// })
</script>

<style scoped lang="postcss">
.personal-shelter {
  @apply viewPx viewPt viewMax m-auto;
  @apply pt-[100px];
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}

.wrapper {
  @apply full flex flex-col justify-center items-center gap-[30px];
  @apply tablet:(flex-row items-start);
}
</style>
