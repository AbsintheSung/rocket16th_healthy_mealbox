import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { GeneralBoxes, OneGeneralBox } from '@/types/type'
const imgUrl = import.meta.env.VITE_APP_API_URL
// const imgUrl = import.meta.env.VITE_APP_API_IMG_URL
export const useGeneralMealBoxStore = defineStore('generalmealbox', () => {
  //State
  const generalMeal = ref<GeneralBoxes[]>([]) //一般餐盒資料，預設空陣列
  const filterGeneralMeal = ref<GeneralBoxes[]>([]) //篩選一般餐盒資料，預設空陣列
  const currentPage = ref(1) //當前分頁
  const pageSize = ref(10) //每頁該顯示的資料數量
  const oneGeneralMeal = ref<Partial<OneGeneralBox>>({});

  //Getter

  //取得當前頁數
  // const getCurrentPage = computed(() => currentPage.value)
  //取得獲取一般餐盒的資料總數
  const getDataTotal = computed(() => generalMeal.value.length)
  //取得所有餐盒
  const getGeneralBoxes = computed(() => {
    return generalMeal.value.map(item => ({
      ...item,
      composition: { ...item.composition },
      imgArr: [...item.imgArr],
      // imgArr: item.imgArr.map(imgPath => `${imgUrl}${imgPath}`),
    }));
  })
  //取得篩選所有餐盒
  const getFilterGeneralBoxes = computed(() => {
    return filterGeneralMeal.value.map(item => ({
      ...item,
      composition: { ...item.composition },
      imgArr: [...item.imgArr],
      // imgArr: item.imgArr.map(imgPath => `${imgUrl}${imgPath}`),
    }));
  })
  //取得單一餐盒資訊
  const getOneGeneralMeal = computed(() => {
    const item = oneGeneralMeal.value;
    return {
      ...item,
      composition: { ...item.composition },
      // imgArr: (item.imgArr || []).map(imgPath => `${imgUrl}${imgPath}`)
      imgArr: [...item.imgArr || []]
    };
  })

  //取得每頁該顯示的資料數量
  const getPageSize = computed(() => pageSize.value)
  //總頁碼共幾個
  const getTotalPages = computed(() => Math.ceil(getDataTotal.value / pageSize.value))
  //顯示在前台的 10筆資料
  const getPaginatedMeals = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return getGeneralBoxes.value.slice(start, end)
  })

  //Action

  //獲取所有一般餐盒資料
  const fetchGeneralMeal = async () => {
    try {
      const response = await fetchApi.getGeneralmeal()
      if (response.status === 200) {
        generalMeal.value = response?.data?.data || []
        filterGeneralMeal.value = response?.data?.data || []
        // console.log('一般', response.data)
        // console.log(generalMeal.value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //獲取 篩選後的所有一般餐盒資料
  const fetchFilterGeneralMeal = async (nutrients: string) => {
    try {
      const response = await fetchApi.filterGenerMealApi(nutrients)
      if (response.status === 200) {
        filterGeneralMeal.value = response?.data?.data || []
        // console.log('有篩選', response.data)
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
  const changePage = (page: any) => {
    window.scrollTo({
      top: 0
      // behavior: 'smooth' // 可選，讓滾動有平滑過渡效果
    })
    currentPage.value = page
  }

  return {
    currentPage,
    getPageSize,
    getDataTotal,
    getTotalPages,
    getPaginatedMeals,
    getOneGeneralMeal,
    getGeneralBoxes,
    getFilterGeneralBoxes,
    changePage,
    fetchGeneralMeal,
    fetchOneGeneralMeal,
    fetchFilterGeneralMeal
  }
})
