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

export const FindDCMember = async ({ discordId }: { discordId: string }) => {
  return await apiAuth({
    method: 'GET',
    url: `/discord/guild/member/${discordId}`,
  })
}

export const GetServerRoles = async () => {
  return await apiAuth({
    method: 'GET',
    url: `/discord/guild/roles`,
  })
}

export const ChangeServerRoles = async ({
  discordId,
  roles,
}: {
  discordId: string
  roles: string[]
}) => {
  return await apiAuth({
    url: `/discord/guild/member/${discordId}/changeRoles`,
    method: 'PUT',
    data: { roles },
  })
}
