import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { DiscordOauthLogin, GetDCAuthorizeUrl } from '@/api/oauth'
import { FindSZUser } from '@/api/szUser'
import { get, find } from 'lodash-es'
import { useStorage } from '@vueuse/core'
import { useFetch } from '@/use/useFetch'
import { FindMeDCGuilds, FindMeDCUser } from '@/api/discord'
import localStoreKey from '@/configs/localStoreKey'

const discordAuthRedirectUrl = () =>
  `${location.protocol}//${location.host}/#/discord/callback`

export const useOauthStore = defineStore('oauth', () => {
  const { fetchDataToValue, fetchDataReturn, fetchData } = useFetch()

  const user = reactive({
    discord: null,
    sz: null,
    guilds: useStorage(localStoreKey.userGuilds, []),
  })
  const szUserToken = useStorage<string>(localStoreKey.szUserToken, '')
  const dcUserToken = useStorage<string>(localStoreKey.dcUserToken, '')
  const expiresIn = useStorage<number | string>(localStoreKey.expiresIn, '')

  const clearUser = () => {
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
    await fetchData(
      DiscordOauthLogin,
      { code, redirectUrl: discordAuthRedirectUrl() },
      (res: any) => {
        const data = res.data
        // discord info
        user.discord = get(data, 'dcUser')
        dcUserToken.value = get(data, 'dcToken')
        // sz info
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
    const [, err, rawErr] = await fetchDataToValue(
      FindMeDCUser,
      null,
      { ref: user, path: 'discord' },
      null,
      { toastError: false },
    )
    if (err) {
      if (rawErr.status === 401) {
        logout()
        return
      } else window.$message.error(err.message)
    }
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

  const logout = () => {
    clearUser()
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
    logout,
  }
})
