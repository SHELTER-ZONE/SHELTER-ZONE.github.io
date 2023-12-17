<template>
  <n-modal>
    <div class="modal-wrapper">
      <div class="modal-container">
        <header class="modal-header">
          <div class="f-row gap-[10px]">
            <n-icon size="24"><Help /></n-icon>
            <p class="modal-title">收不到驗證碼</p>
          </div>
          <n-button text @click="$emit('close')">
            <n-icon size="30"><Close /></n-icon>
          </n-button>
        </header>

        <div class="modal-content">
          <h3 class="font-medium text-md">請檢查伺服器隱私設定</h3>
          <p>點擊 SHELTER ZONE > 隱私設定</p>
          <img src="@/assets/otp/otp_help_1.webp" alt="otp_help_1 image" />
          <p>請確認圖片中兩個訊息的相關設定</p>
          <img src="@/assets/otp/otp_help_2.webp" alt="otp_help_2 image" />
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NIcon, NButton } from 'naive-ui'
import { Close, Help } from '@vicons/carbon'
</script>

<style scoped lang="postcss">
.modal-wrapper {
  @apply p-[20px];
}

.modal-container {
  @apply bg-primary-bg rounded-[10px];
  @apply p-[20px] overflow-hidden m-auto;
}

.modal-header {
  @apply flex justify-between mb-[20px];
}
.modal-title {
  @apply text-lg;
}

.modal-content {
  @apply overflow-hidden overflow-y-auto max-h-[500px];
  @apply text-left text-normal;

  img {
    @apply max-w-[400px] w-full py-[15px];
  }
}
</style>
