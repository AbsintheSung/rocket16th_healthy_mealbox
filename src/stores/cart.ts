import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { CartGeneralMealBoxes, CartInfo, NutritionistPlan, CartCustomBoxes } from '@/types/type'
const imgUrl = import.meta.env.VITE_APP_API_URL
// const imgUrl = import.meta.env.VITE_APP_API_IMG_URL

export const useCartStore = defineStore('cart', () => {
  /* States */
  const caseType = ref<number>(0) //caseType的原始資料
  const nutritionistPlan = ref<NutritionistPlan[]>([]) //存放獲取後的營養師餐盒
  const generalBoxes = ref<CartGeneralMealBoxes[]>([]) //存放獲取後的一般餐盒
  const customizeBoxes = ref<CartCustomBoxes[]>([]) //存放獲取後的自定義餐盒
  const cartInfo = ref<Partial<CartInfo>>({}); //存放購物車 價錢 優惠資訊
  const lastSubmittedOrder = ref(null) //存放當前一筆訂單完成資訊

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
      // imgArr: item.imgArr.map(imgPath => `${imgUrl}${imgPath}`),
    }));
  })
  //取得自定義資訊
  const getCustomizedBoxes = computed(() => {
    return customizeBoxes.value.map(box => ({
      ...box,
      composition: { ...box.composition },
      starch: [...box.starch],
      mainMeal: [...box.mainMeal],
      sideDishes: [...box.sideDishes],
    }));
  });

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

  //取得購物車 價格資訊
  const getCartInfo = computed(() => {
    return { ...cartInfo.value }
  })

  // 取得當前提交訂單
  const getLastSubmittedOrder = computed(() => lastSubmittedOrder.value)


  /* Action */

  //修改caseType調用此function
  const fetchChangeSelectPlan = async (planDay: number) => {
    try {
      await fetchApi.cleanCart()
      const caseTypeData = { caseType: planDay }
      const response = await fetchApi.updateCaseType(caseTypeData)
      caseType.value = response.data.data.caseType
      generalBoxes.value = response.data.data.generalBoxes
      customizeBoxes.value = response.data.data.customizeBoxes
      cartInfo.value = {
        prize: response.data.data.price,
        freightFree: response.data.data.freightFree,
        expirationDate: response.data.data.expirationDate,
      }
      // console.log(response)
    } catch (error: any) {
      throw error.response.data
      // console.log(error.response.data)
    }
  }

  //內部調用，取得購物車內數量，若商品不存在購物車 數量為1 ( 一般 )
  const addMealBoxQuantity = (id: Number) => {
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (isExit) {
      const mealData = generalBoxes.value.filter(item => item.id === id)
      return mealData[0].boxQuantity + 1
    } else {
      return 1
    }
  }
  //內部調用，取得購物車內數量，若商品不存在購物車，不做任何事，存在的話，商品數量-1 (一般)
  const minusMealBoxQuantity = (id: Number) => {
    //@ts-ignore
    const isExit = generalBoxes.value.some((item) => item.id === id)
    if (isExit) {
      const mealData = generalBoxes.value.filter(item => item.id === id)
      return mealData[0].boxQuantity - 1
    }
  }

  //內部調用，取得購物車內數量，若商品不存在購物車 數量為1 ( 自定義 )
  const addCustomMealBoxQuantity = (id: Number) => {
    const isExit = customizeBoxes.value.some((item) => item.id === id)
    if (isExit) {
      const mealData = customizeBoxes.value.filter(item => item.id === id)
      return mealData[0].boxQuantity + 1
    } else {
      return 1
    }
  }
  //內部調用，取得購物車內數量，若商品不存在購物車，不做任何事，存在的話，商品數量-1 ( 自定義 )
  const minusCustomMealBoxQuantity = (id: Number) => {
    const isExit = customizeBoxes.value.some((item) => item.id === id)
    if (isExit) {
      const mealData = customizeBoxes.value.filter(item => item.id === id)
      return mealData[0].boxQuantity - 1
    }
  }


  // 將營養師方案加入購物車
  const addNutritionistPlanToCart = async (planId: number) => {
    try {
      const plan = await fetchNutritionistPlanById(planId)
      // 統計重複餐盒數量
      const boxCounts = new Map<number, number>()
      plan.boxes.forEach((boxId: any) => {
        boxCounts.set(boxId, (boxCounts.get(boxId) || 0) + 1)
      })

      // 更新餐盒數量(caseType)
      await fetchChangeSelectPlan(plan.boxes.length)

      for (const [boxId, count] of boxCounts) {
        const mealData = {
          boxType: 'general',
          boxId: boxId,
          boxQuantity: count
        }

        await fetchApi.updateCart(mealData)
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
        // console.log(response.data.data.caseType)
        caseType.value = response.data.data.caseType
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
        cartInfo.value = {
          prize: response.data.data.price,
          freightFree: response.data.data.freightFree,
          expirationDate: response.data.data.expirationDate,
        }
        // console.log(customizeBoxes.value)
      }

    } catch (error: any) {
      // console.log(error)
      throw error.response.data
    }
  }

  //編輯會員購物車-新增(一般)
  const fetchaddGeneralCart = async (id: any,) => {
    if (getIsEndOrder.value) {
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
          prize: response.data.data.price,
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
          prize: response.data.data.price,
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

  //編輯會員購物車-新增(自定義)
  const fetchaddCustomCart = async (id: any,) => {
    if (getIsEndOrder.value) {
      console.log('點餐結束')
      return "endOrder"
    }
    try {
      const mealData = {
        boxType: 'customize',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: addCustomMealBoxQuantity(id) // 目前此商品要這個數量，0 的話代表購物車移除此商品
      }
      const response = await fetchApi.updateCart(mealData)
      if (response.status === 200) {
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
        cartInfo.value = {
          prize: response.data.data.price,
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

  //編輯會員購物車-減少(自定義)
  const fetchMinusCustomCart = async (id: any,) => {
    //@ts-ignore
    const isExit = customizeBoxes.value.some((item) => item.id === id)
    if (!isExit) {
      return 'notExist'
    }
    try {
      const mealData = {
        boxType: 'customize',
        boxId: id, // 一般餐盒 id 或是 自定義餐盒 id
        boxQuantity: minusCustomMealBoxQuantity(id) // 目前此商品要這個數量，0 的話代表購物車移除此商品
      }
      const response = await fetchApi.updateCart(mealData)
      if (response.status === 200) {
        generalBoxes.value = response.data.data.generalBoxes
        customizeBoxes.value = response.data.data.customizeBoxes
        cartInfo.value = {
          prize: response.data.data.price,
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

  //送出購物車
  const submitOrder = async (orderData: any) => {
    try {
      const response = await fetchApi.submitOrder(orderData)

      if (response.status === 200 && response.data.code === 0) {
        lastSubmittedOrder.value = response.data.data

        await fetchMemberCartInfo()
        return response.data

      } else {
        throw new Error(response.data.message || '訂單提交失敗')
      }
    } catch (error) {
      console.error('提交訂單時出錯：', error)
      throw error
    }
  }


  //清空購物車
  const cleanCart = async () => {
    try {
      const response = await fetchApi.cleanCart()
      if (response.status === 200) {
        generalBoxes.value = []
        customizeBoxes.value = []
        cartInfo.value = {}
        await fetchMemberCartInfo()
        return "success"
      }
    } catch (error) {
      console.error('清空購物車時出錯：', error)
      throw error
    }
  }


  return {
    getCaseType,
    getMealBoxTotal,
    getGeneralBoxes,
    getCartInfo,
    getIsEndOrder,
    getCustomizedBoxes,
    getNutritionistPlans,
    getLastSubmittedOrder,
    fetchChangeSelectPlan,
    fetchMemberCartInfo,
    fetchaddGeneralCart,
    fetchMinusGeneralCart,
    fetchNutritionistPlanById,
    addNutritionistPlanToCart,
    submitOrder,
    cleanCart,
    fetchaddCustomCart,
    fetchMinusCustomCart
  }
})
