import { discord, apiAuth } from '@/lib/axios'

export const FindMeDCUser = async () => {
  return await discord({
    method: 'GET',
    url: `/users/@me`,
  })
}

export const FindMeDCGuilds = async () => {
  return await discord({
    method: 'GET',
    url: `/users/@me/guilds`,
  })
}

export const FindMeDCMember = async ({ discordId }: { discordId: string }) => {
  return await apiAuth({
    method: 'GET',
    url: `/discord/guild/member/${discordId}`,
  })
}
