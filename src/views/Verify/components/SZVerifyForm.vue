<template>
  <div class="sz-verify-form">
    <n-form
      class="grid grid-cols-2 gap-[20px]"
      ref="formRef"
      :model="formData"
      :rules="formRules"
    >
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
    </n-form>
    <n-button block type="primary" @click="onVerify" :loading="verifying">
      Verify
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { NForm, NFormItem, NButton } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'
import { useForm } from '@/use/useForm'
// config
import countries from '@/configs/countries'
import fromSources from '@/configs/fromSources'
// types
import type { FormInst } from 'naive-ui'
import type { SZVerifyFormDataStruc } from '../types'

const emits = defineEmits(['submit'])
defineProps<{
  verifying: boolean
}>()

const oauthStore = useOauthStore()
const { fieldTypeComponent, verifyForm } = useForm()
const formRef = ref<FormInst | null>()

const fields = ref([
  {
    label: 'Discord ID',
    key: 'id',
    type: 'text',
    disabled: true,
  },
  {
    label: 'Name',
    key: 'name',
    type: 'text',
    disabled: true,
  },
  {
    label: '地區',
    key: 'country',
    type: 'select',
    filterable: true,
    placeholder: '搜尋選擇地區',
    options: countries.map((country) => ({ label: country, value: country })),
  },
  {
    label: '來源',
    key: 'from',
    type: 'select',
    placeholder: '選擇來源',
    options: fromSources,
  },
])

const formData = reactive<SZVerifyFormDataStruc>({
  id: null,
  name: null,
  country: null,
  from: null,
})

const formRules = computed(() => {
  return {
    id: { required: true },
    name: { required: true },
    country: { required: true, trigger: 'blur' },
    from: { required: true, trigger: 'blur' },
  }
})

const onVerify = async () => {
  const [, formError] = await verifyForm(formRef)
  if (formError) return
  emits('submit', formData)
}

const syncData = () => {
  const discordId = get(oauthStore, 'user.discord.id')
  const discordName = get(oauthStore, 'user.discord.username')
  formData.id = discordId
  formData.name = discordName
}

onMounted(() => {
  syncData()
})
</script>

<style scoped lang="postcss"></style>
