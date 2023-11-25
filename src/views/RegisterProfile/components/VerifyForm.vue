<template>
  <div class="verify-form">
    <n-form
      ref="formRef"
      :rules="formRules"
      :show-require-mark="false"
      :model="syncForm"
      class="verify-form"
    >
      <div class="grid grid-cols-1 gap-x-20px">
        <n-form-item
          v-for="field in fields"
          :path="field.key"
          :key="field.key"
          :label="field.label"
        >
          <template #label v-if="field.tip">
            <div class="f-row-center gap-[7px]">
              <p>{{ field.label }}</p>
              <Tip :tip="field.tip" :size="16" color="var(--base)" />
            </div>
          </template>
          <Component
            :is="get(fieldTypeComponent, field.type)"
            :disabled="field.disabled"
            :placeholder="field.placeholder"
            show-count
            v-model:value="syncForm[field.key]"
            :options="field.options"
            :maxlength="field.maxlength"
            :minlength="1"
            :filterable="field.filterable"
            :clearable="field.clearable || true"
            :tag="field.tag"
            :multiple="field.multiple"
            :allow-input="(value: string) => !/ /g.test(value)"
          />
        </n-form-item>
      </div>
    </n-form>

    <n-button secondary type="primary" block @click="onConfirm"
      >下一步</n-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NForm, NFormItem, NButton, type FormItemRule } from 'naive-ui'
import Tip from '@/components/Tip.vue'

// config
import countries from '@/configs/countries'
import joinReasonConfig from '@/configs/joinReason'
import { fromSourcesConfig } from '@/configs/verifyForm'

import { useForm } from '@/use/useForm'
import { values, get, map, isEmpty } from 'lodash-es'
import { useVModel } from '@vueuse/core'

export interface VerifyFormProps {
  form: Record<string, string>
}

const { fieldTypeComponent, verifyForm } = useForm()
const formRef = ref(null)
const props = defineProps<VerifyFormProps>()
const emits = defineEmits(['complete', 'update:form'])

const syncForm = useVModel(props, 'form', emits)

const formRules: Record<string, FormItemRule> = {
  name: {
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, v: string) => {
      if (!v) return new Error('此欄位為必填')
      const pass = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(v)
      if (!pass) return new Error('只允許英文、數字、中文')
      return pass
    },
  },
  from: {
    required: true,
    message: '此欄位為必填',
    trigger: ['change'],
  },
  joinReason: {
    required: true,
    message: '此欄位為必填',
    trigger: ['change'],
    validator: (rule: FormItemRule, v: string[]) => !isEmpty(v),
  },
  country: {
    required: true,
    message: '此欄位為必填',
    trigger: ['change'],
  },
}

const fields = computed(() => [
  {
    label: '避難者 ID',
    key: 'name',
    type: 'text',
    maxlength: 20,
    tip: 'SZ 使用者名稱',
    placeholder: '請輸入',
  },
  {
    label: '路徑來源',
    key: 'from',
    type: 'select',
    tip: '從何得知或是加入 SZ',
    filterable: true,
    tag: true,
    placeholder: '選擇來源或輸入新增',
    options: values(fromSourcesConfig),
  },
  {
    label: '避難原因',
    key: 'joinReason',
    type: 'select',
    filterable: true,
    tag: true,
    multiple: true,
    placeholder: '選擇或輸入新增原因',
    options: map(joinReasonConfig, (item: string) => ({
      label: item,
      value: item,
    })),
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

const onConfirm = async () => {
  const [pass, error] = await verifyForm(formRef)
  if (error) return
  if (pass) emits('complete', 'VerifyForm')
}
</script>

<style scoped lang="postcss">
.verify-form {
  @apply max-w-[800px] w-full;
}
</style>
