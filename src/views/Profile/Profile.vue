<template>
  <main class="profile">
    <PageTItle :icon="Campsite" title="Personal Shelter" />
    <NotAccess v-if="!szUserProfile || !szJoined" />
    <div class="f-row gap-[12px]">
      <router-link :to="{ name: 'PersonalShelter', params: { discordId } }">
        <BaseButton type="info">
          <template #icon><Campsite /></template>
          前往個人避難所
        </BaseButton>
      </router-link>

      <BaseButton
        :type="preview ? 'primary' : 'warning'"
        @click="preview = !preview"
      >
        <template #icon
          ><component :is="preview ? DataViewAlt : Edit"
        /></template>
        模式: {{ preview ? '預覽' : '編輯' }}
      </BaseButton>
    </div>
    <article
      v-if="szUserProfile && szJoined"
      class="f-col-center gap-[20px] pb-[40px] w-full"
    >
      <main class="f-col gap-[30px]">
        <section>
          <n-collapse-transition :show="!preview">
            <BannerBlock />
          </n-collapse-transition>
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
            showOtherRoles
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
import PageTItle from '@/components/PageTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import EditableBlock from '@/components/EditableBlock.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { Campsite, DataViewAlt, Edit } from '@vicons/carbon'
import NotAccess from './components/NotAccess.vue'
import UserBaseInfoBlock from '@/components/UserBaseInfoBlock.vue'
import DailyCheckRecordBlock from '@/components/DailyCheckRecordBlock.vue'
import BannerBlock from './components/BannerBlock.vue'
import UserServerRolesBlock from '@/components/UserServerRolesBlock.vue'
import EditServerTagsModal from './components/EditServerTagsModal.vue'
import { reactive, computed, ref } from 'vue'
import { get } from 'lodash-es'
import { RouterLink } from 'vue-router'
import { NCollapseTransition } from 'naive-ui'

const oauthStore = useOauthStore()
const { szJoined, szUserProfile, user } = storeToRefs(oauthStore)

const discordId = computed(() => get(user.value, 'discord.id'))

const editModal = reactive({
  serverRoles: false,
})
const preview = ref(false)
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
