import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { GeneralBoxes } from '@/types/cartType'
export const useCartStore = defineStore('cart', () => {
  /* States */
  const caseType = ref<Number>(7) //caseType的原始資料
  const generalBoxes = ref([]) //存放獲取後的一般餐盒
  const customizeBoxes = ref([]) //存放獲取後的自定義餐盒

  /* Getter */

  //取得caseType的資訊
  const getCaseType = computed(() => caseType.value)

  //取得目前會員已加入購物車商品總數
  const getMealBoxTotal = computed(() => {
    //@ts-ignore
    const generalBoxTotal = generalBoxes.value.reduce((total, item) => total + item.boxQuantity, 0)
    //@ts-ignore
    const customBoxTotal = customizeBoxes.value.reduce((total, item) => total + item.boxQuantity, 0)
    return generalBoxTotal + customBoxTotal
  })

  //是否滿足結帳條件( 選滿 )
  const getIsEndOrder = computed(() => getMealBoxTotal.value === getCaseType.value)

  /* Action */

  //修改caseType調用此function
  const changeSelectPlan = (planDay: Number) => {
    caseType.value = planDay
  }

  //內部調用，取得購物車內數量，若商品不存在購物車 數量為1
  const addMealBoxQuantity = (id: Number) => {
    //@ts-ignore
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (isExit) {
      //@ts-ignore
      const mealData = generalBoxes.value.filter(item => item.id === id)
      //@ts-ignore
      return mealData[0].boxQuantity + 1
    } else {
      return 1
    }
  }
  //內部調用，取得購物車內數量，若商品不存在購物車 數量為1
  const minusMealBoxQuantity = (id: Number) => {
    //@ts-ignore
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (isExit) {
      //@ts-ignore
      const mealData = generalBoxes.value.filter(item => item.id === id)
      //@ts-ignore
      return mealData[0].boxQuantity - 1
    }
  }

  //取得會員購物車
  const fetchMemberCartInfo = async () => {
    try {
      const response = await fetchApi.getCartApi()
      if (response.status === 200) {
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
      }
    } catch (error) {
      console.log(error)
    }
  }

  //編輯會員購物車-新增(一般)
  const fetchUpdateGeneralCart = async (id: any,) => {
    if (getMealBoxTotal.value === getCaseType.value) {
      console.log('點餐結束')
      return
    }
    try {
      const mealData = {
        boxType: 'general',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: addMealBoxQuantity(id) // 目前此商品要這個數量，0 的話代表購物車移除此商品
      }
      const response = await fetchApi.updateCart(mealData)
      if (response.status) {
        await fetchMemberCartInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  //編輯會員購物車-減少(一般)
  const fetchMinusGeneralCart = async (id: any,) => {
    //@ts-ignore
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (!isExit) {
      return
    }
    try {
      const mealData = {
        boxType: 'general',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: minusMealBoxQuantity(id) // 目前此商品要這個數量，0 的話代表購物車移除此商品
      }
      const response = await fetchApi.updateCart(mealData)
      if (response.status) {
        await fetchMemberCartInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getCaseType,
    getMealBoxTotal,
    changeSelectPlan,
    fetchMemberCartInfo,
    fetchUpdateGeneralCart,
    fetchMinusGeneralCart
  }
})
