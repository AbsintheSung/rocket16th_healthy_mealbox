import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
export const useMealBoxStore = defineStore('mealbox', () => {
  //State
  const generalMeal = ref([]) //一般餐盒資料，預設空陣列
  const currentPage = ref(1) //當前分頁
  const pageSize = ref(10) //每頁該顯示的資料數量
  const oneGeneralMeal = ref({})

  //Getter

  //取得當前頁數
  // const getCurrentPage = computed(() => currentPage.value)
  //取得獲取一般餐盒的資料總數
  const getDataTotal = computed(() => generalMeal.value.length)
  //取得單一餐盒資訊
  const getOneGeneralMeal = computed(() => oneGeneralMeal.value)
  //取得每頁該顯示的資料數量
  const getPageSize = computed(() => pageSize.value)
  //總頁碼共幾個
  const getTotalPages = computed(() => Math.ceil(getDataTotal.value / pageSize.value))
  //顯示在前台的 10筆資料
  const getPaginatedMeals = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return generalMeal.value.slice(start, end)
  })

  //Action

  //獲取所有一般餐盒子資料
  const fetchGeneralMeal = async () => {
    try {
      const response = await fetchApi.getGeneralmeal()
      if (response.status === 200) {
        generalMeal.value = response?.data?.data || []
        // console.log(response.data)
        // console.log(generalMeal.value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchOneGeneralMeal = async (id: any) => {
    try {
      const response = await fetchApi.getGeneralmealOne(id)
      if (response.status === 200) {
        oneGeneralMeal.value = response?.data?.data || {}
        // console.log(response.data)
        // console.log(generalMeal.value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //傳遞頁碼，觸發更動
  const changePage = (page: any) => (currentPage.value = page)

  return {
    currentPage,
    getPageSize,
    getDataTotal,
    getTotalPages,
    getPaginatedMeals,
    getOneGeneralMeal,
    changePage,
    fetchGeneralMeal,
    fetchOneGeneralMeal
  }
})
