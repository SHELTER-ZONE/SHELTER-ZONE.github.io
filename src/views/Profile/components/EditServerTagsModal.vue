<template>
  <BaseModal
    v-model:show="showModal"
    :on-update:show="updateModalShow"
    :close-on-esc="false"
    :mask-closable="false"
  >
    <div class="f-col gap-[20px] min-w-[300px]">
      <p class="modal-title">
        <n-icon><Edit /></n-icon>
        編輯伺服器身分標籤
      </p>

      <n-divider class="!m-0" />

      <main>
        <n-form :model="formData" ref="formRef" :rules="formRules">
          <ServerTagSelector
            v-model:value="formData.mainRole"
            title="主要身分"
            :roles="mainRoles"
            formItemPath="mainRole"
            @change="onRoleSelect"
          />

          <ServerTagSelector
            v-model:value="formData.otherRoles"
            title="其他身分 (不顯示在 Profile 上)"
            :roles="otherRoles"
            :multiple="true"
            @change="onRoleSelect"
          />
        </n-form>
      </main>

      <footer class="grid grid-cols-2 gap-[10px]">
        <BaseButton @click="updateModalShow(false)"> 取消 </BaseButton>
        <BaseButton :loading="loading" type="primary" @click="onConfirm">
          更新
        </BaseButton>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import ServerTagSelector from './ServerTagSelector.vue'
import { get, map, intersection } from 'lodash-es'
import { useMessage, NForm, NIcon, NDivider } from 'naive-ui'
import { Edit } from '@vicons/carbon'
import { reactive, ref, computed, onMounted } from 'vue'
import { useFetch } from '@/use/useFetch'
import { useSZUser } from '@/use/useSZUser'
import { useForm } from '@/use/useForm'
import { useModal } from '@/use/useModal'
import { ChangeServerRoles } from '@/api/discord'
import BaseModal from '@/components/Modal/BaseModal.vue'
import notifyMessage from '@/configs/notifyMessage'
import { useOauthStore } from '@/stores/oauth'
import { useSZGuild } from '@/stores/szGuild'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/BaseButton.vue'
import type { APIGuildMember } from 'discord-api-types/v10'

const emits = defineEmits(['close'])

export interface EditServerTagsModalProps {
  dcMember: APIGuildMember | null
}

const props = defineProps<EditServerTagsModalProps>()

const { updateModalShow, showModal } = useModal(emits)

const { fetchData } = useFetch()
const { userDCUser } = useSZUser()
const { verifyForm, clearFormvalidation } = useForm()
const message = useMessage()

const oauthStore = useOauthStore()
const curMemberRoles = computed(() => get(props.dcMember, 'roles'))

const szGuildStore = useSZGuild()
const { serverConfig } = storeToRefs(szGuildStore)

const loading = ref<boolean>(false)
const formRef = ref(null)

const formData = reactive({
  mainRole: null,
  otherRoles: [],
})

const formRules = {
  mainRole: {
    required: true,
    trigger: 'change',
  },
}

const mainRoles = computed(() => get(serverConfig.value, 'roles.mainRoles'))
const otherRoles = computed(() =>
  get(serverConfig.value, 'roles.optionalRoles'),
)

const syncRoleData = (type: 'main' | 'optional') => {
  if (type === 'main') {
    const roles = intersection(map(mainRoles.value, 'id'), curMemberRoles.value)
    if (!roles?.length) return null
    return get(roles, '[0]')
  }
  if (type === 'optional') {
    return intersection(map(otherRoles.value, 'id'), curMemberRoles.value)
  }
}

const onConfirm = async () => {
  if (loading.value) return
  loading.value = true

  const [, noPass] = await verifyForm(formRef)
  if (noPass) {
    loading.value = false
    return
  }

  await fetchData(
    ChangeServerRoles,
    {
      discordId: get(userDCUser.value, 'id'),
      roles: [formData.mainRole, ...formData.otherRoles],
    },
    async () => {
      message.success(notifyMessage.updateSuccess)
      try {
        await oauthStore.findMeDCMember()
      } catch (error: any) {
        message.error(error)
      }
      updateModalShow(false)
    },
    null,
    { toastError: true },
  )
  loading.value = false
}

const onRoleSelect = () => {
  clearFormvalidation(formRef)
}

onMounted(() => {
  showModal.value = true
  formData.mainRole = syncRoleData('main')
  formData.otherRoles = syncRoleData('optional')
})
</script>

<style scoped lang="postcss">
.modal-title {
  @apply text-action text-md flex items-center gap-[7px];
}
</style>
