<template>
  <main class="error-page">
    <SZBlockContainer class="w-full max-w-[800px]">
      <div class="error-content-wrapper">
        <section class="flex flex-col items-center gap-[20px]">
          <n-icon size="50"><Warning /></n-icon>

          <p v-if="errorType" class="text-danger text-md font-bold">
            — {{ errorType }} —
          </p>
          <p class="font-medium">
            {{ get(errorPageData, 'message') }}
          </p>

          <n-button text class="underline" @click="show = !show">
            {{ show ? 'hide' : 'show' }} detail
          </n-button>
        </section>

        <n-collapse-transition :show="show">
          <n-divider />
          <n-scrollbar
            trigger="none"
            class="w-fit m-auto max-h-[200px] px-[20px]"
          >
            <div class="flex flex-col gap-[20px]">
              <n-alert type="warning">
                以下資料可能含有身分驗證信息，僅供除錯用途，切勿截圖與外洩他人，以防身分盜用
              </n-alert>
              <InfoList :data="errorPageData" />
            </div>
          </n-scrollbar>
        </n-collapse-transition>

        <n-divider />

        <section class="flex justify-center items-center flex-wrap gap-[20px]">
          <n-button
            class="flex-1"
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

          <router-link
            class="flex-1"
            :to="{ name: 'home' }"
            @click="resetErrorPageData"
          >
            <n-button class="w-full" secondary type="primary">
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
import { ref, computed } from 'vue'
import {
  NIcon,
  NButton,
  NDivider,
  NCollapseTransition,
  NAlert,
  NScrollbar,
} from 'naive-ui'
import { Warning } from '@vicons/carbon'
import { get } from 'lodash-es'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { Home, Report } from '@vicons/carbon'
import { useStorage } from '@vueuse/core'
import localStoreKey from '@/configs/localStoreKey'
import InfoList from '@/components/InfoList.vue'
import { useRoute } from 'vue-router'

const errorPageData = useStorage(
  localStoreKey.errorPageData,
  {},
  sessionStorage,
)

const route = useRoute()

const reported = ref<boolean>(false)
const show = ref<boolean>(false)
const errorType = computed(() => route.query.errorType)

const reportError = async () => {
  reported.value = true
  // TODO send message to dc channel
}

const resetErrorPageData = () => {
  errorPageData.value = null
}
</script>

<style scoped lang="postcss">
.error-page {
  @apply full flex flex-col justify-center items-center;
  @apply gap-20px px-50px pt-100px;
}

.error-content-wrapper {
  @apply text-center;
}
</style>
