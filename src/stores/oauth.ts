import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetDCAccessToken, GetDCAuthorizeUrl, FindMe } from '@/api/oauth'

export const useCounterStore = defineStore('app', () => {
  const loggedIn = ref(0)
  const user = ref(null)
  const accessToken = ref(null)

  async function getDCAuthorizeUrl() {
    const [res, err]: any = await GetDCAuthorizeUrl({
      redirectUri: `${location.protocol}//${location.host}/sz-single-entrance/#/callback`,
    })
    if (err) return [null, err]
    return [res, null]
  }
  async function getDCAccessToken({ commit }, { code }) {
    const [res, err]: any = await GetDCAccessToken({
      code,
      redirectUri: `${location.protocol}//${location.host}/sz-single-entrance/#/callback`,
    })
    if (err) return [null, err]
    commit('SET_ACCESS_TOKEN', res.access_token)
    return [res, null]
  }
  async function findMe({ state, commit }) {
    const [res, err] = await FindMe(state.accessToken)
    if (err) return [null, err]
    commit('SET_USER', res)
    return [res, null]
  }

  return { count, doubleCount, increment }
})
