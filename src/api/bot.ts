import { api } from './instance'
import { getHost } from '@/utils/helper'
import type { RESTPatchAPIGuildMemberJSONBody } from 'discord-api-types/v10'
import { SZ_SERVER_ID } from '@/utils/variables'
export const updateMember = async ({
  userId,
  payload,
}: {
  userId: string
  payload: RESTPatchAPIGuildMemberJSONBody
}) => {
  const host = getHost('szBot')
  return api({
    method: 'PUT',
    url: `${host}/members/${SZ_SERVER_ID}/${userId}`,
    data: payload,
  })
}
