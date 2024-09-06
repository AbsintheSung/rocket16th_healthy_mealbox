import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  //State
  const caseType = ref<Number>(7) //caseType的原始資料

  //Getter

  //取得caseType的資訊
  const getCaseType = computed(() => caseType.value)

  //Action

  //修改caseType調用此function
  const changeSelectPlan = (planDay: Number) => {
    caseType.value = planDay
  }

  return {
    getCaseType,
    changeSelectPlan
  }
})
