import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  GetDCAccessToken,
  GetDCAuthorizeUrl,
  FindMe,
  GetDCUserGuilds,
  LoginSZUser,
} from '@/api/oauth'
import { FindSZUser } from '@/api/user'
import { get, find } from 'lodash-es'
import { useStorage, StorageSerializers } from '@vueuse/core'

const discordAuthRedirectUrl = () =>
  `${location.protocol}//${location.host}/#/discord/callback`

export const useOauthStore = defineStore('oauth', () => {
  // const user = ref(null)
  const user = reactive({
    discord: useStorage('user-discord', null, undefined, {
      serializer: StorageSerializers.object,
    }),
    sz: useStorage('user-sz', null, undefined, {
      serializer: StorageSerializers.object,
    }),
    guilds: useStorage('user-guilds', []),
  })
  const accessToken = ref(null)
  const szUserToken = useStorage('szUserToken', '')

  async function getDCAuthorizeUrl() {
    const [res, err]: any = await GetDCAuthorizeUrl({
      redirectUri: discordAuthRedirectUrl(),
    })
    if (err) {
      console.log(err)
      // TODO window.$message
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
    accessToken.value = res.access_token
    // TODO expires_in
  }
  async function findUserMe() {
    if (!accessToken.value) return
    const [res, err]: any = await FindMe(accessToken.value)
    if (err) throw err.message
    user.discord = res
    return res
  }
  async function findSZUser() {
    if (!user.discord) return
    const userId = get(user.discord, 'id')
    const [res, err]: any = await FindSZUser({ userId })
    if (err) throw err
    user.sz = res
    return res
  }
  async function getDCUserGuilds() {
    if (!accessToken.value) return
    const [res, err]: any = await GetDCUserGuilds(accessToken.value)
    if (err) return
    user.guilds = res
    return
  }
  async function signin() {
    const loginUrl = await getDCAuthorizeUrl()
    if (!loginUrl) return
    const win: Window = window
    win.location = loginUrl
  }
  async function loginSZUser() {
    if (!accessToken.value) return
    const userId = get(user, 'discord.id')
    const [res, err]: any = await LoginSZUser(accessToken.value, userId)
    if (err) return [null, err]
    szUserToken.value = res
    return [res, null]
  }

  // getters
  const userAvatar = computed(() => {
    if (!user.discord) return ''
    const userId = get(user.discord, 'id')
    const avatarId = get(user.discord, 'avatar')
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp`
  })
  const loggedIn = computed(() => {
    return Boolean(get(user, 'discord'))
  })
  const szJoined = computed(() => {
    return Boolean(find(user.guilds, { id: '445157253385814016' }))
  })
  const szRegistered = computed(() => {
    return Boolean(get(user, 'sz'))
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
    szRegistered,
    loggedIn,
    signin,
    loginSZUser,
    szUserToken,
  }
})
