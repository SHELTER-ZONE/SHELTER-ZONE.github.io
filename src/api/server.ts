import { api } from '@/lib/axios'
import { SZ_SERVER_ID } from '@/utils/variables'

export const GetSZServerNews = async () => {
  return await api({
    method: `GET`,
    url: `/website/${SZ_SERVER_ID}/news`,
    params: {
      limit: 10,
    },
  })
}
