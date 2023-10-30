import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { DiscordOauthLogin, GetDCAuthorizeUrl } from '@/api/oauth'
import { FindSZUser } from '@/api/szUser'
import { get, find } from 'lodash-es'
import { useStorage, StorageSerializers } from '@vueuse/core'
import dayjs from 'dayjs'
import { useFetch } from '@/use/useFetch'
import { FindMeDCGuilds, FindMeDCUser } from '@/api/discord'

const discordAuthRedirectUrl = () =>
  `${location.protocol}//${location.host}/#/discord/callback`

export const useOauthStore = defineStore('oauth', () => {
  const { fetchDataToValue, fetchDataReturn, fetchData } = useFetch()

  const user = reactive({
    discord: null,
    sz: null,
    guilds: useStorage('user-guilds', []),
  })
  const szUserToken = useStorage<string>('szUserToken', '')
  const dcUserToken = useStorage<string>('dcUserToken', '')
  const expiresIn = useStorage<number | string>('expiresIn', '')

  function clearUser() {
    user.discord = null
    user.sz = null
    user.guilds = []
    szUserToken.value = null
    dcUserToken.value = null
    expiresIn.value = null
  }

  async function getDCAuthorizeUrl() {
    const res = await fetchDataReturn(
      GetDCAuthorizeUrl,
      { redirectUrl: discordAuthRedirectUrl() },
      null,
    )

    return res
  }

  async function LoginSZUserByDiscord(code: string) {
    console.log('LoginSZUserByDiscord', code)
    await fetchData(
      DiscordOauthLogin,
      { code, redirectUrl: discordAuthRedirectUrl() },
      (res: any) => {
        const data = res.data
        user.discord = get(data, 'dcUser')
        dcUserToken.value = get(data, 'dcToken')

        user.sz = get(data, 'user')
        szUserToken.value = get(data, 'szToken')
      },
    )
  }

  async function findMeGuilds() {
    await fetchDataToValue(FindMeDCGuilds, null, { ref: user, path: 'guilds' })
  }

  async function findMeUser() {
    if (!szUserToken.value || !dcUserToken.value) return
    await fetchDataToValue(FindMeDCUser, null, { ref: user, path: 'discord' })
    if (!get(user.discord, 'id')) {
      user.discord = null
      return
    }

    await Promise.all([
      fetchDataToValue(FindMeDCGuilds, null, { ref: user, path: 'guilds' }),
      fetchDataToValue(
        FindSZUser,
        { discordId: get(user.discord, 'id') },
        { ref: user, path: 'sz' },
      ),
    ])
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
    return szUserToken.value
  })
  const szJoined = computed(() => {
    return Boolean(find(user.guilds, { id: '445157253385814016' }))
  })
  const szRegistered = computed(() => {
    return Boolean(get(user, 'sz'))
  })
  const szUserProfile = computed(() => {
    return get(user, 'sz.UserProfile')
  })

  return {
    getDCAuthorizeUrl,
    LoginSZUserByDiscord,
    user,
    userAvatar,
    szJoined,
    szRegistered,
    szUserProfile,
    loggedIn,
    signin,
    szUserToken,
    clearUser,
    expiresIn,
    findMeUser,
    findMeGuilds,
  }
})
