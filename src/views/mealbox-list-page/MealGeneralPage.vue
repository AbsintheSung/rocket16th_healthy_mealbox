<script setup>
import MealCard from '@/components/global/MealCard.vue'
import { useMealBoxStore } from '@/stores/mealbox'
import ThePagination from '@/components/global/ThePagination.vue'
const mealBoxStore = useMealBoxStore()
</script>
<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
      <MealCard
        v-for="mealItem in mealBoxStore.getPaginatedMeals"
        :key="mealItem.id"
        :mealInfo="mealItem"
      />
    </ul>
    <div class="mt-auto flex w-full items-center justify-center">
      <ThePagination
        :pagerCount="5"
        :pageSize="mealBoxStore.getPageSize"
        :pageTotal="mealBoxStore.getDataTotal"
        :changePage="mealBoxStore.changePage"
      />
    </div>
  </div>
</template>
<style scoped></style>
