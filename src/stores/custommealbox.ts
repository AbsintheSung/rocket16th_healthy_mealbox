import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { customMealBox } from '@/types/type'
export const useCustomMealBoxStore = defineStore('custommealbox', () => {
  //State
  const customMeal = ref<customMealBox[]>([]) //自定義餐盒資料，預設空陣列
  const currentPage = ref(1) //當前分頁
  const pageSize = ref(10) //每頁該顯示的資料數量
  const oneCustomMeal = ref({})

  //Getter

  //取得當前頁數
  // const getCurrentPage = computed(() => currentPage.value)
  //取得獲取一般餐盒的資料總數
  const getDataTotal = computed(() => customMeal.value.length)
  //取得每頁該顯示的資料數量
  const getPageSize = computed(() => pageSize.value)
  //總頁碼共幾個
  const getTotalPages = computed(() => Math.ceil(getDataTotal.value / pageSize.value))
  //顯示在前台的 10筆資料
  const getPaginatedMeals = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return customMeal.value.slice(start, end)
  })

  //取得自定義餐盒列表
  const getCustomMeal = computed(() => {
    return customMeal.value.map(item => ({
      ...item,
      composition: { ...item.composition },
      starch: [...item.starch],
      mainMeal: [...item.mainMeal],
      sideDishes: [...item.sideDishes]
    }));
  });

  //Action

  //獲取所有自定義餐盒資料
  const fetchCustomMeal = async () => {
    try {
      const response = await fetchApi.getCusomMeal();
      customMeal.value = response.data.data
      // console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  //傳遞頁碼，觸發更動
  const changePage = (page: any) => (currentPage.value = page)

  return {
    currentPage,
    getDataTotal,
    getPageSize,
    getTotalPages,
    getPaginatedMeals,
    getCustomMeal,
    fetchCustomMeal,
    changePage
  }
})
