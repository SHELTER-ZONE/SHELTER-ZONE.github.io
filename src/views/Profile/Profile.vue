<template>
  <main class="profile viewPx">
    <div class="f-col-center gap-[20px] py-[40px]">
      <n-icon :size="50">
        <Campsite />
      </n-icon>
      <p class="topic-title">Personal Shelter</p>
      <n-divider class="bg-primary-bg" />

      <NotAccess v-if="!szUserProfile || !szJoined" />

      <main class="f-col gap-[30px]" v-if="szUserProfile && szJoined">
        <BannerBlock />
        <div class="wrapper">
          <EditableBlock>
            <UserBaseInfoBlock :dc-user="user.discord" :sz-user="user.sz" />
          </EditableBlock>
          <DailyCheckRecordBlock :sz-user="user.sz" />
        </div>
        <EditableBlock @edit="editModal.serverRoles = true">
          <UserServerRolesBlock
            :dc-member="user.discordMember"
            showOtherRoles
          />
        </EditableBlock>
      </main>
    </div>
  </main>

  <EditServerTagsModal
    v-if="editModal.serverRoles"
    :dc-member="user.discordMember"
    @close="editModal.serverRoles = false"
  />
</template>

<script setup lang="ts">
import EditableBlock from '@/components/EditableBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { NIcon, NDivider } from 'naive-ui'
import { Campsite } from '@vicons/carbon'
import NotAccess from './components/NotAccess.vue'
import UserBaseInfoBlock from '@/components/UserBaseInfoBlock.vue'
import DailyCheckRecordBlock from '@/components/DailyCheckRecordBlock.vue'
import BannerBlock from './components/BannerBlock.vue'
import UserServerRolesBlock from '@/components/UserServerRolesBlock.vue'
import EditServerTagsModal from './components/EditServerTagsModal.vue'
import { reactive } from 'vue'

const oauthStore = useOauthStore()
const { szJoined, szUserProfile, user } = storeToRefs(oauthStore)

const editModal = reactive({
  serverRoles: false,
})
</script>

<style scoped lang="postcss">
.profile {
  @apply pt-[100px];
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}

.header-info {
  @apply flex flex-col justify-between;
  @apply text-normal;
}

.wrapper {
  @apply full flex flex-col justify-center items-center gap-[30px];
  @apply tablet:(flex-row items-start);
}
</style>
