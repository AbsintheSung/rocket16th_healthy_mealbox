<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
type Option = {
  value: number
  label: string
}[]
const options = ref<Option>([
  { value: 7, label: '7餐' },
  { value: 14, label: '14餐' },
  { value: 21, label: '21餐' }
])
// const selectedPlan = ref(null)
// const selectPlan = (value) => {
//   selectedPlan.value = value
//   // 其他篩選邏輯待補
//   console.log(value)
// }
</script>
<template>
  <div class="flex justify-evenly bg-primary-base py-5 md:py-2">
    <button
      v-for="option in options"
      :key="option.value"
      :class="[
        'text-2xl font-bold text-primary-700 md:text-4xl',
        cartStore.getCaseType === option.value
          ? 'text-2xl font-bold text-white transition-all md:text-4xl'
          : 'text-2xl font-bold text-primary-700 md:text-4xl'
      ]"
      @click="cartStore.fetchChangeSelectPlan(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
<style scoped></style>
