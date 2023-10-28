import { api } from './instance'
import { getHost } from '@/utils/helper'
import type { APISZUserProfileCreate } from '@shelter-zone/sz-api-types/v2'

export const RegisterSZUserProfile = async (
  payload: APISZUserProfileCreate,
) => {
  const host = getHost('szUserProfile')
  return await api({
    url: `${host}/userProfile`,
    method: 'POST',
    data: payload,
  })
}

export const GetSZUserProfile = async (profileId: string) => {
  const host = getHost('szUserProfile')
  return await api({
    url: `${host}/userProfile/${profileId}`,
    method: 'GET',
  })
}
