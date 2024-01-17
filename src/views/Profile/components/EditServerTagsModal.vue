<template>
  <BaseModal @update:show="onUpdateShow">
    <div class="f-col gap-[20px] min-w-[300px]">
      <p class="modal-title">
        <n-icon><Edit /></n-icon>
        編輯伺服器標籤
      </p>

      <n-divider class="!m-0" />

      <main>
        <n-form :model="formData" ref="formRef" :rules="formRules">
          <MainTechTagSelector v-model:formData="formData.mainTech" />
        </n-form>
      </main>

      <footer>
        <n-button
          :loading="loading"
          secondary
          type="primary"
          @click="onConfirm"
        >
          更新
        </n-button>
      </footer>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import MainTechTagSelector from './MainTechTagSelector.vue'
import { get } from 'lodash-es'
import { NButton, useMessage, NForm, NIcon, NDivider } from 'naive-ui'
import { Edit } from '@vicons/carbon'
import { reactive, ref } from 'vue'
import { useFetch } from '@/use/useFetch'
import { useSZUser } from '@/use/useSZUser'
import { useForm } from '@/use/useForm'
import { ChangeServerRoles } from '@/api/discord'
import BaseModal from '@/components/Modal/BaseModal.vue'
import notifyMessage from '@/configs/notifyMessage'
import { useOauthStore } from '@/stores/oauth'

const emits = defineEmits(['close'])

const { fetchData } = useFetch()
const { userDCUser } = useSZUser()
const { verifyForm } = useForm()
const oauthStore = useOauthStore()
const message = useMessage()
const loading = ref<boolean>(false)
const formRef = ref(null)

const formData = reactive({
  mainTech: null,
})

const formRules = {
  mainTech: {
    required: true,
  },
}

const onUpdateShow = (show: boolean) => {
  if (!show) {
    formData.mainTech = null
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
      roles: [formData.mainTech],
    },
    async () => {
      message.success(notifyMessage.updateSuccess)
      try {
        await oauthStore.findMeDCMember()
      } catch (error: any) {
        message.error(error)
      }
      emits('close')
    },
    undefined,
    { toastError: true },
  )
  loading.value = false
}
</script>

<style scoped lang="postcss">
.modal-title {
  @apply text-action text-md flex items-center gap-[7px];
}
</style>
