<template>
  <NButton type="primary" @click="login">
    {{ translate('common.login') }}
  </NButton>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { NButton } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { useLocale } from '@/use/useLocale'

const oauthStore = useOauthStore()
const { translate } = useLocale()
const loginUrl = ref('')

const login = async () => {
  if (!loginUrl.value) return
  window.location = loginUrl.value
}

onBeforeMount(async () => {
  const url = await oauthStore.getDCAuthorizeUrl()
  loginUrl.value = url
})
</script>

<style scoped lang="postcss"></style>
