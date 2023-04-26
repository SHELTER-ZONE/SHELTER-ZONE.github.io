<template>
  <BaseModal v-model:show="showModal" :trap-focus="false">
    <header class="modal-header">
      <n-icon :size="20"><Login /></n-icon>
    </header>
    <main class="modal-content">尚未登入，請登入以繼續前往</main>
    <footer class="modal-footer">
      <n-button class="flex-1" ghost @click="onCancel">取消</n-button>
      <n-button
        class="flex-1"
        ghost
        type="primary"
        :loading="loading"
        @click="onSignin"
      >
        登入
      </n-button>
    </footer>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { NButton, NIcon } from 'naive-ui'
import { Login } from '@vicons/carbon'
import { useAppStore } from '@/stores/app'
import { useOauthStore } from '@/stores/oauth'
import { computed, ref } from 'vue'

const { setSignal, signals } = useAppStore()
const { signin } = useOauthStore()

const loading = ref(false)

const showModal = computed({
  get() {
    return signals.requestSignin
  },
  set(show) {
    setSignal('requestSignin', show)
  },
})
const onCancel = () => {
  setSignal('requestSignin', false)
}

const onSignin = async () => {
  try {
    loading.value = true
    await signin()
  } catch (error) {
    loading.value = false
  }
}
</script>

<style scoped lang="postcss">
.modal-header {
  @apply flex justify-center;
}

.modal-content {
  @apply mt-[10px] mb-[20px] text-center;
}

.modal-footer {
  @apply flex justify-center items-center gap-[20px];
}
</style>
