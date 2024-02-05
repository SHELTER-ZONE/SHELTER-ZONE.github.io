<template>
  <BaseModal
    class="edit-social-links-modal"
    v-model:show="showModal"
    :on-update:show="updateModalShow"
    :close-on-esc="false"
    :mask-closable="false"
    style="width: 500px"
  >
    <header>
      <p class="modal-title">
        <n-icon><Edit /></n-icon>
        編輯社群/自訂連結
      </p>
    </header>
    <main class="modal-content">
      <n-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        label-placement="top"
      >
        <n-form-item
          v-for="(config, idx) in formData.linksConfig"
          :key="`config-${idx}`"
          :show-feedback="false"
        >
          <template #label>
            <div class="f-row gap-[5px]">
              <n-icon :size="20">
                <component :is="get(socialLinkTypeIconConfigs, config.type)" />
              </n-icon>
              <p>{{ config.type === 'custom' ? 'Custom' : config.name }}</p>
            </div>
          </template>

          <div class="f-row w-full gap-[10px]">
            <n-form-item
              :show-label="false"
              :path="`linksConfig[${idx}].name`"
              class="w-[200px]"
            >
              <n-input
                clearable
                v-model:value="config.name"
                :disabled="config.type !== 'custom'"
              />
            </n-form-item>
            <n-form-item
              :show-label="false"
              :path="`linksConfig[${idx}].link`"
              class="w-full"
            >
              <div class="f-row w-full gap-[10px]">
                <n-input class="w-full" clearable v-model:value="config.link" />
                <BaseButton @click="removeLink(idx)">
                  <n-icon color="var(--danger)"><TrashCan /></n-icon>
                </BaseButton>
              </div>
            </n-form-item>
          </div>
        </n-form-item>
      </n-form>

      <div class="add-link-btns" v-if="formData.linksConfig.length < maxLinks">
        <BaseButton
          type="info"
          v-for="social in remainSocialTypeOptions"
          :key="social.value"
          @click="addLink(social.value)"
        >
          <template #icon><Add /></template>
          <div class="f-row gap-[5px]">
            <n-icon><component :is="social.icon" /></n-icon>
            {{ social.label }}
          </div>
        </BaseButton>
      </div>
      <n-divider v-if="formData.linksConfig.length < maxLinks" class="!m-0" />
    </main>
    <footer class="btn-container">
      <BaseButton class="w-[100px]" @click="updateModalShow(false)">
        取消
      </BaseButton>
      <BaseButton
        class="w-[100px]"
        :loading="loading"
        type="primary"
        @click="onConfirm"
      >
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
  NDivider,
  NForm,
  NFormItem,
  useMessage,
} from 'naive-ui'
import { Edit, Close, Add, TrashCan, Link } from '@vicons/carbon'
import { get, filter, map, includes, upperFirst, cloneDeep } from 'lodash-es'
import type { SocialLinkItem, SocialLinkType } from '@/api/szUserProfile'
import {
  githubUrlRegex,
  youtubeChannelUrlRegex,
  instagramUrlRegex,
  urlRegex,
} from '@/utils/validate'

const emits = defineEmits(['close'])
const oauthStore = useOauthStore()
const { szUserProfile } = storeToRefs(oauthStore)
const { updateModalShow, showModal } = useModal(emits)
const { clearFormvalidation, verifyForm } = useForm()
const message = useMessage()
const loading = ref<boolean>(false)
const maxLinks = 5
const formRef = ref(null)
const formRules = computed(() => {
  const data = {}
  for (const idx in formData.linksConfig) {
    const item = formData.linksConfig[idx]
    const key = `linksConfig[${idx}].link`
    let rules = {
      require: true,
      trigger: ['blur', 'input'],
    }
    if (item.type === 'github') {
      rules.validator = (rule, val) => githubUrlRegex(val)
      rules.message = '請輸入正確的 Github 個人網址'
    } else if (item.type === 'youtube') {
      rules.validator = (rule, val) => youtubeChannelUrlRegex(val)
      rules.message = '請輸入正確的 Youtube 個人網址'
    } else if (item.type === 'instagram') {
      rules.validator = (rule, val) => instagramUrlRegex(val)
      rules.message = '請輸入正確的 Instagram 個人網址'
    } else if (item.type === 'custom') {
      rules.validator = (rule, val) => urlRegex(val)
      rules.message = '請輸入正確的網址格式'
    }

    data[key] = rules
  }
  return data
})

const formData = reactive({
  linksConfig: [],
})

const remainSocialTypeOptions = computed(() => {
  const remainTypes = filter(
    socialLinksTypesConfig,
    (socialType: SocialLinkType) => {
      if (socialType === 'custom') return true
      return !includes(map(formData.linksConfig, 'type'), socialType)
    },
  )
  return map(remainTypes, (socialType: SocialLinkType) => {
    return {
      label: upperFirst(socialType),
      value: socialType,
      icon: get(socialLinkTypeIconConfigs, socialType),
    }
  })
})

const removeLink = (idx: number) => {
  formData.linksConfig.splice(idx, 1)
  clearFormvalidation(formRef)
}
const addLink = (socialType: SocialLinkType) => {
  if (formData.linksConfig.length === maxLinks) return
  formData.linksConfig.push({
    type: socialType,
    name: socialType === 'custom' ? null : upperFirst(socialType),
    link: null,
  })
}

const syncData = () => {
  formData.linksConfig = cloneDeep(get(szUserProfile.value, 'socialLinks'))
}

const onConfirm = async () => {
  loading.value = true
  try {
    const [pass] = await verifyForm(formRef)
    console.log('pass', pass)
    if (!pass) {
      loading.value = false
      return
    }
    const [, err] = await UpdateSZUserProfile({
      userProfileId: get(szUserProfile.value, 'id'),
      socialLinks: formData.linksConfig,
    })
    if (err) {
      loading.value = false
      message.error(err)
      return
    }
    await oauthStore.findMeSZUser()
    loading.value = false
    emits('close')
  } catch (error) {
    loading.value = false
    message.error(error)
  }
}

onBeforeMount(() => {
  syncData()
})

onMounted(() => {
  showModal.value = true
})
</script>

<style scoped lang="postcss">
.modal-title {
  @apply text-action text-md flex items-center gap-[7px] mb-[20px];
}

.edit-social-links-modal {
  @apply w-[500px];
}

.add-link-btns {
  @apply grid grid-cols-3 gap-[10px] py-[20px];
}

.btn-container {
  @apply flex items-center justify-end gap-[10px] pt-[20px];
}
</style>
