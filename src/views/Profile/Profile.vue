<template>
  <main class="profile">
    <!-- <n-spin :show="loading"> -->
    <div>
      <JoinServer />
      <RegisterProfileWarn />
    </div>
    <NotAccess v-if="!szUserProfile" />

    <SZBlockContainer v-if="szUserProfile">
      <header class="profile-header">
        <img
          class="user-avatar"
          :src="`${userAvatar}?size=1024`"
          alt="discord user avatar"
        />

        <div class="header-info">
          <div>
            <p class="user-name">{{ userProfile.name }}</p>
            <p>{{ dateFormat(userProfile.createdAt) }}</p>
          </div>

          <div>
            <p>{{ userProfile.from }}</p>
            <p>{{ userProfile.country }}</p>
          </div>

          <div>
            <p>🌟Rep: {{ userProfile.rep }}</p>
          </div>
        </div>
      </header>
    </SZBlockContainer>
    <!-- </n-spin> -->
  </main>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth'
import { computed, onMounted, ref } from 'vue'
import { NSpin, NForm, NFormItem } from 'naive-ui'
import { GetSZUserProfile } from '@/api/szUserProfile'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import NotAccess from './components/NotAccess.vue'
import RegisterProfileWarn from './components/RegisterProfileWarn.vue'
import JoinServer from './components/JoinServer.vue'
import { dateFormat } from '@/utils/helper'
import { get } from 'lodash-es'
import { useFetch } from '@/use/useFetch'

const oauthStore = useOauthStore()
const { fetchDataToValue } = useFetch()
const userAvatar = computed(() => oauthStore.userAvatar)
const szUser = computed(() => oauthStore.user.sz)
const userProfile = computed(() => get(oauthStore.user, 'sz.UserProfile') || {})
// const loading = ref(true)

onMounted(async () => {})
</script>

<style scoped lang="postcss">
.profile {
  @apply pt-[100px] px-[50px];
  @apply flex flex-col;
  @apply justify-center items-center;
}

.user-avatar {
  @apply w-[150px];
}

.profile-header {
  @apply flex gap-[30px];
}

.user-name {
  @apply text-lg text-primary;
}

.header-info {
  @apply flex flex-col justify-between;
  @apply text-normal;
}
</style>
