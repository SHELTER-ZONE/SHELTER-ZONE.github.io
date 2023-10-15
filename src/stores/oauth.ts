import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { DiscordOauthLogin, GetDCAuthorizeUrl } from '@/api/oauth'
import { FindSZUser } from '@/api/user'
import { get, find } from 'lodash-es'
import { useStorage, StorageSerializers } from '@vueuse/core'
import dayjs from 'dayjs'
import { useFetch } from '@/use/useFetch'

const discordAuthRedirectUrl = () =>
  `${location.protocol}//${location.host}/#/discord/callback`

export const useOauthStore = defineStore('oauth', () => {
  const { fetchDataToValue, fetchDataReturn } = useFetch()

  const user = reactive({
    discord: useStorage('user-discord', null, undefined, {
      serializer: StorageSerializers.object,
    }),
    sz: useStorage('user-sz', null, undefined, {
      serializer: StorageSerializers.object,
    }),
    guilds: useStorage('user-guilds', []),
  })
  const szUserToken = useStorage<string>('szUserToken', '')
  const expiresIn = useStorage<number | string>('expiresIn', '')

  function clearUser() {
    user.discord = null
    user.sz = null
    user.guilds = []
    szUserToken.value = ''
    expiresIn.value = ''
  }

  async function getDCAuthorizeUrl() {
    return await fetchDataReturn(
      GetDCAuthorizeUrl,
      { redirectUrl: discordAuthRedirectUrl() },
      null,
    )
  }

  async function loginSZUserByDiscord(code: string) {
    console.log('login', code)
    const [res, err]: any = await DiscordOauthLogin({
      code,
      redirectUrl: discordAuthRedirectUrl(),
    })
    if (err) {
      console.log(err)
      // TODO window.$message
      return null
    }
    user.sz = res
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

  async function signin() {
    const loginUrl = await getDCAuthorizeUrl()
    if (!loginUrl) return
    const win: Window = window
    win.location = loginUrl
  }

  // getters
  const userAvatar = computed(() => {
    if (!user.discord) return ''
    const userId = get(user.discord, 'id')
    const avatarId = get(user.discord, 'avatar')
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp`
  })
  const loggedIn = computed(() => {
    return get(user, 'discord')
  })
  const szJoined = computed(() => {
    return Boolean(find(user.guilds, { id: '445157253385814016' }))
  })
  const szRegistered = computed(() => {
    return Boolean(get(user, 'sz'))
  })

  return {
    getDCAuthorizeUrl,
    loginSZUserByDiscord,
    user,
    userAvatar,
    findSZUser,
    szJoined,
    szRegistered,
    loggedIn,
    signin,
    szUserToken,
    clearUser,
    expiresIn,
  }
})
