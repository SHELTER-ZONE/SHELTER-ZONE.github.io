import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GetDCAccessToken, GetDCAuthorizeUrl, FindMe } from '@/api/oauth'

export const useOauthStore = defineStore('oauth', () => {
  const user = ref(null)
  const accessToken = ref(null)

  async function getDCAuthorizeUrl() {
    const [res, err]: any = await GetDCAuthorizeUrl({
      redirectUri: `${location.protocol}//${location.host}/callback`,
    })
    if (err) {
      console.log(err)
      return null
    }
    return res
  }
  async function getDCAccessToken(code: string) {
    const [res, err]: any = await GetDCAccessToken({
      code,
      redirectUri: `${location.protocol}//${location.host}/callback`,
    })
    if (err) return null
    console.log('res', res)
    accessToken.value = res.access_token
  }
  async function findUserMe() {
    if (!accessToken.value) return
    const [res, err]: any = await FindMe(accessToken.value)
    if (err) return
    user.value = res
    return
  }

  return {
    getDCAuthorizeUrl,
    getDCAccessToken,
    findUserMe,
    accessToken,
    user,
  }
})
