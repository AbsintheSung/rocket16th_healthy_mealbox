import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import { useMemberStore } from './member'
export const useAuthStore = defineStore('auth', () => {
  const memberStore = useMemberStore()
  //State
  // const userToken = ref('')
  const isSignin = ref(false) //登入狀態
  const userInfoData = ref({}) //存放已登入使用者的資訊內容

  //Getter
  const getUserToken = computed(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)tokenCode\s*=\s*([^;]*).*$)|^.*$/, '$1') //獲取存在cookie的token
    return token
  })
  const getUserInfoData = computed(() => userInfoData.value)

  //Action
  const signin = async (inputData: { account: string; password: string }) => {
    try {
      const response = await fetchApi.signin(inputData)
      if (response.status === 200) {
        document.cookie = `tokenCode=${response.data.token}`
        const { message, status } = response.data
        await memberStore.fetchMemberInfo(); //登入成功後，在發送獲取會員資料api
        return { message, status }
      }
      console.log(response)
    } catch (error: any) {
      if (error.response.status === 400) {
        throw error.response.data
      }
    }
  }

  const register = async (inputData: { account: string; password: string }) => {
    try {
      const response = await fetchApi.register(inputData)
      if (response.status === 200) {
        return response.data
      }
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 400) {
        throw error.response.data
      }
    }
  }

  // const userInfo = async () => {
  //   try {
  //     const response = await fetchApi.getUserInfo()
  //     if (response.status === 200) {
  //       isSignin.value = true
  //       userInfoData.value = { ...response.data.data }
  //       console.log(userInfoData.value)
  //     }
  //   } catch (error: any) {
  //     throw error.response.data
  //   }
  // }

  return {
    signin,
    register,
    // userInfo,
    getUserToken,
    getUserInfoData
  }
})
