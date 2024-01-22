<template>
  <n-form ref="formRef" :model="formData" :rules="formRules">
    <div class="f-row items-center gap-[12px] w-full">
      <n-select
        style="width: 140px"
        :options="searchTypeOptions"
        v-model:value="formData.searchType"
        @update:value="onSearchTypeChange"
      />
      <n-form-item :show-feedback="false" path="searchValue" class="f-row">
        <n-input
          v-model:value="formData.searchValue"
          style="width: 200px"
          clearable
          :placeholder="searchPlaceholder"
          path="searchValue"
        />
      </n-form-item>
      <BaseButton type="info" @click="onSearch" :disabled="disabled">
        Search
      </BaseButton>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NSelect, NInput } from 'naive-ui'
import BaseButton from '@/components/BaseButton.vue'
import { computed, reactive, ref } from 'vue'
import { get } from 'lodash-es'
import { useForm } from '@/use/useForm'

const emits = defineEmits(['search'])
defineProps({
  disabled: { type: Boolean },
})

const { verifyForm, clearFormvalidation } = useForm()
const formRef = ref(null)
const formData = reactive({
  searchType: 'discordId',
  searchValue: null,
})
const formRules = computed(() => {
  const rules = {
    searchValue: {
      required: true,
      trigger: 'input',
    },
  }

  if (formData.searchType === 'discordId') {
    rules.searchValue.validator = (r, v) => /^[0-9]{18,}$/.test(v)
  }

  return rules
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

const onSearch = async () => {
  const formPass = await verifyForm(formRef)
  if (!formPass) return
  if (formData.searchValue) {
    emits('search', {
      searchType: formData.searchType,
      search: formData.searchValue,
    })
  }
}

const onSearchTypeChange = (v) => {
  clearFormvalidation(formRef)
}
</script>

<style scoped lang="postcss"></style>
