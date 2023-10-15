import { discord } from './instance'

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
