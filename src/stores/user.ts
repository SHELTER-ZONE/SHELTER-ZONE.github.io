export const useUserStore = defineStore('user', () => {
  const user = ref<any | null>(null)
  const userToken = ref<string | null>(null)

  return {
    user,
    userToken,
  }
})
