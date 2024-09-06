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
  const getMealBoxTotal = computed(() => generalBoxes.value.length + customizeBoxes.value.length)

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

  return {
    getCaseType,
    getMealBoxTotal,
    changeSelectPlan,
    fetchMemberCartInfo
  }
})
