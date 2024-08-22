<script lang="ts" setup>
import { ref } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'

const steps = ref(['購物車', '填寫資料', '訂單確認'])
const currentStep = ref(2)
const nextStep = () => {
    if (currentStep.value < steps.value.length) {
        currentStep.value++
    }
}
</script>
<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-start-5 col-span-4 pb-4">
            <ShoppingCartProgressBar :current-step="currentStep" :steps="steps" />
        </div>
        <div class="col-span-12">
            合計
        </div>
        <div class="col-span-6">
            顧客資料
        </div>
        <div class="col-start-7 col-span-6">
            送貨資料
        </div>
        <div class="col-span-6">
            訂單備註
        </div>
        <div class="col-start-7 col-span-6">
            付款資料
        </div>
    </div>
</template>
<style scoped></style>