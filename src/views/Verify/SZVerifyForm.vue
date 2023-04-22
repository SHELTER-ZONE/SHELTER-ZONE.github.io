<template>
  <div class="sz-verify-form">
    <div v-show="!registering">
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

    <ProcessingRegister v-if="registering" :formData="formData"  @error="registering = false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { NForm, NFormItem, NButton } from 'naive-ui'
import { get } from 'lodash-es'
import { useForm } from '@/use/useForm'
// stores
import { useSZGuild } from '@/stores/szGuild'
import { useOauthStore } from '@/stores/oauth'
// components
import CheckBoxArea from '@/components/CheckBoxArea/CheckBoxArea.vue'
import ProcessingRegister from './components/ProcessingRegister.vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
// import HCaptcha from '@/components/HCaptcha/HCaptcha.vue'
// config
import countries from '@/configs/countries'
import fromSources from '@/configs/fromSources'
// types
import type { FormInst } from 'naive-ui'
import type { SZVerifyFormDataStruc } from './types'
import type { CheckBoxOption } from '@/components/CheckBoxArea/types'

// use
const oauthStore = useOauthStore()
const szGuildStore = useSZGuild()
const { fieldTypeComponent, verifyForm } = useForm()


// data
const registering = ref(false)
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
const onVerify = async () => {
  const [, formError] = await verifyForm(formRef)
  if (formError) return
  registering.value = true
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
