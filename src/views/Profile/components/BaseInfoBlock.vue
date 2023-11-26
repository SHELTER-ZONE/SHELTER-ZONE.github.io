<template>
  <main class="base-info-block">
    <AreaBlock>
      <div class="f-row gap-[20px]">
        <img
          class="user-avatar"
          :src="`${userAvatar}?size=1024`"
          alt="discord user avatar"
        />

        <div class="header-info">
          <div>
            <p class="user-name">
              <span>{{ displayData.name }}</span>
            </p>
            <p class="text-sm">{{ dateFormat(displayData.createdAt) }}</p>
            <p class="text-sm">{{ displayData.country }}</p>
          </div>

          <n-divider />

          <div>
            <!-- <p>{{ displayData.from }}</p> -->
          </div>

          <div>
            <p>
              🌟Rep:
              <span class="text-action font-bold">{{ displayData.rep }}</span>
            </p>
          </div>
        </div>
      </div>
    </AreaBlock>
  </main>
</template>

<script setup lang="ts">
import AreaBlock from '@/components/AreaBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { dateFormat } from '@/utils/helper'
import { computed } from 'vue'
import { NDivider } from 'naive-ui'
import joinReason from '@/configs/joinReason'
import { fromSourcesConfig } from '@/configs/verifyForm'
import { get } from 'lodash-es'

const oauthStore = useOauthStore()
const { szUserProfile } = useOauthStore()
const userAvatar = computed(() => oauthStore.userAvatar)

const displayData = computed(() => {
  return {
    name: get(szUserProfile, 'name'),
    createdAt: dateFormat(get(szUserProfile, 'createdAt', '')),
    from: get(fromSourcesConfig, `${get(szUserProfile, 'from', '')}.label`),
    country: get(szUserProfile, 'country'),
    rep: get(szUserProfile, 'reputation'),
  }
})
</script>

<style scoped lang="postcss">
.user-avatar {
  @apply w-[150px] rounded-lg;
}

.user-name {
  @apply text-lg text-primary pb-[5px];
}

.header-info {
  @apply flex flex-col justify-between;
  @apply text-normal;
}
</style>
