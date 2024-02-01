<template>
  <BaseModal v-model:show="showModal" :on-update:show="updateModalShow" :close-on-esc="false" :mask-closable="false">
    <header class="modal-header">
      <n-icon :size="40" color="var(--danger)">
        <Warning />
      </n-icon>
    </header>
    <main class="modal-content">
      <p>Oops, 伺服器主機所在位置網路掛了 (x __ x)</p>
      <p>因此相關服務目前無法使用，造成您的不便</p>
      <p>還有請稍後再試</p>
    </main>
    <footer class="flex justify-center">
      <BaseButton type="primary" @click="updateModalShow(false)">繼續瀏覽</BaseButton>
    </footer>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/Modal/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import { NIcon } from 'naive-ui'
import { Warning } from '@vicons/carbon'
import { useModal } from '@/use/useModal'
import { onMounted } from 'vue'

const emits = defineEmits(['close'])

const { showModal, updateModalShow } = useModal(emits)

onMounted(() => {
  showModal.value = true
})
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
