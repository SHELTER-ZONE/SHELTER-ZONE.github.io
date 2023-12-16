<template>
  <NButton secondary type="primary" @click="onSignin" :loading="loading">
    <div class="f-row gap-[5px]">
      <n-icon><Login /></n-icon>
      <p>{{ translate('common.login') }}</p>
    </div>
  </NButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { Login } from '@vicons/carbon'
import { useOauthStore } from '@/stores/oauth'
import { useLocale } from '@/use/useLocale'

const { signin } = useOauthStore()
const { translate } = useLocale()
const loading = ref(false)

const onSignin = async () => {
  try {
    loading.value = true
    await signin()
  } catch (error) {
    loading.value = false
  }
}
</script>

<style scoped lang="postcss"></style>
