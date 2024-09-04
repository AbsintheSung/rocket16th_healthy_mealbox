<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanDetailInfo from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailInfo.vue'
import NutritionistPlanDetailCard from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailCard.vue'

const route = useRoute()
const nutritionistPlanStore = useNutritionistPlanStore()
const onePlanData = computed(() => nutritionistPlanStore.getOneNutritionistPlan)

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

onMounted(async () => {
  nutritionistPlanStore.fetchOneNutritionistPlan(route.params.id)
})

</script>
<template>
  <div class="container py-14">
    <NutritionistPlanDetailInfo :onePlanInfo="formattedOnePlanData" />
    <NutritionistPlanDetailCard :onePlanInfo="onePlanData" />
  </div>
</template>
<style scoped></style>