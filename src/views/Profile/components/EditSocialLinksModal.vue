<template>
  <BaseModal
    class="edit-social-links-modal"
    v-model:show="showModal"
    :on-update:show="updateModalShow"
    :close-on-esc="false"
    :mask-closable="false"
    style="max-width: 500px; width: 100%"
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
        class="flex flex-col gap-[20px]"
      >
        <SZBlockContainer
          v-for="(config, idx) in formData.linksConfig"
          :key="`config-${idx}`"
        >
          <div
            class="flex justify-between w-full items-center pb-[20px] text-primary"
          >
            <div class="f-row gap-[5px]">
              <n-icon :size="20">
                <component :is="get(socialLinkTypeIconConfigs, config.type)" />
              </n-icon>
              <p>{{ config.type === 'custom' ? 'Custom' : config.name }}</p>
            </div>
            <BaseButton @click="removeLink(idx)">
              <n-icon color="var(--danger)"><TrashCan /></n-icon>
            </BaseButton>
          </div>

          <n-form-item :show-feedback="false" :show-label="false">
            <div class="flex flex-col w-full">
              <!-- 名稱輸入 -->
              <n-form-item
                :show-label="false"
                :path="`linksConfig[${idx}].name`"
              >
                <n-input
                  clearable
                  placeholder="請輸入連結名稱"
                  maxlength="20"
                  :show-count="config.type === 'custom'"
                  v-model:value="config.name"
                  :disabled="config.type !== 'custom'"
                />
              </n-form-item>

              <!-- 連結輸入 -->
              <n-form-item
                :show-label="false"
                :path="`linksConfig[${idx}].link`"
                class="w-full"
              >
                <div class="f-row w-full gap-[10px] justify-between">
                  <n-input
                    v-if="config.type === 'custom'"
                    placeholder="請輸入"
                    clearable
                    maxlength="250"
                    show-count
                    v-model:value="config.link"
                    class="w-full"
                  />

                  <div v-else class="flex flex-col w-full gap-[5px]">
                    <p class="truncate" v-if="templateLinkPrefix(config.type)">
                      {{ templateLinkPrefix(config.type) }}
                    </p>
                    <n-input
                      v-model:value="config.link"
                      clearable
                      placeholder="請輸入"
                    />
                    <p v-if="templateLinkPrefix(config.type)">
                      {{ templateLinkSuffix(config.type) }}
                    </p>
                  </div>
                </div>
              </n-form-item>
            </div>
          </n-form-item>
        </SZBlockContainer>
      </n-form>

      <n-divider v-if="formData.linksConfig.length < maxLinks" class="!m-0" />
    </main>
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
import AreaBlock from '@/components/AreaBlock.vue'
import BaseButton from '@/components/BaseButton.vue'
import {
  socialLinkTypeIconConfigs,
  socialLinksTypesConfig,
  socialLinkTemplateConfigs,
} from '@/configs/socialLinks'
import {
  NInput,
  NIcon,
  NDivider,
  NForm,
  NFormItem,
  useMessage,
  type FormItemRule,
} from 'naive-ui'
import { Edit, Add, TrashCan } from '@vicons/carbon'
import {
  get,
  filter,
  map,
  includes,
  upperFirst,
  replace,
  trimStart,
  trimEnd,
  cloneDeep,
} from 'lodash-es'
import type { SocialLinkType, SocialLinkItem } from '@/api/szUserProfile'
import { urlRegex } from '@/utils/validate'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'

const emits = defineEmits(['close'])
const oauthStore = useOauthStore()
const { szUserProfile } = storeToRefs(oauthStore)
const { updateModalShow, showModal } = useModal(emits)
const { clearFormvalidation, verifyForm } = useForm()
const message = useMessage()
const loading = ref<boolean>(false)
const maxLinks = 5

const formRef = ref(null)
const formData = reactive({
  linksConfig: [],
})
const formRules = computed(() => {
  const data = {}
  for (const idx in formData.linksConfig) {
    const item: SocialLinkItem = formData.linksConfig[idx]
    const linkKey = `linksConfig[${idx}].link`
    const nameKey = `linksConfig[${idx}].name`
    let rules: FormItemRule = {
      required: true,
      trigger: ['blur', 'input'],
    }
    if (item.type === 'custom') {
      data[nameKey] = {
        required: true,
        trigger: ['blur', 'input'],
        message: '請輸入連結名稱',
      }
      rules.validator = (rule, val) => urlRegex(val)
      rules.message = '請輸入正確的網址格式'
    } else {
      rules.message = '請輸入'
    }

    data[linkKey] = rules
  }
  return data
})

const templateLinkPrefix = computed(() => {
  return (type: Exclude<SocialLinkType, 'custom'>) => {
    return get(socialLinkTemplateConfigs, `${type}.prefix`)
  }
})
const templateLinkSuffix = computed(() => {
  return (type: Exclude<SocialLinkType, 'custom'>) => {
    return get(socialLinkTemplateConfigs, `${type}.suffix`)
  }
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
  const socialLinks = map(
    get(toValue(szUserProfile), 'socialLinks'),
    (item: SocialLinkItem) => {
      if (item.type !== 'custom') {
        const linkPrefix = get(
          socialLinkTemplateConfigs,
          `${item.type}.prefix`,
          '',
        )
        const linkSuffix = get(
          socialLinkTemplateConfigs,
          `${item.type}.suffix`,
          '',
        )

        item.link = replace(item.link as string, linkPrefix, '')
        item.link = replace(item.link as string, linkSuffix, '')
      }
      item.link = trimStart(trimEnd(item.link as string))
      return item
    },
  )

  formData.linksConfig = cloneDeep(socialLinks)
}

const submitData = computed(() => {
  return map(formData.linksConfig, (item: SocialLinkItem) => {
    if (item.type !== 'custom') {
      const linkPrefix = get(
        socialLinkTemplateConfigs,
        `${item.type}.prefix`,
        '',
      )
      const linkSuffix = get(
        socialLinkTemplateConfigs,
        `${item.type}.suffix`,
        '',
      )
      item.link = `${linkPrefix}${item.link}${linkSuffix}`
    }
    item.link = trimStart(trimEnd(item.link as string))
    return item
  })
})

const onConfirm = async () => {
  loading.value = true
  try {
    const [pass] = await verifyForm(formRef)
    if (!pass) {
      loading.value = false
      return
    }
    const [, err] = await UpdateSZUserProfile({
      userProfileId: get(szUserProfile.value, 'id'),
      socialLinks: submitData.value,
    })
    if (err) {
      loading.value = false
      message.error(err)
      return
    }
    await oauthStore.findMeSZUser()
    loading.value = false
    message.success(notifyMessage.updateSuccess)
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

.add-link-btns {
  @apply flex flex-wrap gap-[10px] py-[20px];
}

.btn-container {
  @apply flex items-center justify-end gap-[10px] pt-[20px];
}

:deep(.n-form-item-label.n-form-item-label--right-mark) {
  @apply !w-full;
}
</style>
