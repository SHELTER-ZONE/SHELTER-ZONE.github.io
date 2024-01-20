<template>
  <main class="profile">
    <PageTItle :icon="Campsite" title="Personal Shelter" />
    <NotAccess v-if="!szUserProfile || !szJoined" />
    <div
      v-if="szUserProfile && szJoined"
      class="f-col-center gap-[20px] pb-[40px] w-full"
    >
      <main class="f-col gap-[30px]">
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
import PageTItle from '@/components/PageTitle.vue'
import EditableBlock from '@/components/EditableBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
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
  @apply viewPx viewPt viewMax m-auto;
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
