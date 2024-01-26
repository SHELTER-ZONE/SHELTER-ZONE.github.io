import { computed } from 'vue'
import { get, map, includes, filter, intersection } from 'lodash'
import { storeToRefs } from 'pinia'
import { useSZGuild } from '@/stores/szGuild'
import type { APIRole } from 'discord-api-types/v10'

export const useServerRole = () => {
  const szGuildStore = useSZGuild()
  const { serverConfig, serverRoles } = storeToRefs(szGuildStore)

  const mainRolesConfig = computed(
    () => get(serverConfig.value, 'roles.mainRoles') || [],
  )
  const optionalRolesConfig = computed(
    () => get(serverConfig.value, 'roles.optionalRoles') || [],
  )
  const devTeamRolesConfig = computed(
    () => get(serverConfig.value, 'roles.devTeamRoles') || [],
  )

  const mainRoleIds = computed(() => map(mainRolesConfig.value, 'id'))
  const optionalRoleIds = computed(() => map(optionalRolesConfig.value, 'id'))
  const devTeamRoleIds = computed(() => map(devTeamRolesConfig.value, 'id'))

  const isMainRole = computed(() => {
    return (role: APIRole) => includes(mainRoleIds.value, role.id)
  })
  const isDevTeamRole = computed(() => {
    return (role: APIRole) => includes(devTeamRoleIds.value, role.id)
  })

  const haveDevTeamRole = (memberRoleIds: string[]) => {
    const matchs = intersection(devTeamRoleIds.value, memberRoleIds)
    if (!matchs || !matchs.length) return false
    return true
  }

  const filterMainRoles = (memberRoleIds: string[]) => {
    const matchedRoles = filter(
      serverRoles.value,
      (role: APIRole) =>
        includes(mainRoleIds.value, role.id) &&
        includes(memberRoleIds, role.id),
    )
    return matchedRoles
  }

  const excludeOptionalRoles = (memberRoleIds: string[]) => {
    const matchedRoles = filter(
      serverRoles.value,
      (role: APIRole) =>
        !includes(optionalRoleIds.value, role.id) &&
        includes(memberRoleIds, role.id),
    )
    return matchedRoles
  }

  return {
    mainRolesConfig,
    devTeamRolesConfig,
    mainRoleIds,
    isMainRole,
    filterMainRoles,
    isDevTeamRole,
    haveDevTeamRole,
    excludeOptionalRoles,
  }
}
