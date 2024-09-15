import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { MemberInfo, GeneralBoxesOrder, CustomizeBoxesOrder, Order } from '@/types/type'
// type MemberInfo = {
//   id: number | null
//   userImg: string | null
//   name: string | null
//   account: string | null
//   permission: string | null
//   phoneNumber: string | null
//   birthDate: string | null
//   gender: number | null // 0: 男生 1:女 2:其他
//   city: string | null
//   area: string | null
//   address: string | null
//   createTime: string | null
// }
export const useMemberStore = defineStore('member', () => {
  /* State */

  //會員資料存放處
  // const memberInfo = ref<MemberInfo>({
  //   id: null,
  //   userImg: null,
  //   name: null,
  //   account: null,
  //   permission: null,
  //   phoneNumber: null,
  //   birthDate: null,
  //   gender: null, // 0: 男生 1:女 2:其他
  //   city: null,
  //   area: null,
  //   address: null,
  //   createTime: null
  // })
  //會員資料存放處
  const memberInfo = ref<Partial<MemberInfo>>({});
  const memberOrder = ref<Order[]>([])

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

  //取得歷史訂單
  const getMemberOrders = computed(() => {
    return memberOrder.value.map(order => {
      // 合併 customizeBoxes 和 generalBoxes，最多顯示兩個
      const combinedBoxes = [
        ...order.cartOrder.generalBoxes,
        ...order.cartOrder.customizeBoxes
      ].slice(0, 2);

      return {
        ...order,
        createTime: formatDate(order.createTime), // 格式化 createTime
        cartOrder: {
          ...order.cartOrder,
          customizeBoxes: order.cartOrder.customizeBoxes.map(box => ({
            ...box,
            composition: { ...box.composition },
          })),
          generalBoxes: order.cartOrder.generalBoxes.map(box => ({
            ...box,
            composition: { ...box.composition },
            imgArr: [...box.imgArr],
          })),
        },
        combinedBoxes, // 新增的合併陣列屬性
      };
    });
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

  //取得會員歷史訂單
  const fetchMemberOrder = async () => {
    try {
      const response = await fetchApi.getMemberOrder()
      memberOrder.value = response.data.data || []
      // console.log(response.data)
      console.log(getMemberOrders.value)
    } catch (error) {
      console.log(error)
    }
  }

  // 日期格式轉換函數( 內部調用 )
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以需要 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return {
    memberInfo,
    getMemberInfo,
    getMemberName,
    getMemberAccount,
    getMemberOrders,
    fetchMemberInfo,
    fetchMemberOrder,
    updateMemberInfo,
    updateMemberPassword
  }
})
