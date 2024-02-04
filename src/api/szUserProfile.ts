import { apiAuth } from '@/lib/axios'
import type { APISZUserProfileCreate } from '@shelter-zone/sz-api-types/v3'
import { omit } from 'lodash-es'

export type SocialLinkItem = {
  type: 'discord' | 'github' | 'youtube' | 'instagram' | 'custom'
  name: string | null
  link: string
}

export interface UpdateSZUserProfilePayload {
  userProfileId: string
  name?: string
  profileText?: string
  socialLinks?: SocialLinkItem[]
}

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

export const UpdateSZUserProfile = async (
  payload: UpdateSZUserProfilePayload,
) => {
  return await apiAuth({
    url: `/userProfile/${payload.userProfileId}`,
    method: 'PUT',
    data: omit(payload, ['userProfileId']),
  })
}
