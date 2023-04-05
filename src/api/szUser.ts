import { api } from './instance'
import { getHost } from '@/utils/helper'
import type { APISZUserCreate } from '@shelter-zone/sz-api-types/v2'

export const createSZUserProfile = async (payload: APISZUserCreate) => {
  const host = getHost('szUser')
  return await api({
    url: `${host}/user`,
    method: 'POST',
    data: payload,
  })
}
