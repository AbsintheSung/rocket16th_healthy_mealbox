import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { MemberInfo, GeneralBoxesOrder, CustomizeBoxesOrder, Order } from '@/types/type'
import { useCustomMealBoxStore } from './custommealbox'
export const useMemberStore = defineStore('member', () => {
  const customMealBoxStore = useCustomMealBoxStore()
  /* State */


  //會員資料存放處
  const memberInfo = ref<Partial<MemberInfo>>({});
  const memberOrder = ref<Order[]>([])
  const orderCurrentPage = ref(1) // 訂單當前分頁
  const orderPageSize = ref(10) //訂單每頁該顯示的資料數量
  const customCurrentPage = ref(1) // 自定義當前分頁
  const customPageSize = ref(10) //自定義每頁該顯示的資料數量

  //會員登入狀態
  const isLoginStatus = ref(false)

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
        orderCompletedTime: formatDate(order.orderCompletedTime), // 格式化 createTime
        arrivedAtStoreTime: formatDate(order.arrivedAtStoreTime), // 格式化 createTime
        preparingGoodsTime: formatDate(order.preparingGoodsTime), // 格式化 createTime
        paymentSuccessTime: formatDate(order.paymentSuccessTime), // 格式化 createTime
        shippedTime: formatDate(order.shippedTime), // 格式化 createTime
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

  //取得獲取 訂單 的資料總數
  const getOrderTotal = computed(() => getMemberOrders.value.length)
  //取得 訂單 每頁該顯示的資料數量
  const getOrderPageSize = computed(() => orderPageSize.value)
  // 訂單 總頁碼共幾個
  const getTotalPages = computed(() => Math.ceil(getOrderTotal.value / getOrderPageSize.value))
  //顯示在前台的 訂單  10筆資料
  const getPaginatedOrder = computed(() => {
    const start = (orderCurrentPage.value - 1) * orderPageSize.value
    const end = start + orderPageSize.value
    return getMemberOrders.value.slice(start, end)
  })

  //取得獲取 自定義餐盒 的資料總數
  const getCustomTotal = computed(() => customMealBoxStore.getCustomMeal.length)
  //取得 訂單 每頁該顯示的資料數量
  const getCustomPageSize = computed(() => customPageSize.value)
  // 訂單 總頁碼共幾個
  const getCustomPages = computed(() => Math.ceil(getCustomTotal.value / getCustomPageSize.value))
  //顯示在前台的 訂單  10筆資料
  const getPaginatedCustom = computed(() => {
    const start = (customCurrentPage.value - 1) * customPageSize.value
    const end = start + customPageSize.value
    return customMealBoxStore.getCustomMeal.slice(start, end)
  })

  //取得會員登入狀態
  const getLoginStatus = computed(() => isLoginStatus.value)

  /* Action */

  //取得會員資料
  const fetchMemberInfo = async () => {
    try {
      const response = await fetchApi.getUserInfo()
      if (response.status === 200) {
        memberInfo.value = response.data.data
        isLoginStatus.value = true
        // console.log(memberInfo.value)
      }
    } catch (error: any) {
      isLoginStatus.value = false
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

  //刪除創建的自定義餐盒
  const deleteCustom = async (id: any) => {
    try {
      const response = await fetchApi.deleteCustom(id)
      await customMealBoxStore.fetchCustomMeal()
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  // 日期格式轉換函數( 內部調用 )
  const formatDate = (isoDate: string | null): string | null => {
    if (isoDate === null) {
      return null;
    }

    const date = new Date(isoDate);

    // 檢查日期是否有效
    if (isNaN(date.getTime())) {
      return null;  // 如果日期無效，也返回 null
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以需要 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // //傳遞頁碼，觸發更動( 訂單 ) 
  const changeOrderPage = (page: any) => (orderCurrentPage.value = page)

  // 傳遞頁碼，觸發更動( 自定義會員 ) 
  const changeCustomPage = (page: any) => (customCurrentPage.value = page)

  return {
    orderCurrentPage,
    memberInfo,
    getMemberInfo,
    getMemberName,
    getMemberAccount,
    getMemberOrders,
    getOrderTotal,
    getOrderPageSize,
    getTotalPages,
    getPaginatedOrder,
    getCustomTotal,
    getCustomPageSize,
    getCustomPages,
    getPaginatedCustom,
    getLoginStatus,
    fetchMemberInfo,
    fetchMemberOrder,
    updateMemberInfo,
    updateMemberPassword,
    deleteCustom,
    changeOrderPage,
    changeCustomPage
  }
})
