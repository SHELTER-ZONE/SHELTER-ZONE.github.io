import { api } from './instance'
import { getHost } from '@/utils/helper'
import type { RESTPatchAPIGuildMemberJSONBody } from 'discord-api-types/v10'
import { SZ_SERVER_ID } from '@/utils/variables'

export const findMember = async (userId: string) => {
  const host = getHost('szBot')
  return await api({
    method: 'GET',
    url: `${host}/members/${SZ_SERVER_ID}/${userId}`,
  })
}

export const updateMember = async ({
  userId,
  payload,
}: {
  userId: string
  payload: RESTPatchAPIGuildMemberJSONBody
}) => {
  const host = getHost('szBot')
  return await api({
    method: 'PUT',
    url: `${host}/members/${SZ_SERVER_ID}/${userId}`,
    data: payload,
  })
}

export const getAllMembersCount = async () => {
  const host = getHost('szBot')
  return await api({
    method: 'GET',
    url: `${host}/${SZ_SERVER_ID}/members/all`,
  })
}

export const getSZGuildInfo = async () => {
  const host = getHost('szBot')
  return await api({
    method: 'GET',
    url: `${host}/find/${SZ_SERVER_ID}`,
  })
}
