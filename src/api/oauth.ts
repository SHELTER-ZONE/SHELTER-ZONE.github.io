import { api } from '@/api/instance'
import { getHost } from '@/utils/helper'

export const GetDCAuthorizeUrl = async ({
  redirectUri,
}: {
  redirectUri: string
}) => {
  const host = getHost('szOauth')
  return await api({
    method: 'POST',
    url: `${host}/discord/getLoginUrl`,
    data: {
      redirectUri,
    },
  })
}

export const GetDCAccessToken = async ({
  code,
  redirectUri,
}: {
  code: string
  redirectUri: string
}) => {
  const host = getHost('szOauth')
  return await api({
    method: 'POST',
    url: `${host}/discord/getAccessToken`,
    data: {
      code,
      redirectUri,
    },
  })
}

export const FindMe = async (accessToken: string) => {
  return await api({
    method: 'get',
    url: 'https://discord.com/api/v10/users/@me',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const GetDCUserGuilds = async (accessToken: string) => {
  return await api({
    method: 'get',
    url: 'https://discord.com/api/v10/users/@me/guilds',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const LoginSZUser = async (accessToken: string, userId: string) => {
  const host = getHost('szOauth')
  return await api({
    method: 'POST',
    url: `${host}/login`,
    data: {
      accessToken,
      userId,
    },
  })
}
