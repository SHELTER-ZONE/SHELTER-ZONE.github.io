<template>
  <div class="verify-form">
    <n-form
      ref="formRef"
      :rules="formRules"
      :show-require-mark="false"
      :model="formData"
      class="verify-form"
    >
      <div class="grid grid-cols-1 gap-x-20px">
        <n-form-item
          v-for="field in fields"
          :path="field.key"
          :key="field.key"
          :label="field.label"
        >
          <Component
            :is="get(fieldTypeComponent, field.type)"
            :disabled="field.disabled"
            :placeholder="field.placeholder"
            v-model:value="formData[field.key]"
            :options="field.options"
            :filterable="field.filterable"
            :clearable="field.clearable || true"
          />
        </n-form-item>
      </div>
    </n-form>

    <n-button secondary type="primary" block @click="onConfirm"
      >下一步</n-button
    >
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { NForm, NFormItem, NButton } from 'naive-ui'
import { fromSourcesConfig } from '@/configs/verifyForm'
import { Tag } from '@vicons/carbon'
import countries from '@/configs/countries'
import { useForm } from '@/use/useForm'
import { values, get } from 'lodash-es'

const { fieldTypeComponent, verifyForm } = useForm()
const formRef = ref(null)

const emits = defineEmits(['complete'])

const formData = reactive({
  name: null,
  from: null,
  country: null,
})

const formRules = {
  name: {
    required: true,
    message: 'Please input your number',
    trigger: ['input'],
  },
  from: {
    required: true,
    message: 'Please input your number',
    trigger: ['input'],
  },
  reason: {
    required: true,
    message: 'Please input your number',
    trigger: ['input'],
  },
  country: {
    required: true,
    message: 'Please input your number',
    trigger: ['input'],
  },
}

const fields = computed(() => [
  {
    label: '避難者 ID',
    key: 'name',
    type: 'text',
  },
  {
    label: '路徑來源',
    key: 'from',
    type: 'select',
    placeholder: '選擇來源',
    options: values(fromSourcesConfig),
  },
  {
    label: '避難原因',
    key: 'reason',
    type: 'select',
    placeholder: '選擇來源',
    options: values(fromSourcesConfig),
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
