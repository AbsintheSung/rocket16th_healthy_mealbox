<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'
import NutritionistPlanDetailInfo from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailInfo.vue'
import NutritionistPlanDetailCard from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailCard.vue'

const route = useRoute()
const nutritionistPlanStore = useNutritionistPlanStore()
const onePlanData = computed(() => nutritionistPlanStore.getOneNutritionistPlan)
console.log(onePlanData)

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

//測試區域：取得營養師資料id
//全部都是undefined 就跟我的未來一樣 再搞沒意思了 修別的東西去了...-09/06 01:53
const fetchMealBoxesDetails = async () => {
  if (onePlanData.value && onePlanData.value.boxes) {
    const boxIds = onePlanData.value.boxes;
    console.log('Box IDs to fetch:', boxIds);
    mealBoxesData.value = await Promise.all(
      boxIds.map(async (id) => {
        const mealData = await generalMealBoxStore.fetchOneGeneralMeal(id);
        console.log(`Fetched data for meal ${id}:`, mealData);
        return mealData;
      })
    );
    console.log('All fetched meal boxes data:', mealBoxesData.value);
  } else {
    console.log('No box IDs available in onePlanData');
  }
}

onMounted(async () => {
  console.log('Component mounted, fetching nutritionist plan')
  await nutritionistPlanStore.fetchOneNutritionistPlan(route.params.id)
  console.log('Nutritionist plan fetched, now fetching meal boxes')
  await fetchMealBoxesDetails()
});

watch(() => nutritionistPlanStore.getOneNutritionistPlan, (newValue) => {
  console.log('onePlanData updated:', newValue)
  if (newValue && newValue.boxes) {
    console.log('Boxes in onePlanData:', newValue.boxes)
    fetchMealBoxesDetails()
  }
}, { immediate: true, deep: true })

</script>
<template>
  <div class="container py-14">
    <NutritionistPlanDetailInfo :onePlanInfo="formattedOnePlanData" />
    <NutritionistPlanDetailCard :onePlanInfo="formattedOnePlanData" :mealBoxesData="mealBoxesData" />
  </div>
</template>
<style scoped></style>