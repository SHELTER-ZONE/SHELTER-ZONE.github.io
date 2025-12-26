<template>
  <SHButton type="primary" :loading="loading" @click="handleLogin"> <IconLogin /> Login </SHButton>
</template>

<script setup lang="ts">
import { SHButton, useNotification } from '@proladon/shelter-ui'
import { IconLogin } from '@tabler/icons-vue'
import { GetDCAuthorizeUrl } from '@/api/oauth'

const notification = useNotification()
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const redirectUrl = `${window.location.origin}/callback`
  const [data, error] = await GetDCAuthorizeUrl({ redirectUrl })

  if (error) {
    notification.error({
      title: '登入失敗',
      message: '取得登入連結失敗',
    })
    loading.value = false
    return
  }

  if (data?.url) {
    window.location.href = data.url
  } else {
    loading.value = false
  }
}
</script>

<style lang="postcss" scoped></style>
