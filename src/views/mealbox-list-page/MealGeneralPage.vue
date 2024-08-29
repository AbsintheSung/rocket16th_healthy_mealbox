<script setup>
import MealCard from '@/components/global/MealCard.vue'
import { useMealBoxStore } from '@/stores/mealbox'
const mealBoxStore = useMealBoxStore()
</script>
<template>
  <ul class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
    <MealCard
      v-for="mealItem in mealBoxStore.getPaginatedMeals"
      :key="mealItem.id"
      :mealInfo="mealItem"
    />
  </ul>
</template>
<style scoped></style>
