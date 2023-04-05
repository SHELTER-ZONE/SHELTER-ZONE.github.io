<template>
  <div class="sz-verify">
    <SZVerifyConfirm v-if="!szJoined && !confirm" @confirm="confirm = true" />
    <SZVerifyForm v-if="confirm" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SZVerifyForm from './components/SZVerifyForm.vue'
import SZVerifyConfirm from './components/SZVerifyConfirm.vue'
import { useOauthStore } from '@/stores/oauth'

const oauthStore = useOauthStore()
const confirm = ref<boolean>(false)
const szJoined = computed(() => oauthStore.szJoined)
</script>

<style scoped lang="postcss">
.sz-verify {
  @apply pt-[100px];
  @apply flex justify-center;
}
</style>
