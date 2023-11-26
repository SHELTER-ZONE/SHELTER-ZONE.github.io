<template>
  <main class="error-page">
    <SZBlockContainer class="w-full max-w-[800px]">
      <div class="error-content-wrapper">
        <section class="flex flex-col items-center gap-[20px]">
          <n-icon size="50"><Warning /></n-icon>

          <p v-if="errorType" class="text-danger text-md font-bold">
            — {{ errorType }} —
          </p>
          <p class="error-msg">
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
                <div class="<mb:(text-sm)">
                  以下資料可能含有身分驗證信息，僅供除錯用途，切勿截圖與外洩他人，以防身分盜用
                </div>
              </n-alert>
              <InfoList :data="errorPageData" class="<mb:(text-sm)" />
            </div>
          </n-scrollbar>
        </n-collapse-transition>

        <n-divider />

        <section class="btn-container">
          <n-button
            class="w-full"
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
import InfoList from '@/components/InfoList.vue'
import { useRoute } from 'vue-router'
import { useErrorPage } from '@/use/useErrorPage'

const { errorPageData } = useErrorPage()

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

.error-msg {
  @apply font-medium text-danger;
}

.error-content-wrapper {
  @apply text-center;
}

.btn-container {
  @apply grid grid-cols-2 gap-[20px];
  @apply <mb:(grid-cols-1);
}
</style>
