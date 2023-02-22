<template>
  <nav class="navbar">
    <SZBlockContainer>
      <div class="nav-wrapper">
        <n-scrollbar x-scrollable>
          <div class="nav-items-list">
            <!-- <p v-for="route in routes" :key="route.name">{{ route.name }}</p> -->
            <p v-for="index in 40" :key="index">test</p>
          </div>
        </n-scrollbar>
        <n-button @click="login">登入</n-button>
      </div>
    </SZBlockContainer>
  </nav>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NButton, NScrollbar } from 'naive-ui'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useOauthStore } from '@/stores/oauth'

const router = useRouter()
const { getDCAuthorizeUrl } = useOauthStore()
const routes = computed(() => router.options.routes)

const login = async () => {
  const url = await getDCAuthorizeUrl()
  if (!url) return
  window.location = url
}
</script>

<style scoped lang="postcss">
.navbar {
  @apply absolute top-0 left-0 right-0 z-10;
}

.nav-wrapper {
  @apply flex justify-between items-center gap-[30px];
}

.nav-items-list {
  @apply flex gap-[10px];
}
</style>
