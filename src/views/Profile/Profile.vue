<template>
  <main class="profile">
    <n-spin :show="loading">
      <SZBlockContainer>
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
    </n-spin>
  </main>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth'
import { computed, onMounted, ref } from 'vue'
import { NSpin, NForm, NFormItem } from 'naive-ui'
import { getSZUserProfile } from '@/api/szUserProfile'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { dateFormat } from '@/utils/helper'
import { get } from 'lodash-es'

const oauthStore = useOauthStore()
const userAvatar = computed(() => oauthStore.userAvatar)
const szUser = computed(() => oauthStore.user.sz)
const userProfile = ref({})
const loading = ref(true)

onMounted(async () => {
  const userProfileId = get(szUser.value, 'profiles.userProfile')
  const [res, err]: any = await getSZUserProfile(userProfileId)
  userProfile.value = res
  loading.value = false
})
</script>

<style scoped lang="postcss">
.profile {
  @apply pt-[100px];
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
