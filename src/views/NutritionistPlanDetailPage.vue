<script setup>
import { computed,onMounted } from 'vue'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanDetailInfo from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailInfo.vue'
import NutritionistPlanDetailCard from '@/components/nutritionist-plan-detail-page/NutritionistPlanDetailCard.vue'
const nutritionistPlanStore = useNutritionistPlanStore()
const onePlanData = computed(() => nutritionistPlanStore.getOneNutritionistPlan)

onMounted(async () => {
  await nutritionistPlanStore.fetchOneNutritionistPlan(route.params.id)
})
</script>
<template>
    <div class="container py-14">
        <NutritionistPlanDetailInfo/>
        <NutritionistPlanDetailCard/>
        <!-- <NutritionistPlanDetailInfo />
        <NutritionistPlanDetailCard /> -->
    </div>
</template>
<style scoped>
</style>