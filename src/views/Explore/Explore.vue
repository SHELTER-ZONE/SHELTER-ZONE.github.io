<template>
  <main class="explore">
    <PageTitle :icon="Explore" title="Explore" />
    <div class="page-wrapper">
      <SZTeamMembersShelter />
      <!-- <n-divider /> -->
      <UserSearch v-model:search="search" @search="onSearch" :disabled="loading.search" />
      <n-spin :show="loading.search">
        <SZUserList :sheltersList="sheltersList" />
      </n-spin>
      <section class="flex justify-center ">
        <NPagination v-model:page="paginationData.curPage" :item-count="paginationData.totalData"
          :page-size="paginationData.limit" @update:page="onPageChange" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Explore } from '@vicons/carbon'
import PageTitle from '@/components/PageTitle.vue'
import UserSearch from './components/UserSearch.vue'
import SZUserList from './components/SZUserList.vue'
import { useDebounceFn } from '@vueuse/core'
import { NSpin, NPagination, useMessage, NDivider } from 'naive-ui'
import { GetShelter, GetShelterCount } from '@/api/shelter'
import SZTeamMembersShelter from './components/SZTeamMembersShelter.vue'
import { usePagination } from '@/use/usePagination'

const message = useMessage()
const { paginationData, pageStartIndex } = usePagination({ limit: 20 })
const sheltersList = ref([])
const loading = reactive({
  search: false,
})

const search = reactive({
  searchType: 'name',
  searchValue: null,
})

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

      sheltersList.value = shelters.data
      loading.search = false
    } catch (error) {
      console.log(error)
      loading.search = false
    }

    loading.search = false
  },
  500,
)

const onPageChange = async () => {
  loading.search = true
  const [shelters, err]: any = await GetShelter({
    [search.searchType]: search.searchValue,
    start: pageStartIndex.value,
    limit: paginationData.limit,
  })
  loading.search = false
  if (err) {
    console.log(err)
    message.error(err.message)
    return
  }
  sheltersList.value = shelters.data
}

const onSearch = async ({
  searchType,
  search,
}: {
  searchType: string
  search: string
}) => {
  searchMemberData(searchType, search)
}

onMounted(async () => {
  onSearch({})
})
</script>

<style scoped lang="postcss">
.explore {
  @apply viewPx viewPt viewMax m-auto;
}

.page-wrapper {
  @apply pt-[20px];
  @apply flex flex-col items-center w-full gap-[40px];
}
</style>
