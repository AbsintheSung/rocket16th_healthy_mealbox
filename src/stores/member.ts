import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'

type MemberInfo = {
  id: number | null
  userImg: string | null
  name: string | null
  account: string | null
  permission: string | null
  phoneNumber: string | null
  birthDate: string | null
  gender: number | null // 0: 男生 1:女 2:其他
  city: string | null
  area: string | null
  address: string | null
  createTime: string | null
}
export const useMemberStore = defineStore('member', () => {
  /* State */

  //會員資料存放處
  const memberInfo = ref<MemberInfo>({
    id: null,
    userImg: null,
    name: null,
    account: null,
    permission: null,
    phoneNumber: null,
    birthDate: null,
    gender: null, // 0: 男生 1:女 2:其他
    city: null,
    area: null,
    address: null,
    createTime: null
  })
  // function convertToLocalString(isoString: string | null): string | null {
  //   if (isoString === null) return null
  //   const date = new Date(isoString)
  //   return date.toLocaleString()
  // }
  /* Getter */
  const getMemberInfo = computed(() => {
    return {
      ...memberInfo.value
    }
  })

  /* Action */

  //取得會員資料
  const userInfo = async () => {
    try {
      const response = await fetchApi.getUserInfo()
      if (response.status === 200) {
        memberInfo.value = response.data.data
      }
    } catch (error: any) {
      throw error.response.data
    }
  }

  //修改會員一般資料
  const updateMemberInfo = async (data: any) => {
    try {
      const response = await fetchApi.updateMemberInfo(data)
      if (response.status === 200) {
        await userInfo() //修改成功後，在發送獲取請求資料
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    memberInfo,
    getMemberInfo,
    userInfo,
    updateMemberInfo
  }
})
