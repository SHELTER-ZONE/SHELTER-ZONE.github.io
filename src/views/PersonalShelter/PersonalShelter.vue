<template>
  <main class="personal-shelter">
    <PageTitle :icon="Campsite" title="Personal Shelter" />
    <n-spin :show="loading">
      <NotFoundShelter v-if="!displayData.dcMember && !loading" />
      <div v-if="loading || displayData.dcMember" class="f-col">
        <!-- <BannerBlock /> -->
        <div class="wrapper">
          <AreaBlock class="flex-shrink-0">
            <UserBaseInfoBlock
              :sz-user="displayData.szUser"
              :dc-user="displayData.dcUser"
            />
          </AreaBlock>

          <div class="tag-area">
            <!-- <DailyCheckRecordBlock :sz-user="displayData.szUser" /> -->
            <AreaBlock v-if="showArea.serverRoles" class="h-full">
              <UserServerRolesBlock :dc-member="displayData.dcMember" />
            </AreaBlock>
          </div>
        </div>
        <AreaBlock v-if="showArea.socialLinks">
          <UserSocialLinks :socialLinks="displayData.socialLinks" />
        </AreaBlock>

        <AreaBlock v-if="showArea.profileText">
          <UserProfileTextBlock :sz-user="displayData.szUser" />
        </AreaBlock>
      </div>
    </n-spin>
  </main>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import UserBaseInfoBlock from '@/components/UserBaseInfoBlock.vue'
// import DailyCheckRecordBlock from '@/components/DailyCheckRecordBlock.vue'
import UserServerRolesBlock from '@/components/UserServerRolesBlock.vue'
import UserProfileTextBlock from '@/components/UserProfileTextBlock.vue'
import UserSocialLinks from '@/components/UserSocialLinks.vue'
import AreaBlock from '@/components/AreaBlock.vue'
import NotFoundShelter from './components/NotFoundShelter.vue'
// import Loading from '@/components/Loading.vue'
import { NSpin, useMessage } from 'naive-ui'
import { FindShelter } from '@/api/shelter'
import { useSeoMeta } from '@unhead/vue'

import { onActivated, onBeforeMount, ref, computed, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { get, omit, trim } from 'lodash-es'
import { Campsite } from '@vicons/carbon'
import dayjs from 'dayjs'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const message = useMessage()
const { setPageKeepAlive } = useAppStore()
const loading = ref(true)
const shelterData = ref({
  szUser: null,
  dcMember: null,
  dcUser: null,
})
const discordId = computed(() => get(route.params, 'discordId'))
const lastUser = reactive({
  discordId: null,
  timeStamp: null,
})

const recordLastUser = () => {
  lastUser.discordId = discordId.value
  lastUser.timeStamp = new Date()
}

const resetShelterData = () => {
  shelterData.value = {
    szUser: null,
    dcMember: null,
    dcUser: null,
  }
}

const stillCachedUser = () => {
  if (lastUser.discordId === discordId.value) {
    if (dayjs(lastUser.timeStamp).add(5, 'minutes').isAfter(dayjs(), 'seconds'))
      return true
  }
  return false
}

watch(
  () => route.params,
  async () => {
    if (loading.value) return
    if (!discordId.value) return
    if (stillCachedUser()) return
    else resetShelterData()
    loading.value = true
    try {
      recordLastUser()
      const [shelter, err]: any = await FindShelter({
        discordId: discordId.value as string,
      })
      loading.value = false
      if (err) {
        message.error(err.message)
        return
      }
      if (shelter.data) shelterData.value = shelter.data
    } catch (error) {
      loading.value = false
    }
  },
)

const displayData = computed(() => {
  return {
    szUser: omit(shelterData.value, 'DiscordMember') || null,
    dcMember: get(shelterData.value, 'DiscordMember') || null,
    dcUser: get(shelterData.value, 'DiscordMember.user') || null,
    socialLinks: get(shelterData.value, 'UserProfile.socialLinks') || [],
  }
})

const showArea = computed(() => {
  const userServerRoles = get(displayData.value, 'dcMember.roles', [])
  return {
    serverRoles: userServerRoles.length ? true : false,
    profileText: trim(get(displayData.value, 'szUser.UserProfile.profileText')),
    socialLinks: displayData.value.socialLinks.length,
  }
})

onBeforeMount(async () => {
  setPageKeepAlive(route.name as string, true)
  if (!discordId.value) {
    return
  }
  const [shelter, err]: any = await FindShelter({
    discordId: discordId.value as string,
  })
  loading.value = false
  if (err) {
    message.error(err.message)
    return
  }
  if (shelter.data) shelterData.value = shelter.data
})

onActivated(() => {
  setPageKeepAlive(route.name as string, true)
})

useSeoMeta({
  title: () =>
    `SHELTER ZONE | 個人避難所 - ${get(
      displayData.value,
      'szUser.UserProfile.name',
    )}`,
  ogTitle: () =>
    `SHELTER ZONE | 個人避難所 - ${get(
      displayData.value,
      'szUser.UserProfile.name',
    )}`,
  description: () =>
    `個人避難所 - ${get(displayData.value, 'szUser.UserProfile.name')}`,
  ogDescription: () =>
    `個人避難所 - ${get(displayData.value, 'szUser.UserProfile.name')}`,
})
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
  @apply <tablet:(gap-[0px]);
}

.tag-area {
  @apply flex flex-col !self-stretch;
}
</style>
