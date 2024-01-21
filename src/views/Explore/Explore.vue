<template>
  <main class="explore">
    <PageTitle :icon="Explore" title="Explore" />
    <div class="page-wrapper">
      <UserSearch @search="onSearch" />
      <n-spin :show="loading.search">
        <SZUserList
          :szUserList="matchedUsers"
          :dcMemberList="userDiscordMemberData"
        />
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
const userDiscordMemberData = ref([])
const loading = reactive({
  search: false,
})

const findDCMembersByIds = async (users) => {
  const ids = map(users, 'discordId')
  if (!ids.length) return
  await fetchData(
    FindDCMembersByIds,
    { ids },
    (res) => {
      userDiscordMemberData.value = res.data
    },
    (err) => {
      console.log(err)
    },
  )
}

const searchMemberData = useDebounceFn(
  async (searchType: string, search: string) => {
    loading.search = true
    await fetchData(
      GetSZUser,
      { [searchType]: search, start: 0 },
      async (res) => {
        matchedUsers.value = res.data
        await findDCMembersByIds(res.data)
        loading.search = false
      },
      (err) => {
        console.log(err)
        loading.search = false
      },
    )
    loading.search = false
  },
  1000,
)

const onSearch = async ({
  searchType,
  search,
}: {
  searchType: string
  search: string
}) => {
  searchMemberData(searchType, search)
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
