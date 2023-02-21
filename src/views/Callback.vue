<template>
  <main class="signin">
    {{ stage }}
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const message = useMessage()
const stage = ref('認證中...')
onMounted(async () => {
  await router.isReady()
  let code = location.href.split('/')[4].split('=')[1]
  code = code.replace('#', '')
  if (code.includes('access_denied') || code.includes('error_description')) {
    return router.replace('/')
  }
  const [, getTokenErr] = await store.dispatch('getDCAccessToken', { code })
  if (getTokenErr) return message.error(getTokenErr.message)
  stage.value = '取得使用者資訊...'
  await store.dispatch('findMe')
  router.replace('/important')
  store.commit('SET_LOGGEDIN', true)
})
</script>

<style scoped lang="postcss"></style>
