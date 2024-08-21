<script setup>
import { ref } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'

const steps = ref(['購物車', '填寫資料', '訂單確認'])
const currentStep = ref(1) 

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value++
  }
}

</script>
<template>
    <div class="grid grid-cols-12 gap-6 md:-mx-3">
        <div class="col-start-5 col-span-4">
            <ShoppingCartProgressBar :current-step="currentStep" :steps="steps"/>
        </div>
        <div class="col-span-12">
            購物車
        </div>
        <div class="col-span-8">
            選擇送貨方式及付款方式
        </div>
        <div class="col-start-9 col-span-4">
            選擇送貨方式及付款方式2
        </div>
    </div>
</template>
<style scoped></style>