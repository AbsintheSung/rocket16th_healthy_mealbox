<script setup>
import { ref } from 'vue'
const options = [
    { value: 7, label: '7餐' },
    { value: 14, label: '14餐' },
    { value: 21, label: '21餐' },
]
const selectedPlan = ref(null)
const selectPlan = (value) => {
    selectedPlan.value = value
    // 其他篩選邏輯待補
    console.log(value)
}
</script>
<template>
    <div class="bg-primary-base flex justify-evenly py-2">
        <button v-for="option in options" :key="option.value"
            :class="['text-4xl text-primary-700 font-bold', 
            selectedPlan === option.value ? 'text-4xl text-white font-bold transition-all':'text-4xl text-primary-700 font-bold']"
            @click=" selectPlan(option.value)">
            {{ option.label }}
        </button>
    </div>
</template>
<style scoped></style>