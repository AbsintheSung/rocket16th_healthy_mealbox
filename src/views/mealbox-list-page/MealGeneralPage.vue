<script setup>
import MealCard from '@/components/global/mealCard.vue'
</script>
<template>
  <ul class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
    <MealCard v-for="item in 8" :key="item" />
  </ul>
</template>
<style scoped></style>
