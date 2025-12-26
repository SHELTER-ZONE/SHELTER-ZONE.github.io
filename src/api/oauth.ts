import { szBackend } from '@/lib/axios'

export const GetDCAuthorizeUrl = async ({ redirectUrl }: { redirectUrl: string }) => {
  return await szBackend({
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
  return await szBackend({
    method: 'POST',
    url: `/oauth/discord/login`,
    data: {
      code,
      redirectUrl,
    },
  })
}
