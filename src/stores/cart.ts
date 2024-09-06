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

  //編輯會員購物車(一般)
  const fetchUpdateGeneralCart = async (id: any, boxQuantity = 1) => {
    if (getMealBoxTotal.value === getCaseType.value) {
      console.log('點餐結束')
      return
    }
    try {
      const mealData = {
        boxType: 'general',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: boxQuantity // 目前此商品要這個數量，0 的話代表購物車移除此商品
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
    fetchUpdateGeneralCart
  }
})
