import { computed } from 'vue'
import { get, map, includes, filter } from 'lodash'
import { storeToRefs } from 'pinia'
import { useSZGuild } from '@/stores/szGuild'
import type { APIRole } from 'discord-api-types/v10'

export const useServerRole = () => {
  const szGuildStore = useSZGuild()
  const { serverConfig, serverRoles } = storeToRefs(szGuildStore)

  const mainRolesConfig = computed(
    () => get(serverConfig.value, 'roles.mainRoles') || [],
  )

  const mainRoleIds = computed(() => map(mainRolesConfig.value, 'id'))

  const isMainRole = computed(() => {
    return (role: APIRole) => includes(mainRoleIds.value, role.id)
  })

  const filterMainRoles = (memberRoleIds: string[]) => {
    const matchedRoles = filter(
      serverRoles.value,
      (role: APIRole) =>
        includes(mainRoleIds.value, role.id) &&
        includes(memberRoleIds, role.id),
    )
    return matchedRoles
  }

  return { mainRolesConfig, mainRoleIds, isMainRole, filterMainRoles }
}
