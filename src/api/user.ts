import { api } from '@/api/instance'
import { getHost } from '@/utils/helper'
import type { APISZUserFind } from '@shelter-zone/sz-api-types/v2'

export const FindSZUser = async ({ userId }: APISZUserFind) => {
  const host = getHost('szUser')
  return await api({
    method: 'GET',
    url: `${host}/user/${userId}`,
  })
}
