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
          clearable
          :placeholder="searchPlaceholder"
          @input="
            emits('search', { searchType: formData.searchType, search: $event })
          "
        />
      </div>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NSelect, NInput } from 'naive-ui'
import { computed, reactive, ref } from 'vue'
import { get } from 'lodash-es'

const emits = defineEmits(['search'])

const formRef = ref(null)
const formData = reactive({
  searchType: 'discordId',
  searchValue: null,
})

const searchTypeOptions = [
  // { label: 'Discord 使用者名稱', value: 'dcName' },
  { label: 'Discord User', value: 'discordId' },
  { label: 'SZUser', value: 'name' },
]

const searchPlaceholder = computed(() => {
  const placeholder = {
    dcName: '請輸入 Discord 使用者名稱',
    discordId: '請輸入 Discord ID',
    name: '請輸入 SZUser 名稱',
  }
  return get(placeholder, formData.searchType)
})
</script>

<style scoped lang="postcss"></style>