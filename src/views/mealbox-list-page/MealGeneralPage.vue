<script setup>
import MealCard from '@/components/global/MealCard.vue'
import ThePagination from '@/components/global/ThePagination.vue'
import { useGeneralMealBoxStore } from '@/stores/generalMealbox'
const generalMealBoxStore = useGeneralMealBoxStore()
</script>
<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
      <MealCard
        v-for="mealItem in generalMealBoxStore.getPaginatedMeals"
        :key="mealItem.id"
        :mealInfo="mealItem"
      />
    </ul>
    <div class="mt-auto flex w-full items-center justify-center">
      <ThePagination
        v-model:currentPageNum="generalMealBoxStore.currentPage"
        :pagerCount="5"
        :pageSize="generalMealBoxStore.getPageSize"
        :pageTotal="generalMealBoxStore.getDataTotal"
        :changePage="generalMealBoxStore.changePage"
      />
    </div>
  </div>
</template>
<style scoped></style>
