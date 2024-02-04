<template>
  <BaseModal
    v-model:show="showModal"
    :on-update:show="updateModalShow"
    :close-on-esc="false"
    :mask-closable="false"
  >
    <header>
      <p class="modal-title">
        <n-icon><Edit /></n-icon>
        編輯社群/自訂連結
      </p>
    </header>
    <main class="modal-content">
      <n-form ref="formRef" :model="formData" :rules="formRules">
        <div
          class="f-row gap-[10px]"
          v-for="(config, idx) in linksConfig"
          :key="`config-${idx}`"
        >
          <n-select
            :options="remainSocialTypeOptions"
            :render-label="renderLabel"
            v-model:value="config.type"
          />
          <n-form-item>
            <n-input v-model:value="config.link" />
          </n-form-item>
          <n-button @click="removeLink(idx)">
            <n-icon color="var(--danger)"><TrashCan /></n-icon>
          </n-button>
        </div>
      </n-form>

      <div>
        <BaseButton type="info" @click="addLink">
          <template #icon><Add color="var(--action)" /></template>
          新增連結
        </BaseButton>
      </div>
    </main>
    <footer class="grid grid-cols-2 gap-[10px]">
      <BaseButton @click="updateModalShow(false)"> 取消 </BaseButton>
      <BaseButton :loading="loading" type="primary" @click="onConfirm">
        更新
      </BaseButton>
    </footer>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/Modal/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import {
  socialLinkTypeIconConfigs,
  socialLinksTypesConfig,
} from '@/configs/socialLinks'
import {
  NInput,
  NIcon,
  NButton,
  NForm,
  NFormItem,
  NSelect,
  type SelectOption,
} from 'naive-ui'
import { Edit, Close, Add, TrashCan } from '@vicons/carbon'
import { get, filter, map, includes, upperFirst } from 'lodash-es'
import type { SocialLinkItem } from '@/api/szUserProfile'
import type { VNodeChild } from 'vue'

const emits = defineEmits(['close'])

const oauthStore = useOauthStore()
const { szUserProfile } = storeToRefs(oauthStore)
const { updateModalShow, showModal } = useModal(emits)

const loading = ref<boolean>(false)
const linksConfig = ref<SocialLinkItem[]>([])
const formRef = ref(null)
const formData = reactive({
  linksConfig: [],
})
const formRules = computed(() => {
  return {}
})

const remainSocialTypeOptions = computed(() => {
  const remainTypes = filter(socialLinksTypesConfig, (socialType: string) => {
    if (socialType === 'custom') return true
    return !includes(map(linksConfig.value, 'type'), socialType)
  })
  return map(remainTypes, (socialType: string) => {
    return {
      label: upperFirst(socialType),
      value: socialType,
    }
  })
})

const renderLabel = (option: SelectOption): VNodeChild => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      },
    },
    {
      default: () => [
        h(NIcon, null, {
          default: () =>
            h(get(socialLinkTypeIconConfigs, option.value as string)),
        }),
        option.label as string,
      ],
    },
  )
}

const displayStaticSocialTypes = map(
  filter(socialLinksTypesConfig, (i: string) => i !== 'custom'),
  (socialType: string) => ({
    type: socialType,
    icon: get(socialLinkTypeIconConfigs, socialType),
  }),
)

const removeLink = (idx: number) => {
  linksConfig.value.splice(idx, 1)
}
const addLink = () => {
  linksConfig.value.push({
    type: 'custom',
    name: null,
    link: null,
  })
}

const onConfirm = async () => {
  await UpdateSZUserProfile({
    userProfileId: get(szUserProfile.value, 'id'),
    socialLinks: [],
  })
}

onMounted(() => {
  showModal.value = true
})
</script>

<style scoped lang="postcss"></style>
