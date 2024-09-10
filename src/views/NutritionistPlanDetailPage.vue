<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'
import { useCartStore } from '@/stores/cart'
import NutritionistPlanDetailInfo from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailInfo.vue'
import NutritionistPlanDetailCard from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailCard.vue'

import { ElMessage, ElLoading } from 'element-plus'


const route = useRoute()
const cartStore = useCartStore()
const nutritionistPlanStore = useNutritionistPlanStore()
const onePlanData = computed(() => nutritionistPlanStore.getOneNutritionistPlan)

const generalMealBoxStore = useGeneralMealBoxStore()
const mealBoxesData = ref([])

// 分割學歷回傳資料
const formattedOnePlanData = computed(() => {
  if (!onePlanData.value) return {}

  return {
    ...onePlanData.value,
    nutritionistSeniority: onePlanData.value.nutritionistSeniority
      ? onePlanData.value.nutritionistSeniority.split('，').join('\n')
      : ''
  }
})

// 取得營養師資料內boxs的id
const fetchMealBoxesDetails = async () => {
  if (onePlanData.value && onePlanData.value.boxes) {
    const boxIds = onePlanData.value.boxes
    mealBoxesData.value = await Promise.all(
      boxIds.map(async (id) => {
        try {
          await generalMealBoxStore.fetchOneGeneralMeal(id)
          const mealData = generalMealBoxStore.getOneGeneralMeal
          return mealData
        } catch (error) {
          return null
        }
      })
    )
    //若獲取餐盒ID失敗，過濾此失敗ID
    mealBoxesData.value = mealBoxesData.value.filter(meal => meal !== null)
  } else {
    console.log('無法獲取餐盒 ID！')
  }
}

//新增至購物車
const addToCart = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: '加入購物車中...',
  })
  try {
    const planId = Number(route.params.id)
    const result = await cartStore.addNutritionistPlanToCart(planId)
    if (result === "success") {
      ElMessage.success('成功加入購物車')
    } else if (result === "cartFull") {
      ElMessage.warning('購物車已滿')
    }
  } catch (error) {
    console.error('加入購物車失敗:', error)
    ElMessage.error('加入購物車失敗，請稍後再試')
  } finally {
    loading.close()
  }
}


onMounted(async () => {
  await nutritionistPlanStore.fetchOneNutritionistPlan(route.params.id)
  await fetchMealBoxesDetails()
})

// 初始化餐盒數據
watch(onePlanData, async (newValue) => {
  if (newValue && newValue.boxes) {
    await fetchMealBoxesDetails()
  }
}, { deep: true })

</script>
<template>
  <div class="container py-14">
    <NutritionistPlanDetailInfo :onePlanInfo="formattedOnePlanData" />
    <NutritionistPlanDetailCard :onePlanInfo="formattedOnePlanData" :mealBoxesData="mealBoxesData" />
    <div class="text-center pt-12">
      <button @click="addToCart"
        class="bg-secondary-base border-2 border-black rounded px-3 py-4 hover:shadow-base transition active:shadow-none">
        <p>將此方案加入購物車</p>
      </button>
    </div>
  </div>
</template>
<style scoped></style>