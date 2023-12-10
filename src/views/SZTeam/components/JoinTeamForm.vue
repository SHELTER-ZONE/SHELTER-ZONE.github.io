<template>
  <section>
    <n-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      class="text-left"
      @submit.prevent
      @keypress.self.enter.prevent
    >
      <n-form-item label="申請加入團隊" path="joinTeam">
        <n-select
          v-model:value="formData.joinTeam"
          :options="teamOptions"
          :render-label="renderLabel"
        />
      </n-form-item>
      <n-form-item label="自我介紹 (可使用 discord 語法)" path="content">
        <n-input
          v-model:value="formData.content"
          type="textarea"
          :autosize="{ minRows: 5 }"
          :placeholder="introPlaceholder"
        />
      </n-form-item>
    </n-form>

    <BaseButton type="info" border @click="onSubmit" :disabled="!user.sz">
      <template #icon v-if="user.sz">
        <MailAll />
      </template>
      {{ user.sz ? '送出申請' : '請先登入' }}
    </BaseButton>
  </section>
</template>

<script setup lang="ts">
import {
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NIcon,
  useMessage,
  type FormRules,
} from 'naive-ui'
import {
  teamTypesConfig,
  teamTypeIconConfig,
  teamTypeColorConfig,
} from '@/configs/team'
import { map, find, get } from 'lodash-es'
import BaseButton from '@/components/BaseButton.vue'
import {
  h,
  type Component,
  type VNodeChild,
  computed,
  ref,
  reactive,
} from 'vue'
import { sendJoinSZTeamForm } from '@/api/form'
import { storeToRefs } from 'pinia'
import { MailAll } from '@vicons/carbon'
import { useOauthStore } from '@/stores/oauth'
import { checkForm } from '@/utils/helper'

interface TeamOption {
  label: string
  value: string
  icon: Component
  color: string
}

const oauthStore = useOauthStore()
const message = useMessage()

const formData = reactive({
  joinTeam: null,
  content: null,
})
const { user } = storeToRefs(oauthStore)
const formRules = computed(() => {
  const rules = {
    joinTeam: { required: true, trigger: ['change'] },
    content: { required: true, trigger: ['input'] },
  }
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
    // discordId: get(user.value, 'sz.discordId'),
    joinTeam: formData.joinTeam,
    content: formData.content,
  }
})

const onSubmit = async () => {
  if (!(await checkForm(formRef.value))) return
  const [, errMsg]: any = await sendJoinSZTeamForm(submitData.value)
  if (errMsg) {
    console.log(errMsg.message || errMsg)
    message.error(errMsg.message || errMsg)
    return
  }
  message.success('✅ 送出申請成功！')
}
</script>

<style scoped lang="postcss"></style>
