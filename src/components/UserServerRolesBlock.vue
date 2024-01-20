<template>
  <div class="f-row gap-[10px]" v-if="displayRoles.length">
    <template v-for="role in displayRoles" :key="role.id">
      <div v-if="showOtherRoles ? true : isMainRole(role)">
        <n-tooltip trigger="hover">
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
            <span>主要身分</span>
          </p>
        </n-tooltip>
      </div>
    </template>
  </div>

  <div v-else class="text-center">尚未擁有任何標籤</div>
</template>

<script setup lang="ts">
import BaseTag from '@/components/BaseTag.vue'
import { NTooltip } from 'naive-ui'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { get, filter, includes, map } from 'lodash-es'
import { useSZGuild } from '@/stores/szGuild'
import type { APIGuildMember, APIRole } from 'discord-api-types/v10'

export interface UserServerRolesBlockProps {
  dcMember: APIGuildMember | null
  showOtherRoles?: boolean
}

const props = defineProps<UserServerRolesBlockProps>()

const szGuildStore = useSZGuild()
const { serverConfig, serverRoles } = storeToRefs(szGuildStore)

const dcMemberRoles = computed(() => get(props.dcMember, 'roles'))

const mainRoleList = computed(
  () => get(serverConfig.value, 'roles.mainRoles') || [],
)

const displayRoles = computed(() => {
  return filter(serverRoles.value, (role: APIRole) =>
    includes(dcMemberRoles.value, role.id),
  )
})

const isMainRole = computed(() => {
  return (role: APIRole) => {
    return includes(map(mainRoleList.value, 'id'), role.id)
  }
})
</script>

<style scoped lang="postcss">
.other-tag {
  @apply bg-base text-white;
}
</style>
