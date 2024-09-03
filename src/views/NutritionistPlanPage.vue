<script setup>
import { onMounted, ref } from 'vue'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanCards from '@/components/nutritionist-plan-page/NutritionistPlanCards.vue'

const nutritionistPlanStore = useNutritionistPlanStore()
const isLoading = ref(true)

onMounted(async () => {
  console.log('NutritionistPlanPage mounted')
  if (nutritionistPlanStore.getDataTotal === 0) {
    try {
      console.log('Fetching nutritionist plans...')
      await nutritionistPlanStore.fetchNutritionistPlans()
      console.log('Fetch completed')
      console.log('Fetched plans:', nutritionistPlanStore.getPaginatedPlans)
    } catch (error) {
      console.error('Failed to fetch nutritionist plans:', error)
    }
  } else {
    console.log('Plans already loaded')
  }
  console.log('Setting isLoading to false')
  isLoading.value = false
})
</script>

<template>
  <div class="container py-20">
    <div v-if="isLoading">Loading...</div>
    <NutritionistPlanCards v-else />
  </div>
</template>

<style scoped></style>