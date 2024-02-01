import { apiAuth } from '@/lib/axios'

export const HealthyCheck = async () => {
  return await apiAuth({ method: 'GET', url: '/' })
}
