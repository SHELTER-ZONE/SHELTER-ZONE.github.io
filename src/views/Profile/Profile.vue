<template>
  <main class="profile">
    <PageTitle :icon="Campsite" title="Personal Shelter" />
    <NotAccess v-if="!szUserProfile || !szJoined" />
    <div v-if="szUserProfile && szJoined" class="f-row gap-[12px]">
      <!-- <router-link :to="{ name: 'PersonalShelter', params: { discordId } }"> -->
      <BaseButton type="info" @click="goToShelter">
        <template #icon>
          <Campsite />
        </template>
        前往個人避難所
      </BaseButton>
      <!-- </router-link> -->

      <BaseButton
        :type="preview ? 'primary' : 'warning'"
        @click="preview = !preview"
      >
        <template #icon>
          <component :is="preview ? DataViewAlt : Edit" />
        </template>
        模式: {{ preview ? '預覽' : '編輯' }}
      </BaseButton>
    </div>
    <article v-if="szUserProfile && szJoined" class="profile-layout">
      <main class="f-col" :class="{ 'gap-[30px]': !preview }">
        <section>
          <NCollapseTransition :show="!preview">
            <BannerBlock />
          </NCollapseTransition>
        </section>
        <div class="wrapper">
          <EditableBlock :hide-edit="preview" class="flex-shrink-0">
            <UserBaseInfoBlock :dc-user="user.discord" :sz-user="user.sz" />
          </EditableBlock>

          <div class="f-col !self-stretch">
            <!-- <DailyCheckRecordBlock :sz-user="user.sz" /> -->
            <!-- Server Roles -->
            <EditableBlock
              class="h-full"
              v-show="previewDisplayArea.serverRoles"
              :hide-edit="preview"
              @edit="editModal.serverRoles = true"
            >
              <UserServerRolesBlock
                :dc-member="user.discordMember"
                :showOtherRoles="!preview"
                :preview="preview"
              />
            </EditableBlock>
          </div>
        </div>

        <!-- SocialLinks -->
        <EditableBlock
          :hide-edit="preview"
          @edit="editModal.socialLinks = true"
          v-show="previewDisplayArea.socialLinks"
        >
          <UserSocialLinks
            :social-links="szUserProfile?.socialLinks"
            :preview="preview"
          />
        </EditableBlock>

        <!-- ProfileText -->
        <EditableBlock
          v-show="previewDisplayArea.profileText"
          :hide-edit="preview"
          @edit="editMode.profileText = true"
        >
          <UserProfileTextBlock
            :sz-user="user.sz"
            :editMode="editMode.profileText && !preview"
            :preview="preview"
            @confirm="editMode.profileText = false"
          />
        </EditableBlock>
      </main>
    </article>
  </main>

  <EditServerTagsModal
    v-if="editModal.serverRoles"
    :dc-member="user.discordMember"
    @close="editModal.serverRoles = false"
  />
  <EditSocialLinksModal
    v-if="editModal.socialLinks"
    @close="editModal.socialLinks = false"
  />
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import EditableBlock from '@/components/EditableBlock.vue'
import UserBaseInfoBlock from '@/components/UserBaseInfoBlock.vue'
// import DailyCheckRecordBlock from '@/components/DailyCheckRecordBlock.vue'
import UserServerRolesBlock from '@/components/UserServerRolesBlock.vue'
import UserSocialLinks from '@/components/UserSocialLinks.vue'
import { Campsite, DataViewAlt, Edit } from '@vicons/carbon'
import NotAccess from './components/NotAccess.vue'
import BannerBlock from './components/BannerBlock.vue'
import EditServerTagsModal from './components/EditServerTagsModal.vue'
import EditSocialLinksModal from './components/EditSocialLinksModal.vue'
import UserProfileTextBlock from '@/components/UserProfileTextBlock.vue'
import { get, trim } from 'lodash-es'
import { NCollapseTransition } from 'naive-ui'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const oauthStore = useOauthStore()
const { szJoined, szUserProfile, user } = storeToRefs(oauthStore)

const discordId = computed(() => get(user.value, 'discord.id'))

const editModal = reactive({
  serverRoles: false,
  socialLinks: false,
})

const editMode = reactive({
  profileText: false,
})

const preview = ref(false)

const previewDisplayArea = computed(() => {
  if (!preview.value)
    return {
      serverRoles: true,
      profileText: true,
      socialLinks: true,
    }

  const userServerRoles = get(user.value, 'discordMember.roles', [])
  return {
    serverRoles: userServerRoles.length ? true : false,
    profileText: trim(get(szUserProfile.value, 'profileText')) ? true : false,
    socialLinks: get(szUserProfile.value, 'socialLinks', []).length,
  }
})

const goToShelter = () => {
  appStore.setPageKeepAlive('PersonalShelter', false)

  router.push({
    name: 'PersonalShelter',
    params: { discordId: discordId.value },
  })
}
</script>

<style scoped lang="postcss">
.profile {
  @apply viewPx viewPt viewMax m-auto;
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}

.header-info {
  @apply flex flex-col justify-between;
  @apply text-normal;
}

.profile-layout {
  @apply flex flex-col justify-center items-center gap-[20px] pb-[40px] w-full;
}
.wrapper {
  @apply full flex flex-col justify-center items-center gap-[30px];
  @apply tablet:(flex-row items-start);
}
</style>
