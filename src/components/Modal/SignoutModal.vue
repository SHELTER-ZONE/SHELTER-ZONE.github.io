<template>
  <BaseModal v-model:show="showModal" :trap-focus="false">
    <header class="modal-header">
      <n-icon :size="20"><Logout /></n-icon>
    </header>
    <main class="modal-content">確認登出？</main>
    <footer class="modal-footer">
      <n-button class="flex-1" ghost @click="onCancel">取消</n-button>
      <n-button
        class="flex-1"
        ghost
        type="primary"
        :loading="loading"
        @click="onSignout"
      >
        登出
      </n-button>
    </footer>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { NButton, NIcon } from 'naive-ui'
import { Logout } from '@vicons/carbon'
import { useAppStore } from '@/stores/app'
import { useOauthStore } from '@/stores/oauth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { setSignal, signals } = useAppStore()
const { clearUser } = useOauthStore()
const router = useRouter()

const loading = ref(false)

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
  router.replace({ name: 'home' })
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
