<template>
  <div class="sz-verify-form">
    <div>
      <n-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        class="flex flex-col gap-[20px]"
      >
        <section>
          <SZBlockContainer>
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
          </SZBlockContainer>
        </section>

        <section>
          <n-form-item>
            <CheckBoxArea
              class="w-full"
              v-model:value="formData.roles"
              title="身份組"
              titlePosition="center"
              :options="szRoleOptions"
            />
          </n-form-item>
        </section>

        <!-- <section class="flex justify-center">
          <HCaptcha />
        </section> -->

        <section>
          <n-button
            block
            type="primary"
            @click="onVerify"
            :loading="isSubmitting"
          >
            Verify
          </n-button>
        </section>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { NForm, NFormItem, NButton, useMessage } from 'naive-ui'
import { get } from 'lodash-es'
import { useForm } from '@/use/useForm'
import { createSZUser } from '@/api/szUser'
import { createSZUserProfile } from '@/api/szUserProfile'
// stores
import { useSZGuild } from '@/stores/szGuild'
import { useOauthStore } from '@/stores/oauth'
// components
import CheckBoxArea from '@/components/CheckBoxArea/CheckBoxArea.vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
// import HCaptcha from '@/components/HCaptcha/HCaptcha.vue'
// config
import countries from '@/configs/countries'
import fromSources from '@/configs/fromSources'
// types
import type { FormInst } from 'naive-ui'
import type { SZVerifyFormData, SZVerifyFormDataStruc } from './types'
import type { CheckBoxOption } from '@/components/CheckBoxArea/types'
// 3rd
import { useAsyncState } from '@vueuse/core'

// use
const oauthStore = useOauthStore()
const szGuildStore = useSZGuild()
const { fieldTypeComponent, verifyForm } = useForm()
const { success: successMsg, error: errorMsg } = useMessage()

// data
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
  roles: [],
})

const formRules = computed(() => {
  return {
    id: { required: true },
    name: { required: true },
    country: { required: true, trigger: 'blur' },
    from: { required: true, trigger: 'blur' },
  }
})

const szRoleOptions = computed<CheckBoxOption[]>(() => {
  const roles = szGuildStore.openRoles
  return roles.map((role) => ({ label: role.name, value: role.id }))
})

// methods
const handleRegisterError = (type: string, error: unknown) => {
  console.log(error)
  if (type === 'userError') {
    throw new Error('User Error Occurred.')
  } else if (type === 'userProfileError') {
    throw new Error('User Profile Error Occurred.')
  }
  throw new Error('Unhandle Error Occurred.')
}

const registerSZUser = async (data: SZVerifyFormData) => {
  const [, userError]: any = await createSZUser({
    userId: data.id,
    type: 'user',
  })
  if (userError) handleRegisterError('userError', userError)
  const [, userProfileError]: any = await createSZUserProfile({
    userId: data.id,
    name: data.name,
    country: data.country,
    from: data.from,
  })
  if (userProfileError)
    handleRegisterError('userProfileError', userProfileError)
}

const { isLoading: isSubmitting, execute: executeRegister } = useAsyncState(
  registerSZUser,
  null,
)

const onVerify = async () => {
  const [, formError] = await verifyForm(formRef)
  if (formError) return
  try {
    await executeRegister(0, formData)
    successMsg('認證成功!')
  } catch (error: any) {
    errorMsg(error)
  }
}

const syncData = () => {
  const discordId = get(oauthStore, 'user.discord.id')
  const discordName = get(oauthStore, 'user.discord.username')
  formData.id = discordId
  formData.name = discordName
}

onMounted(() => {
  szGuildStore.GetOpenRoles()
  syncData()
})
</script>

<style scoped lang="postcss">
.sz-verify-form {
  @apply full py-[100px];
  @apply flex flex-col justify-center items-center;
}
</style>
