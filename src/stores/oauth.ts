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
import dayjs from 'dayjs'

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
  const accessToken = useStorage<string>('dcUserAccessToken', '')
  const szUserToken = useStorage<string>('szUserToken', '')
  const expiresIn = useStorage<number | string>('expiresIn', '')

  function clearUser() {
    user.discord = null
    user.sz = null
    user.guilds = []
    accessToken.value = ''
    szUserToken.value = ''
    expiresIn.value = ''
  }

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
    expiresIn.value = dayjs().add(res.expires_in, 's').valueOf()
    accessToken.value = res.access_token
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
  async function getDCUserGuilds(options?: { showErrorMsg: boolean }) {
    if (!accessToken.value) return
    const [res, err]: any = await GetDCUserGuilds(accessToken.value)
    if (err) {
      if (options?.showErrorMsg) window.$message.error(err.message)
      return
    }
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
    return get(user, 'discord') && accessToken.value
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
    clearUser,
    expiresIn,
  }
})
