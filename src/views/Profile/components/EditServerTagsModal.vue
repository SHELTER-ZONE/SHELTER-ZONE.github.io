<template>
  <BaseModal>
    <div class="f-col gap-[20px]">
      <p>編輯伺服器標籤</p>

      <main></main>

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
import { get } from 'lodash-es'
import { NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useFetch } from '@/use/useFetch'
import { useSZUser } from '@/use/useSZUser'
import { ChangeServerRoles } from '@/api/discord'
import BaseModal from '@/components/Modal/BaseModal.vue'
import notifyMessage from '@/configs/notifyMessage'
import { useOauthStore } from '@/stores/oauth'

const emits = defineEmits(['close'])

const { fetchData } = useFetch()
const { userDCUser } = useSZUser()
const oauthStore = useOauthStore()
const message = useMessage()
const loading = ref<boolean>(false)

const onConfirm = async () => {
  if (loading.value) return
  loading.value = true
  await fetchData(
    ChangeServerRoles,
    {
      discordId: get(userDCUser.value, 'id'),
      roles: [],
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

<style scoped lang="postcss"></style>
