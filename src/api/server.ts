import { api } from '@/lib/axios'

export const GetSZServerNews = async () => {
  return await api({
    method: `GET`,
    url: `/website/news`,
    params: {
      limit: 10,
    },
  })
}
