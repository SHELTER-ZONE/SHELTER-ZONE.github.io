<template>
  <main class="error">
    <header class="flex flex-col items-center gap-10px">
      <n-icon size="50"><Warning /></n-icon>
      <p class="text-danger">Oops, Something went wrong</p>
    </header>

    <SZBlockContainer>
      <div class="error-content-wrapper">
        <div>{{ get(errorPageData, 'message') }}</div>
        <div>Code: {{ get(errorPageData, 'code') }}</div>

        <n-divider />

        <section class="grid grid-cols-2">
          <n-button
            secondary
            type="warning"
            :disabled="reported"
            @click="reportError"
          >
            <template #icon>
              <n-icon><Report /> </n-icon>
            </template>
            Report Error
          </n-button>

          <router-link :to="{ name: 'home' }" @click="resetErrorPageData">
            <n-button secondary type="primary">
              <template #icon>
                <n-icon><Home /> </n-icon>
              </template>
              Go Home
            </n-button>
          </router-link>
        </section>
      </div>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NIcon, NButton, NDivider } from 'naive-ui'
import { Warning } from '@vicons/carbon'
import { get } from 'lodash-es'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { Home, Report } from '@vicons/carbon'
import { useStorage } from '@vueuse/core'
import localStoreKey from '@/configs/localStoreKey'

const errorPageData = useStorage(
  localStoreKey.errorPageData,
  {},
  sessionStorage,
)

const reported = ref<boolean>(false)

const reportError = async () => {
  reported.value = true
}

const resetErrorPageData = () => {
  errorPageData.value = null
}
</script>

<style scoped lang="postcss">
.error {
  @apply full flex flex-col justify-center items-center;
  @apply gap-[20px];
}

.error-content-wrapper {
  @apply text-center;
}
</style>
