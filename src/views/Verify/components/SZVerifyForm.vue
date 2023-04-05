<template>
  <div class="sz-verify-form">
    <n-form class="grid grid-cols-2 gap-[20px]">
      <n-form-item
        v-for="field in fields"
        :key="field.key"
        :label="field.label"
      >
        <Component
          :is="fieldTypeComponent[field.type]"
          :disabled="field.disabled"
          v-model:value="formData[field.key]"
          :options="field.options"
        />
      </n-form-item>
    </n-form>
    <n-button block type="primary">Verify</n-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { NForm, NFormItem, NButton } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'
import { useForm } from '@/use/useForm'
import fromSources from '@/configs/fromSources'

const oauthStore = useOauthStore()
const { fieldTypeComponent } = useForm()

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
  },
  {
    label: '來源',
    key: 'from',
    type: 'select',
    options: fromSources,
  },
])

const formData = reactive({
  id: null,
  name: null,
  country: null,
  from: null,
})

onMounted(() => {
  const discordId = get(oauthStore, 'user.discord.id')
  const discordName = get(oauthStore, 'user.discord.username')
  formData.id = discordId
  formData.name = discordName
})
</script>

<style scoped lang="postcss"></style>
