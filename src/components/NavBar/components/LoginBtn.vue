<template>
  <NButton type="primary" @click="login">Login</NButton>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { NButton } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'

const oauthStore = useOauthStore()
const user = computed(() => oauthStore.user)
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
