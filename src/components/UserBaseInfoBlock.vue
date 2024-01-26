<template>
  <main class="base-info-block">
    <div class="<tablet:(flex-col) f-row gap-[20px]">
      <div>
        <n-image
          class="user-avatar"
          :src="`${userAvatar}?size=1024`"
          alt="discord user avatar"
          :fallback-src="ImagePlaceholder"
        />
      </div>

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
              <IconInfoItem :data="info" />
              <n-divider vertical v-if="idx !== keys(lowerData).length - 1" />
            </template>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { dateFormat } from '@/utils/helper'
import { computed } from 'vue'
import { NDivider, NImage } from 'naive-ui'
import IconInfoItem from '@/components/IconInfoItem.vue'
import { UserRole, ConditionPoint, DirectLink } from '@vicons/carbon'
import { get, omit, keys } from 'lodash-es'
import { discordUserAvatartUrl } from '@/utils/discord'
import ImagePlaceholder from '@/assets/default/image_placeholder.webp'

export interface UserBaseInfoBlockProps {
  dcUser: any
  szUser: any
}

const props = defineProps<UserBaseInfoBlockProps>()

const userAvatar = computed(() => discordUserAvatartUrl(props.dcUser))

const szUserProfile = computed(() => get(props.szUser, 'UserProfile'))

const displayData = computed(() => {
  return {
    name: { icon: null, value: get(szUserProfile.value, 'name', '--------') },
    createdAt: {
      icon: null,
      value: dateFormat(get(szUserProfile.value, 'createdAt', new Date())),
    },
    country: {
      icon: null,
      value: get(szUserProfile.value, 'country', '--------'),
    },
    role: {
      icon: UserRole,
      iconColor: 'var(--action)',
      tipInfo: '在 SZ 中的權限身分',
      value: get(props.szUser, 'Role.name'),
    },
    rep: {
      icon: ConditionPoint,
      iconColor: 'var(--warning)',
      tipInfo: '聲望值',
      value: get(szUserProfile.value, 'reputation'),
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
