import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
export const useCustomMealBoxStore = defineStore('custommealbox', () => {
    //State
    const customMeal = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]) //自定義餐盒資料，預設空陣列
    const currentPage = ref(1) //當前分頁
    const pageSize = ref(10) //每頁該顯示的資料數量
    const oneCustomMeal = ref({})

    //Getter

    //取得當前頁數
    // const getCurrentPage = computed(() => currentPage.value)
    //取得獲取一般餐盒的資料總數
    const getDataTotal = computed(() => customMeal.value.length)
    //取得單一餐盒資訊
    const getOneCustomMeal = computed(() => oneCustomMeal.value)
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

    //Action

    //獲取所有一般餐盒子資料



    //傳遞頁碼，觸發更動
    const changePage = (page: any) => (currentPage.value = page)

    return {
        currentPage,
        getDataTotal,
        getOneCustomMeal,
        getPageSize,
        getTotalPages,
        getPaginatedMeals,
        changePage
    }
})
