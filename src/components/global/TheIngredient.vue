<script setup>
defineProps({
  ingredientData: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
    <li
      v-for="(item, index) in ingredientData"
      :key="item.name"
      class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
      :class="[
        index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
        index % 3 === 0 ? 'md:border-l' : 'border-l',
        (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
        'md:border-x',
        { 'md:first:border-l-0': index === 0 },
        { 'md:last:border-r-0': index === ingredientData.length - 1 }
      ]"
    >
      <h3>{{ item.name }}</h3>
      <p>{{ item.value }}</p>
    </li>
  </ul>
</template>
<style scoped></style>
