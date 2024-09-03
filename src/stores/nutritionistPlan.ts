import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'

export const useNutritionistPlanStore = defineStore('nutritionistPlan', () => {
    //State
    const nutritionistPlans = ref([]) // 所有營養師方案資料，預設空陣列
    const currentPage = ref(1) // 當前分頁
    const pageSize = ref(9) // 每頁顯示的資料數量
    const oneNutritionistPlan = ref({}) // 單一營養師方案的資料

    // Getters

    // 取得營養師方案總數
    const getDataTotal = computed(() => nutritionistPlans.value.length)
    // 取得單一營養師方案資訊
    const getOneNutritionistPlan = computed(() => oneNutritionistPlan.value)
    // 取得每頁顯示的資料數量
    const getPageSize = computed(() => pageSize.value)
    // 計算總頁數
    const getTotalPages = computed(() => Math.ceil(getDataTotal.value / pageSize.value))
    // 分頁顯示的營養師方案資料
    const getPaginatedPlans = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        return nutritionistPlans.value.slice(start, end)
    })

    // Actions

    // 獲取所有營養師方案資料
    const fetchNutritionistPlans = async () => {
        try {
            const response = await fetchApi.nutritionistPlan()
            if (response.status === 200) {
                nutritionistPlans.value = response?.data?.data || []
                console.log(response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // 獲取單一營養師方案資料
    const fetchOneNutritionistPlan = async (id: any) => {
        try {
            const response = await fetchApi.nutritionistPlanOne(id)
            if (response.status === 200) {
                oneNutritionistPlan.value = response?.data?.data || {}
            }
        } catch (error) {
            console.error(error)
        }
    }

    // 變更當前頁碼
    const changePage = (page: any) => {
        currentPage.value = page
    }

    return {
        currentPage,
        getPageSize,
        getDataTotal,
        getTotalPages,
        getPaginatedPlans,
        getOneNutritionistPlan,
        changePage,
        fetchNutritionistPlans,
        fetchOneNutritionistPlan
    }
})