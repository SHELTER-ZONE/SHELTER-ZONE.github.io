import { apiAuth } from '@/lib/axios'
import type { APISZUserProfileCreate } from '@shelter-zone/sz-api-types/v3'

export const RegisterSZUserProfile = async (
  payload: APISZUserProfileCreate,
) => {
  return await apiAuth({
    url: `/userProfile/register`,
    method: 'POST',
    data: payload,
  })
}

export const GetSZUserProfile = async (profileId: string) => {
  return await apiAuth({
    url: `/userProfile/${profileId}`,
    method: 'GET',
  })
}
