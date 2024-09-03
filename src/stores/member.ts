import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'

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
  /* Getter */
  const getMemberInfo = computed(() => {
    return {
      ...memberInfo.value
    }
  })
  const getMemberName = computed(() => {
    return !memberInfo.value.name ? "user" : memberInfo.value.name;
  });
  const getMemberAccount = computed(() => {
    return !memberInfo.value.account ? "example@gmail.com" : memberInfo.value.account;
  });
  /* Action */

  //取得會員資料
  const fetchMemberInfo = async () => {
    try {
      const response = await fetchApi.getUserInfo()
      if (response.status === 200) {
        memberInfo.value = response.data.data
        // console.log(memberInfo.value)
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
        await fetchMemberInfo() //修改成功後，在發送獲取請求資料
        return response.data
      }
    } catch (error: any) {
      throw error.response.data
    }
  }

  //修改會員密碼
  const updateMemberPassword = async (data: any) => {
    try {
      const response = await fetchApi.updateMemberPasswor(data)
      if (response.status === 200) {
        return response.data
      }
    } catch (error: any) {
      throw error.response.data
    }
  }

  return {
    memberInfo,
    getMemberInfo,
    getMemberName,
    getMemberAccount,
    fetchMemberInfo,
    updateMemberInfo,
    updateMemberPassword
  }
})
