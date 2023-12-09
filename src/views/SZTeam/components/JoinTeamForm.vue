<template>
  <section>
    <n-form
      ref="formRef"
      class="text-left"
      @submit.prevent
      @keypress.self.enter.prevent
    >
      <n-form-item label="申請加入團隊">
        <n-select :options="teamOptions" :render-label="renderLabel" />
      </n-form-item>
      <n-form-item label="自我介紹 (可使用 discord 語法)">
        <n-input
          type="textarea"
          :autosize="{ minRows: 5 }"
          :placeholder="introPlaceholder"
        />
      </n-form-item>
    </n-form>

    <BaseButton type="info" border @clcik="onSubmit">
      <template #icon>
        <MailAll />
      </template>
      送出申請
    </BaseButton>
  </section>
</template>

<script setup lang="ts">
import { NInput, NSelect, NForm, NFormItem, NIcon } from 'naive-ui'
import {
  teamTypesConfig,
  teamTypeIconConfig,
  teamTypeColorConfig,
} from '@/configs/team'
import { map, find, get } from 'lodash-es'
import BaseButton from '@/components/BaseButton.vue'
import { h, type Component, type VNodeChild } from 'vue'
import { sendJoinSZTeamForm } from '@/api/form'

import { MailAll } from '@vicons/carbon'
import { useOauthStore } from '@/stores/oauth'
import { computed } from 'vue'
import { reactive } from 'vue'
import { ref } from 'vue'

interface TeamOption {
  label: string
  value: string
  icon: Component
  color: string
}

const oauthStore = useOauthStore()

const formData = reactive({})

const formRules = computed(() => {
  const rules = {}
  return rules
})

const formRef = ref<HTMLElement | null>(null)

const teamOptions: TeamOption[] = map(teamTypesConfig, (item) => ({
  label: item.label,
  value: item.value,
  icon: get(teamTypeIconConfig, item.value),
  color: get(teamTypeColorConfig, item.value),
}))

const renderLabel = (option: TeamOption): VNodeChild => {
  return [
    h(
      NIcon,
      {
        style: {
          verticalAlign: '-0.15em',
          marginRight: '4px',
        },
      },
      {
        default: () => h(option.icon, { color: option.color }),
      },
    ),
    option.label as string,
  ]
}

const introPlaceholder = '請輸入自我介紹，'

const submitData = computed(() => {
  return {
    discordId: get(oauthStore.user, 'discord.id'),
    content: '',
  }
})

const onSubmit = async () => {
  await sendJoinSZTeamForm(submitData.value)
}
</script>

<style scoped lang="postcss"></style>
