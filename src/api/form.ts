import { api } from './instance'

export const sendJoinSZTeamForm = async ({
  discordId,
  content,
}: {
  discordId: string
  content: string
}) => {
  return await api({
    method: 'POST',
    url: `/joinSZTeamForm`,
    data: {
      discordId,
      content,
    },
  })
}
