<template>
  <main class="personal-shelter">
    <PageTitle :icon="Campsite" title="Personal Shelter" />
    <n-spin :show="loading">
      <div class="f-col">
        <!-- <BannerBlock /> -->
        <div class="wrapper">
          <AreaBlock>
            <UserBaseInfoBlock :sz-user="displayData.szUser" :dc-user="displayData.dcUser" />
          </AreaBlock>
          <DailyCheckRecordBlock :sz-user="displayData.szUser" />
        </div>
        <AreaBlock>
          <UserServerRolesBlock :dc-member="displayData.dcMember" />
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
import { NSpin, useMessage } from 'naive-ui'
import { FindShelter } from '@/api/shelter'

import { onBeforeMount, ref, computed, watchEffect, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { get, omit } from 'lodash-es'
import { Campsite } from '@vicons/carbon'
import dayjs from 'dayjs'

const route = useRoute()
const message = useMessage()
const loading = ref(true)
const shelterData = ref({
  szUser: null,
  dcMember: null,
  dcUser: null,
})
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

  const displayData = computed(() => {
    return {
      szUser: omit(shelterData.value, 'DiscordMember') || null,
      dcMember: get(shelterData.value, 'DiscordMember') || null,
      dcUser: get(shelterData.value, 'DiscordMember.user') || null,
    }
  })

  onBeforeMount(async () => {
    if (!discordId.value) {
      return
    }
    const [shelter, err]: any = await FindShelter({ discordId: discordId.value as string })
    if (err) {
      message.error(err.message)
      return
    }
    shelterData.value = shelter.data
    loading.value = false
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
