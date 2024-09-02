<script setup>
import { ref, onMounted } from 'vue'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanCards from '@/components/nutritionist-plan-page/NutritionistPlanCards.vue'

const NutritionistPlanStore = useNutritionistPlanStore()
onMounted(async () => {
  await NutritionistPlanStore.fetchNutritionistPlans()
})

</script>
<template>
    <div class="container py-20">
        <NutritionistPlanCards />
    </div>
</template>
<style scoped></style>