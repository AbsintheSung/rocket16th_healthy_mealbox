<script setup>
import MealCard from '@/components/global/MealCard.vue'
import ThePagination from '@/components/global/ThePagination.vue'
</script>
<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
      <MealCard v-for="item in 6" :key="item" />
    </ul>
    <div class="mt-auto flex w-full items-center justify-center">
      <ThePagination />
    </div>
  </div>
</template>
<style scoped></style>
