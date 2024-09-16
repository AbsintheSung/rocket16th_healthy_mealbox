import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/api/apiUrl'
import { ref, computed } from 'vue'
import type { CustomMenu, } from '@/types/type'

export const useMakeCustomMealStore = defineStore('makeCustomMeal', () => {
  const mainMealDishesMenu = ref<CustomMenu[]>([]) // 主食菜單-會從後端獲取，一開始空陣列
  const sideDishesMenu = ref<CustomMenu[]>([]) // 配菜菜單-會從後端獲取，一開始空陣列
  const starchDishesMenu = ref<CustomMenu[]>([]) // 澱粉菜單-會從後端獲取，一開始空陣列


  //取得 主食菜單
  const getMainMealDishes = computed(() => {
    return mainMealDishesMenu.value.map((item) => ({
      ...item,
      composition: { ...item.composition }
    }))
  })
  //取得 配菜菜單
  const getSideDishes = computed(() => {
    return sideDishesMenu.value.map((item) => ({
      ...item,
      composition: { ...item.composition }
    }))
  })
  //取得澱粉
  const getstarchDishes = computed(() => {
    return starchDishesMenu.value.map((item) => ({
      ...item,
      composition: { ...item.composition }
    }))
  })

  const fetchCustomMenu = async () => {
    try {
      const response = await fetchApi.getCustomMenu()
      mainMealDishesMenu.value = response.data.data.filter((dish: any) => dish.dishesType === 'mainMeal')
      sideDishesMenu.value = response.data.data.filter((dish: any) => dish.dishesType === 'sideDishes')
      starchDishesMenu.value = response.data.data.filter((dish: any) => dish.dishesType === 'starch')
    } catch (error) {
      // console.log(error)
    }
  }

  const updateCustomImg = async (imgdata: any) => {
    try {
      const response = await fetchApi.customUpdateImg(imgdata)
      return response.data.data //回傳的是 圖片的路徑
    } catch (error: any) {
      throw error.response.data
    }
  }
  const featCustomMealData = async (mealData: any) => {
    try {
      const response = await fetchApi.featCustomMeal(mealData)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  return {
    getMainMealDishes,
    getSideDishes,
    getstarchDishes,
    fetchCustomMenu,
    updateCustomImg,
    featCustomMealData
  }
})
