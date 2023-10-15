<template>
  <div class="processing-register">
    <n-collapse-transition appear :show="true">
      <SZBlockContainer class="process-info-wrapper">
        <StackInfo v-model:value="stack" class="flex-1" />
      </SZBlockContainer>
    </n-collapse-transition>

    <n-collapse-transition appear :show="true" v-if="showCloseBtn">
      <SZBlockContainer>
        <p class="text-center">Error</p>
        <section
          class="my-[30px] flex gap-[10px] items-center justify-center text-danger"
        >
          <n-icon color="var(--danger)"><CloseFilled /></n-icon>
          <p>{{ errorMsg }}</p>
        </section>

        <section class="flex justify-center gap-[10px]">
          <n-button @click="emits('close')" ghost type="error">
            回報錯誤
          </n-button>
          <n-button @click="emits('close')" ghost type="primary">
            返回表單
          </n-button>
        </section>
      </SZBlockContainer>
    </n-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { useStackInfo } from '@/use/useStackInfo'
import { NButton, NIcon, NCollapseTransition } from 'naive-ui'
import { CloseFilled } from '@vicons/carbon'
// api
import { createSZUserProfile } from '@/api/szUserProfile'
import { updateMember, findMember } from '@/api/bot'
// types
import type { SZVerifyFormData, SZVerifyFormDataStruc } from '../types'
import { get, uniq } from 'lodash-es'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { useSZGuild } from '@/stores/szGuild'

const props = defineProps<{
  formData: SZVerifyFormDataStruc
}>()
const emits = defineEmits(['close'])

const router = useRouter()
const { stack, changeStackInfo, pushStackInfo } = useStackInfo()
const oauthStore = useOauthStore()
const szGuildStore = useSZGuild()

const showCloseBtn = ref(false)
const errorMsg = ref<string>('')

const emitError = (stackId: string, msg: string) => {
  changeStackInfo(stackId, 'error')
  errorMsg.value = msg
  setTimeout(() => {
    showCloseBtn.value = true
  }, 500)
  throw msg
}

const registerSZUserProfile = async (data: SZVerifyFormData) => {
  pushStackInfo({
    name: '建立 SZ User Profile',
    id: 'creating-sz-user-profile',
  })
  const [, err]: any = await createSZUserProfile({
    userId: data.id,
    name: data.name,
    country: data.country,
    from: data.from,
  })
  if (err) {
    if (err.code === 'PROFILE_EXIST') {
      changeStackInfo('creating-sz-user-profile', 'resolve')
      return
    } else emitError('creating-sz-user-profile', err.message)
  }
  changeStackInfo('creating-sz-user-profile', 'resolve')
}

const getServerMemberRoles = async (userId: string) => {
  const [member, err]: any = await findMember(userId)
  if (err) throw err
  return member.roles
}

const giveMemberRoles = async (roles: string[]) => {
  pushStackInfo({
    name: '設定使用者 Discord Server Roles',
    id: 'setting-user-dc-roles',
  })
  const userId = get(oauthStore.user, 'discord.id')
  try {
    const memberRoles = await getServerMemberRoles(userId)
    roles.push(...memberRoles)
    roles.push(szGuildStore.registeredRole) // 加上已註冊身份
    roles = uniq(roles)
    const [, err]: any = await updateMember({
      userId,
      payload: { roles },
    })
    if (err) emitError('setting-user-dc-roles', err.message)
    changeStackInfo('setting-user-dc-roles', 'resolve')
  } catch (error: any) {
    emitError('setting-user-dc-roles', error.message)
  }
}

const processRegister = async (data: SZVerifyFormData) => {
  await registerSZUserProfile(data)
  // await oauthStore.findSZUser()
  await giveMemberRoles(data.roles)

  pushStackInfo({
    name: 'SZ 認證完成',
    id: 'sz-verify-success',
    state: 'resolve',
  })

  pushStackInfo({
    name: '頁面跳轉中',
    id: 'page-redirecting',
  })

  setTimeout(() => {
    router.push({ name: 'profile' })
  }, 1500)
}

onMounted(async () => {
  const formData = props.formData as SZVerifyFormData
  setTimeout(() => {
    processRegister(formData)
  }, 300)
})
</script>

<style scoped lang="postcss">
.processing-register {
  @apply flex flex-col gap-[30px];
}
.process-info-wrapper {
  @apply min-h-[200px];
  @apply flex flex-col;
}
</style>
