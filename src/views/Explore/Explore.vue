<template>
  <main class="explore">
    <PageTitle :icon="Explore" title="Explore" />
    <div class="page-wrapper">
      <UserSearch @search="onSearch" :disabled="loading.search" />
      <n-spin :show="loading.search">
        <SZUserList
          :szUserList="matchedUsers"
          :dcMemberList="userDiscordMemberData"
          :sheltersList="sheltersList"
        />

        <section class="flex justify-center pt-[30px]">
          <NPagination
            v-model:page="paginationData.page"
            :item-count="paginationData.totalData"
            :page-size="paginationData.limit"
          />
        </section>
      </n-spin>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Explore } from '@vicons/carbon'
import PageTitle from '@/components/PageTitle.vue'
import UserSearch from './components/UserSearch.vue'
import SZUserList from './components/SZUserList.vue'
import { useDebounceFn } from '@vueuse/core'
import { useFetch } from '@/use/useFetch'
import { NSpin, NPagination, useMessage } from 'naive-ui'
import { GetSZUser } from '@/api/szUser'
import { FindDCMembersByIds } from '@/api/discord'
import { GetShelter, GetShelterCount } from '@/api/shelter'
import { map } from 'lodash'

const message = useMessage()
const { fetchData } = useFetch()
const matchedUsers = ref([])
const sheltersList = ref([])
const userDiscordMemberData = ref([])
const loading = reactive({
  search: false,
})

const paginationData = reactive({
  totalData: 0,
  limit: 20,
  page: 1,
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

    try {
      const [shelterCount, countError]: any = await GetShelterCount({
        [searchType]: search,
      })
      if (countError) message.error(countError)
      paginationData.totalData = shelterCount.data
      if (shelterCount <= 0) return

      const [shelters]: any = await GetShelter({
        [searchType]: search,
        start: 0,
        limit: paginationData.limit,
      })
      console.log(shelters)

      sheltersList.value = shelters.data
      loading.search = false
    } catch (error) {
      console.log(error)
      loading.search = false
    }

    // await fetchData(
    //   GetShelter,
    //   { [searchType]: search, start: 0 },
    //   async (res) => {
    //     matchedUsers.value = res.data
    //     console.log(res)
    //     // await findDCMembersByIds(res.data)
    //     loading.search = false
    //   },
    //   (err) => {
    //     console.log(err)
    //     loading.search = false
    //   },
    // )
    loading.search = false
  },
  500,
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
  @apply pt-[20px];
  @apply flex flex-col items-center w-full gap-[40px];
}
</style>
