<template>
  <n-form ref="formRef" :model="formData">
    <n-form-item class="w-[500px]" path="searchValue">
      <div class="f-row items-center gap-[12px] w-full">
        <n-select
          :options="searchTypeOptions"
          v-model:value="formData.searchType"
        />
        <n-input
          v-model:value="formData.searchValue"
          class="w-full"
          :placeholder="searchPlaceholder"
          @input="onSearch"
        />
      </div>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NSelect, NInput } from 'naive-ui'
import { computed, reactive, ref } from 'vue'
import { get, debounce } from 'lodash-es'
import { GetSZUser } from '@/api/szUser'
import { useFetch } from '@/use/useFetch'
import { useDebounceFn } from '@vueuse/core'

const { fetchData } = useFetch()

const formRef = ref(null)
const formData = reactive({
  searchType: 'dcId',
  searchValue: null,
})

const searchTypeOptions = [
  // { label: 'Discord 使用者名稱', value: 'dcName' },
  { label: 'Discord ID', value: 'dcId' },
  { label: 'SZUser', value: 'szUserName' },
]

const searchPlaceholder = computed(() => {
  const placeholder = {
    dcName: '請輸入 Discord 使用者名稱',
    dcId: '請輸入 Discord ID',
    szUserId: '請輸入 SZUser 名稱',
  }
  return get(placeholder, formData.searchType)
})

const searchByName = useDebounceFn((search: string) => {
  fetchData(
    GetSZUser,
    { name: search, start: 0 },
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    },
  )
}, 1000)

const searchByDiscordId = useDebounceFn((search: string) => {
  fetchData(
    GetSZUser,
    { discordId: search, start: 0 },
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    },
  )
}, 1000)
const onSearch = async (search: string) => {
  switch (formData.searchType) {
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

<style scoped lang="postcss"></style>
