import { api } from '@/lib/axios'
import { getHost } from '@/utils/helper'

export const GetDCAuthorizeUrl = async ({
  redirectUrl,
}: {
  redirectUrl: string
}) => {
  return await api({
    method: 'POST',
    url: `/oauth/discord`,
    data: {
      redirectUrl,
    },
  })
}

export const DiscordOauthLogin = async ({
  code,
  redirectUrl,
}: {
  code: string
  redirectUrl: string
}) => {
  return await api({
    method: 'POST',
    url: `/oauth/discord/login`,
    data: {
      code,
      redirectUrl,
    },
  })
}
