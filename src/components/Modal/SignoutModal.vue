<template>
  <BaseModal v-model:show="showModal" :trap-focus="false">
    <header class="modal-header">
      <n-icon :size="20"><Logout /></n-icon>
    </header>
    <main class="modal-content">確認登出？</main>
    <footer class="modal-footer">
      <SHButton class="flex-1" secondary @click="onCancel">取消</SHButton>
      <SHButton
        class="flex-1"
        secondary
        type="error"
        :loading="loading"
        @click="onSignout"
      >
        登出
      </SHButton>
    </footer>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { SHButton } from '@proladon/shelter-ui'
import { NIcon, useMessage } from 'naive-ui'
import { Logout } from '@vicons/carbon'
import { useAppStore } from '@/stores/app'
import { useOauthStore } from '@/stores/oauth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { setSignal, signals } = useAppStore()
const { clearUser } = useOauthStore()
const router = useRouter()

const loading = ref(false)
const message = useMessage()

const showModal = computed({
  get() {
    return signals.signoutConfirm
  },
  set(show) {
    setSignal('signoutConfirm', show)
  },
})
const onCancel = () => {
  setSignal('signoutConfirm', false)
}

const onSignout = async () => {
  loading.value = true
  clearUser()
  message.info('已成功登出！')
  router.replace({ name: 'Home' })
  setSignal('signoutConfirm', false)
}
</script>

<style scoped lang="postcss">
.modal-header {
  @apply flex justify-center;
}

.modal-content {
  @apply min-w-[200px];
  @apply mt-[10px] mb-[20px] text-center;
}

.modal-footer {
  @apply flex justify-center items-center gap-[20px];
}
</style>
