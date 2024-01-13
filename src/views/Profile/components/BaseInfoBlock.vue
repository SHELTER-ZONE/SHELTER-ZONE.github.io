<template>
  <main class="base-info-block">
    <EditableBlock>
      <div class="<tablet:(flex-col) f-row gap-[20px]">
        <img
          class="user-avatar"
          :src="`${userAvatar}?size=1024`"
          alt="discord user avatar"
        />

        <div class="base-info">
          <p class="user-name">
            <span>{{ displayData.name.value }}</span>
          </p>
          <div class="w-full">
            <div
              class="<tablet:(flex-col !items-center gap-[2px]) f-row gap-[10px]"
            >
              <p class="text-sub">{{ displayData.country.value }}</p>
              <n-divider vertical class="<tablet:(!hidden)" />
              <p class="text-sub">{{ displayData.createdAt.value }}</p>
            </div>

            <n-divider />
            <section class="<tablet:(justify-center) f-row">
              <template v-for="(info, key, idx) in lowerData" :key="key">
                <InfoItem :data="info" />
                <n-divider vertical v-if="idx !== keys(lowerData).length - 1" />
              </template>
            </section>
          </div>
        </div>
      </div>
    </EditableBlock>
  </main>
</template>

<script setup lang="ts">
import AreaBlock from '@/components/AreaBlock.vue'
import EditableBlock from '@/components/EditableBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { dateFormat } from '@/utils/helper'
import { computed, onBeforeMount } from 'vue'
import { NDivider } from 'naive-ui'
import InfoItem from './InfoItem.vue'
import { UserRole, ConditionPoint, DirectLink } from '@vicons/carbon'
import { get, omit, keys } from 'lodash-es'

const oauthStore = useOauthStore()
const { szUserProfile, user } = useOauthStore()
const userAvatar = computed(() => oauthStore.userAvatar)

const displayData = computed(() => {
  return {
    name: { icon: null, value: get(szUserProfile, 'name') },
    createdAt: {
      icon: null,
      value: dateFormat(get(szUserProfile, 'createdAt', '')),
    },
    country: { icon: null, value: get(szUserProfile, 'country') },
    role: {
      icon: UserRole,
      iconColor: 'var(--action)',
      tipInfo: '在 SZ 中的權限身分',
      value: get(user, 'sz.Role.name'),
    },
    rep: {
      icon: ConditionPoint,
      iconColor: 'var(--warning)',
      tipInfo: '聲望值',
      value: get(szUserProfile, 'reputation'),
    },
    contributes: {
      icon: DirectLink,
      iconColor: 'var(--primary)',
      tipInfo: '貢獻值',
      value: 0,
    },
  }
})

const lowerData = computed(() =>
  omit(displayData.value, ['name', 'createdAt', 'country']),
)
</script>

<style scoped lang="postcss">
.base-info-block {
  @apply w-full;
  @apply tablet:(w-fit);
}
.user-avatar {
  @apply max-w-[150px] rounded-lg;
  @apply mb:(w-[150px]);
}

.user-name {
  @apply text-lg text-base font-bold pb-[5px];
  @apply <tablet:(pb-[20px]);
}

.base-info {
  @apply flex flex-col justify-between flex-1 self-stretch;
  @apply text-normal;
  @apply <tablet:(items-center);
}
</style>
