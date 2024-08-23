<script setup>
import { ref } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'

//購物車狀態列函式
const steps = ref(['購物車', '填寫資料', '訂單確認'])
const activeStep = ref(3)

</script>
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- 購物車步驟 -->
        <div class="col-start-5 col-span-4 pb-4">
            <ShoppingCartProgressBar :active-step="activeStep" :steps="steps" />
        </div>
        <!-- 訂單已成立框框 -->
        <div class="col-span-12">
            <div class="flex flex-col justify-center items-center border-2 border-black">
                <div class="flex justify-center items-center pt-7 pb-3">
                    <img src="@/assets/image/營養師.svg" alt="logo" class="w-[50px]">
                    <h2 class="text-2xl text-bold pl-5">謝謝您！您的訂單已成立！</h2>
                </div>
                <div class="text-left pl-11 pb-8">
                    <p>訂單號碼：202407311130088332</p>
                    <p>訂單確認電郵已發送到您的電子信箱：</p>
                    <p>hello@gmail.com</p>
                </div>
            </div>
        </div>
        <!-- 訂單資訊框框 -->
        <div class="col-span-12 pt-6">
            <div class="flex flex-wrap border-2 border-black p-4">
                <!-- 訂單資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <h2 class="font-bold text-2xl mb-2">訂單資訊</h2>
                    <div class="flex mb-1">
                        <span>訂單編號：</span>
                        <span>202407311130088332</span>
                    </div>
                    <div class="flex">
                        <span>訂單建立時間：</span>
                        <span>2024-07-31 11:30</span>
                    </div>
                </div>

                <!-- 顧客資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <h2 class="font-bold text-2xl mb-2">顧客資訊</h2>
                    <div class="flex mb-1">
                        <span>姓名：</span>
                        <span>林飯糰</span>
                    </div>
                    <div class="flex">
                        <span>電話號碼：</span>
                        <span>222 *** 666</span>
                    </div>
                </div>

                <!-- 送貨資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <h2 class="font-bold text-2xl mb-2">送貨資訊</h2>
                    <div class="flex">
                        <span>送貨方式：</span>
                        <span>宅配 新竹物流</span>
                    </div>
                </div>

                <!-- 付款資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <div class="">
                        <h2 class="font-bold text-2xl mb-2">付款資訊</h2>
                        <div class="flex mb-1">
                            <span>付款方式：</span>
                            <span>信用卡付款</span>
                        </div>
                        <div class="flex">
                            <span>付款狀態：</span>
                            <span>已付款</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部按鈕 -->
        <div class="col-start-11 col-span-2">
            <RouterLink
                class="flex items-center justify-between bg-secondary-400 py-2 px-4 mt-14 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none"
                to="/">
                <p>回到首頁</p>
                <font-awesome-icon :icon="['fas', 'caret-right']" />
            </RouterLink>
        </div>
    </div>
</template>
<style scoped></style>