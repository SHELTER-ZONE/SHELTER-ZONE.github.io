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
    <article
      v-if="szUserProfile && szJoined"
      class="f-col-center gap-[20px] pb-[40px] w-full"
    >
      <main class="f-col" :class="{ 'gap-[30px]': !preview }">
        <section>
          <NCollapseTransition :show="!preview">
            <BannerBlock />
          </NCollapseTransition>
        </section>
        <div class="wrapper">
          <EditableBlock :hide-edit="preview">
            <UserBaseInfoBlock :dc-user="user.discord" :sz-user="user.sz" />
          </EditableBlock>
          <DailyCheckRecordBlock :sz-user="user.sz" />
        </div>

        <EditableBlock
          :hide-edit="preview"
          @edit="editModal.serverRoles = true"
        >
          <UserServerRolesBlock
            :dc-member="user.discordMember"
            :showOtherRoles="!preview"
            :preview="preview"
          />
        </EditableBlock>

        <EditableBlock :hide-edit="preview" @edit="editMode.profileText = true">
          <UserProfileTextBlock
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
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import EditableBlock from '@/components/EditableBlock.vue'
import UserBaseInfoBlock from '@/components/UserBaseInfoBlock.vue'
import DailyCheckRecordBlock from '@/components/DailyCheckRecordBlock.vue'
import UserServerRolesBlock from '@/components/UserServerRolesBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { Campsite, DataViewAlt, Edit } from '@vicons/carbon'
import NotAccess from './components/NotAccess.vue'
import BannerBlock from './components/BannerBlock.vue'
import EditServerTagsModal from './components/EditServerTagsModal.vue'
import UserProfileTextBlock from '@/components/UserProfileTextBlock.vue'
import { reactive, computed, ref } from 'vue'
import { get, set } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
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
})

const editMode = reactive({
  profileText: false,
})

const preview = ref(false)

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

.wrapper {
  @apply full flex flex-col justify-center items-center gap-[30px];
  @apply tablet:(flex-row items-start);
}
</style>
