<template>
  <div class="complete-register">
    <section class="f-col-center gap-[10px]">
      <n-icon size="48" color="var(--primary)"><CheckmarkOutline /></n-icon>
      <p class="font-bold text-lg">驗證成功</p>
    </section>

    <section>
      <div
        class="f-row-center unlock-item"
        v-for="item in unlockItems"
        :key="item.key"
      >
        <n-icon size="24" color="var(--primary)"><Unlocked /></n-icon>
        <p>{{ item.content }}</p>
      </div>
    </section>

    <RouterLink :to="{ name: 'Profile' }">
      <n-button secondary type="info">前往個人避難所</n-button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { NButton, NIcon } from 'naive-ui'
import { Unlocked, CheckmarkOutline } from '@vicons/carbon'

const unlockItems = [
  { key: 'discord', content: '已解鎖 Discord 頻道' },
  { key: 'profile', content: '已解鎖個人避難所' },
]
</script>

<style scoped lang="postcss">
.complete-register {
  @apply flex flex-col items-center justify-between gap-[30px];
}

.unlock-item {
  @apply justify-start gap-[10px] py-[5px] font-bold;
}
</style>
