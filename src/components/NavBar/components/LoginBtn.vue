<template>
  <NButton secondary type="primary" @click="onSignin" :loading="loading">
    {{ translate('common.login') }}
  </NButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
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
