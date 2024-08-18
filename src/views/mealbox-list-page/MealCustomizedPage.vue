<script setup>
import MealCard from '@/components/global/mealCard.vue'
</script>
<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
      <MealCard v-for="item in 6" :key="item" />
    </ul>
  </div>
</template>
<style scoped></style>
