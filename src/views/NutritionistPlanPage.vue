<script setup>
import { onMounted } from 'vue'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanCards from '@/components/nutritionist-plan-page/NutritionistPlanCards.vue'

const nutritionistPlanStore = useNutritionistPlanStore()

onMounted(async () => {
  await nutritionistPlanStore.fetchNutritionistPlans()
})
</script>

<template>
  <div class="container py-12 md:py-20">
    <NutritionistPlanCards />
  </div>
</template>

<style scoped></style>