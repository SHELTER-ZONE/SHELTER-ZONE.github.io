<template>
  <n-form ref="formRef" class="verify-form">
    <div class="grid grid-cols-2 gap-x-20px">
      <n-form-item v-for="field in fields" :path="field.key" :key="field.key" :label="field.label">
        <Component :is="get(fieldTypeComponent, field.type)" :disabled="field.disabled" :placeholder="field.placeholder"
          v-model:value="formData[field.key]" :options="field.options" :filterable="field.filterable"
          :clearable="field.clearable || true" />
      </n-form-item>
    </div>

    <n-button secondary block type="primary">進行驗證</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { NForm, NFormItem, NButton } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { fromSourcesConfig } from '@/configs/verifyForm'
import { Tag } from '@vicons/carbon'
import countries from '@/configs/countries'
import { useForm } from '@/use/useForm'
import { values, get } from 'lodash-es'

const formRef = ref<null>()

const { fieldTypeComponent, verifyForm } = useForm()

const { user } = useOauthStore()

const formData = reactive({
  name: null,
  from: null,
  country: null,
})


const fields = computed(() => [
  {
    label: '避難者 ID',
    key: 'name',
    type: 'text',
  },
  {
    label: '來源',
    key: 'from',
    type: 'select',
    placeholder: '選擇來源',
    options: values(fromSourcesConfig)
  },
  {
    label: '地區',
    key: 'country',
    type: 'select',
    filterable: true,
    placeholder: '搜尋/選擇地區',
    options: countries.map((country) => ({ label: country, value: country })),
  },
])
</script>

<style scoped lang="postcss">
.verify-form {
  @apply max-w-[800px] w-full m-auto;
}
</style>
