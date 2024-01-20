<template>
  <EditableBlock @edit="onEdit">
    <div class="f-row gap-[10px]" v-if="displayRoles.length">
      <n-tooltip trigger="hover" v-for="role in displayRoles" :key="role.id">
        <template #trigger>
          <BaseTag
            :type="isMainRole(role) ? 'success' : ''"
            :class="{ 'other-tag': !isMainRole(role) }"
            :disabled="!isMainRole(role)"
            :bordered="false"
          >
            {{ role.name }}
          </BaseTag>
        </template>
        <p>
          {{
            isMainRole(role) ? '主要身分' : '其他身分 (將不顯示於個人主頁上)'
          }}
        </p>
      </n-tooltip>
    </div>

    <div v-else class="text-center">尚未擁有任何標籤</div>
  </EditableBlock>
  <EditServerTagsModal
    v-if="showEditModal"
    :curRoles="dcMemberRoles"
    @close="showEditModal = false"
  />
</template>

<script setup lang="ts">
import EditableBlock from '@/components/EditableBlock.vue'
import EditServerTagsModal from './EditServerTagsModal.vue'
import BaseTag from '@/components/BaseTag.vue'
import { useOauthStore } from '@/stores/oauth'
import { NTooltip, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { get, filter, includes, map } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import { useSZGuild } from '@/stores/szGuild'

const oauthStore = useOauthStore()
const appStore = useAppStore()
const message = useMessage()
const szGuildStore = useSZGuild()
const { user } = storeToRefs(oauthStore)
const { szServer } = storeToRefs(appStore)
const { serverConfig } = storeToRefs(szGuildStore)
const showEditModal = ref<boolean>(false)

const dcMemberRoles = computed(() => get(user.value, 'discordMember.roles'))
const serverRoles = computed(() => get(szServer.value, 'roles'))

const mainRoleList = computed(
  () => get(serverConfig.value, 'roles.mainRoles') || [],
)

const displayRoles = computed(() => {
  return filter(serverRoles.value, (role) =>
    includes(dcMemberRoles.value, role.id),
  )
})

const isMainRole = computed(() => {
  return (role) => {
    return includes(map(mainRoleList.value, 'id'), role.id)
  }
})

const onEdit = () => {
  showEditModal.value = true
}
</script>

<style scoped lang="postcss">
.other-tag {
  @apply bg-base text-white;
}
</style>
