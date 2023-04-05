import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  GetDCAccessToken,
  GetDCAuthorizeUrl,
  FindMe,
  GetDCUserGuilds,
} from '@/api/oauth'
import { FindSZUser } from '@/api/user'
import { get, find } from 'lodash-es'

const discordAuthRedirectUrl = () =>
  `${location.protocol}//${location.host}/discord/callback`

export const useOauthStore = defineStore('oauth', () => {
  // const user = ref(null)
  const user = reactive({
    discord: null,
    sz: null,
    guilds: [],
  })
  const accessToken = ref(null)

  async function getDCAuthorizeUrl() {
    const [res, err]: any = await GetDCAuthorizeUrl({
      redirectUri: discordAuthRedirectUrl(),
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
      redirectUri: discordAuthRedirectUrl(),
    })
    if (err) return null
    console.log('res', res)
    accessToken.value = res.access_token
  }
  async function findUserMe() {
    if (!accessToken.value) return
    const [res, err]: any = await FindMe(accessToken.value)
    if (err) return
    user.discord = res
    return
  }
  async function findSZUser() {
    if (!user.discord) return
    const userId = get(user.discord, 'id')
    const [res, err]: any = await FindSZUser({ userId })
    if (err) return
    console.log(res)
  }
  async function getDCUserGuilds() {
    if (!accessToken.value) return
    const [res, err]: any = await GetDCUserGuilds(accessToken.value)
    if (err) return
    user.guilds = res
    return
  }

  const userAvatar = computed(() => {
    if (!user.discord) return ''
    const userId = get(user.discord, 'id')
    const avatarId = get(user.discord, 'avatar')
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp`
  })

  const szJoined = computed(() => {
    return Boolean(find(user.guilds, { id: '445157253385814016' }))
  })

  return {
    getDCAuthorizeUrl,
    getDCAccessToken,
    getDCUserGuilds,
    findUserMe,
    accessToken,
    user,
    userAvatar,
    findSZUser,
    szJoined,
  }
})
