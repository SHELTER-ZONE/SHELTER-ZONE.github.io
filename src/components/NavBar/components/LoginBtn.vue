<template>
  <SHButton secondary type="primary" @click="onSignin" :loading="loading">
    <div class="f-row gap-[5px]">
      <n-icon>
        <Login />
      </n-icon>
      <p>{{ translate('common.login') }}</p>
    </div>
  </SHButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHButton } from '@proladon/shelter-ui'
import { NIcon } from 'naive-ui'
import { Login } from '@vicons/carbon'
import { useOauthStore } from '@/stores/oauth'
import { useLocale } from '@/use/useLocale'

const { signin } = useOauthStore()
const { translate } = useLocale()
const loading = ref(false)

const onSignin = async () => {
  loading.value = true
  const res = await signin()
  if (!res) loading.value = false
}
</script>

<style scoped lang="postcss"></style>
