<template>
  <main class="explore">
    <PageTitle :icon="Explore" title="Explore" />
    <div class="page-wrapper">
      <UserSearch @search="onSearch" />
      <n-spin :show="loading.search">
        <SZUserList :user-list="matchedUsers" />
      </n-spin>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Explore } from '@vicons/carbon'
import PageTitle from '@/components/PageTitle.vue'
import UserSearch from './components/UserSearch.vue'
import SZUserList from './components/SZUserList.vue'
import { useDebounceFn } from '@vueuse/core'
import { useFetch } from '@/use/useFetch'
import { GetSZUser } from '@/api/szUser'
import { NSpin } from 'naive-ui'
import { ref, reactive } from 'vue'
import { FindDCMembersByIds } from '@/api/discord'
import { map } from 'lodash'

const { fetchData } = useFetch()
const matchedUsers = ref([])
const loading = reactive({
  search: false,
})
const searchByName = useDebounceFn(async (search: string) => {
  loading.search = true
  await fetchData(
    GetSZUser,
    { name: search, start: 0 },
    (res) => {
      matchedUsers.value = res.data
    },
    (err) => {
      console.log(err)
      loading.search = false
    },
  )
  await findDCMembersByIds()
  loading.search = false
}, 800)

const searchByDiscordId = useDebounceFn(async (search: string) => {
  loading.search = true
  await fetchData(
    GetSZUser,
    { discordId: search, start: 0 },
    (res) => {
      matchedUsers.value = res.data
    },
    (err) => {
      console.log(err)
      loading.search = false
    },
  )
  await findDCMembersByIds()
  loading.search = false
}, 1000)

const findDCMembersByIds = async () => {
  const ids = map(matchedUsers.value, 'discordId')
  if (!ids.length) return
  await fetchData(
    FindDCMembersByIds,
    { ids },
    (res) => {
      console.log('FindDCMembersByIds', res.data)
    },
    (err) => {
      console.log(err)
    },
  )
}

const onSearch = async ({
  searchType,
  search,
}: {
  searchType: string
  search: string
}) => {
  switch (searchType) {
    case 'dcId':
      if (search.length < 18) return
      searchByDiscordId(search)
      break
    case 'szUserName':
      if (search.length < 1) return
      searchByName(search)
      break
  }
}
</script>

<style scoped lang="postcss">
.explore {
  @apply viewPx viewPt viewMax;
}

.page-wrapper {
  @apply flex flex-col items-center w-full;
}
</style>
