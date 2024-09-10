import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { CartGeneralMealBoxes, CartInfo, NutritionistPlan } from '@/types/type'

export const useCartStore = defineStore('cart', () => {
  /* States */
  const caseType = ref<number>(7) //caseType的原始資料
  const nutritionistPlan = ref<NutritionistPlan[]>([]) //存放獲取後的營養師餐盒
  const generalBoxes = ref<CartGeneralMealBoxes[]>([]) //存放獲取後的一般餐盒
  const customizeBoxes = ref([]) //存放獲取後的自定義餐盒
  const cartInfo = ref<Partial<CartInfo>>({}); //存放購物車 價錢 優惠資訊
  /* Getter */

  //取得caseType的資訊
  const getCaseType = computed((): number => caseType.value)

  //取得目前會員已加入購物車商品總數
  const getMealBoxTotal = computed(() => {
    const generalBoxTotal = generalBoxes.value.reduce((total, item) => total + item.boxQuantity, 0)
    //@ts-ignore //自定義尚未定義所以透過ts忽略
    const customBoxTotal = customizeBoxes.value.reduce((total, item) => total + item.boxQuantity, 0)
    return generalBoxTotal + customBoxTotal
  })

  //是否滿足結帳條件( 選滿 )
  const getIsEndOrder = computed(() => getMealBoxTotal.value === getCaseType.value)

  //取得一般餐盒資料資訊，透過computed + 深拷貝
  const getGeneralBoxes = computed(() => {
    return generalBoxes.value.map(item => ({
      ...item,
      composition: { ...item.composition }, // 深拷貝 composition
      imgArr: [...item.imgArr], // 深拷貝 imgArr
    }));
  })

  //取得全部營養師方案資訊，透過computed + 深拷貝
  const getNutritionistPlans = computed(() => {
    return nutritionistPlan.value.map(plan => ({
      ...plan,
      boxes: [...plan.boxes] // 深拷貝 boxes陣列
    }));
  })

  //取得單獨營養師方案資訊
  const fetchNutritionistPlanById = async (id: number) => {
    try {
      const response = await fetchApi.getNutritionistPlanOne(id)
      if (response.status === 200) {
        return response.data.data
      }
    } catch (error) {
      console.error('獲取營養師方案詳情時出錯：', error)
      throw error
    }
  }

  //取的購物車 價格資訊
  const getCartInfo = computed(() => {
    return { ...cartInfo.value }
  })


  /* Action */

  //修改caseType調用此function
  const changeSelectPlan = (planDay: number) => {
    caseType.value = planDay
  }

  //內部調用，取得購物車內數量，若商品不存在購物車 數量為1
  const addMealBoxQuantity = (id: Number) => {
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (isExit) {
      const mealData = generalBoxes.value.filter(item => item.id === id)
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
      const mealData = generalBoxes.value.filter(item => item.id === id)
      return mealData[0].boxQuantity - 1
    }
  }

  // 將營養師方案加入購物車
  const addNutritionistPlanToCart = async (planId: any) => {
    if (getMealBoxTotal.value === getCaseType.value) {
      console.log('購物車已滿')
      return "cartFull"
    }

    try {
      const plan = await fetchNutritionistPlanById(planId)
      const boxPromises = plan.boxes.map((boxId: any) => fetchApi.getGeneralmealOne(boxId))
      const boxesData = await Promise.all(boxPromises)

      for (const boxData of boxesData) {
        if (boxData.status === 200) {
          const mealData = {
            boxType: 'general',
            boxId: boxData.data.data.id,
            boxQuantity: 1
          }
          await fetchApi.updateCart(mealData)
        }
      }

      await fetchMemberCartInfo()
      return "success"
    } catch (error) {
      console.error('將營養師方案加入購物車時出錯：', error)
      throw error
    }
  }


  //取得會員購物車
  const fetchMemberCartInfo = async () => {
    try {
      const response = await fetchApi.getCartApi()
      if (response.status === 200) {
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
        cartInfo.value = {
          prize: response.data.data.prize,
          freightFree: response.data.data.freightFree,
          expirationDate: response.data.data.expirationDate,
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  //編輯會員購物車-新增(一般)
  const fetchaddGeneralCart = async (id: any,) => {
    if (getMealBoxTotal.value === getCaseType.value) {
      console.log('點餐結束')
      return "endOrder"
    }
    try {
      const mealData = {
        boxType: 'general',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: addMealBoxQuantity(id) // 目前此商品要這個數量，0 的話代表購物車移除此商品
      }
      const response = await fetchApi.updateCart(mealData)
      if (response.status === 200) {
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
        cartInfo.value = {
          prize: response.data.data.prize,
          freightFree: response.data.data.freightFree,
          expirationDate: response.data.data.expirationDate,
        }
        // await fetchMemberCartInfo()
        return response.data
      }
    } catch (error: any) {
      throw error.response.data
    }
  }

  //編輯會員購物車-減少(一般)
  const fetchMinusGeneralCart = async (id: any,) => {
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (!isExit) {
      return 'notExist'
    }
    try {
      const mealData = {
        boxType: 'general',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: minusMealBoxQuantity(id) // 目前此商品要這個數量，0 的話代表購物車移除此商品
      }
      const response = await fetchApi.updateCart(mealData)
      if (response.status === 200) {
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
        cartInfo.value = {
          prize: response.data.data.prize,
          freightFree: response.data.data.freightFree,
          expirationDate: response.data.data.expirationDate,
        }
        // await fetchMemberCartInfo()
        return response.data
      }
    } catch (error: any) {
      throw error.response.data
    }
  }

  return {
    getCaseType,
    getMealBoxTotal,
    getGeneralBoxes,
    getCartInfo,
    getIsEndOrder,
    changeSelectPlan,
    fetchMemberCartInfo,
    fetchaddGeneralCart,
    fetchMinusGeneralCart,
    getNutritionistPlans,
    fetchNutritionistPlanById,
    addNutritionistPlanToCart
  }
})
