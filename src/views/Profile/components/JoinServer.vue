<template>
  <SZBlockContainer>
    <div class="flex flex-col gap-[30px] text-center">
      <div class="text-warning">
        <p>你尚未加入 SHELTER ZONE</p>
      </div>

      <div class="grid grid-cols-2 gap-[20px]">
        <n-button @click="joinDiscord">Join Discord</n-button>
        <n-button :loading="loading" @click="reCheck">我已加入</n-button>
      </div>
    </div>
  </SZBlockContainer>
</template>

<script setup>
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { ref } from 'vue'
import { NButton, NSpin } from 'naive-ui'
import { SZInviteLink } from '@/configs/links'
import { useOauthStore } from '@/stores/oauth'

const { findMeGuilds, szJoined } = useOauthStore()
const loading = ref(false)

const joinDiscord = () => {
  window.open(SZInviteLink, '_blank')
}

const reCheck = async () => {
  loading.value = true
  await findMeGuilds()
  loading.value = false
}
</script>

<style lang="postcss" scoped></style>
