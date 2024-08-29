<script setup>
</script>
<template>
    <div class="grid grid-cols-4 md:grid-cols-12 gap-6">
        <div class="col-span-4 md:col-span-8">
            <div class="border-2 border-black">
                <div class="flex items-center py-2 border-b border-black bg-primary-300">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="px-3 md:pl-6 pr-2" />
                    <p class="font-bold text-sm md:text-base">購物車</p>
                </div>
                <div class="p-3 border-b border-black md:p-6">
                    <div class="flex justify-between items-center pb-3 sm:pb-6">
                        <h3 class="text-sm text-primary-600 md:text-2xl">訂餐計畫 14餐</h3>
                        <button class="text-black hover:text-secondary-400 transition">
                            <font-awesome-icon :icon="['fas', 'trash']"/>
                        </button>
                    </div>
                    <!-- 套餐細項 -->
                    <div class="pr-8 text-sm md:pr-28 md:text-base">
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p>自定義餐盒 (1) </p>
                            <span>NT$160</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center border-b border-black text-sm px-3 py-5 md:py-7 md:pl-6 md:pr-12 md:text-base">
                    <h4 class="text-primary-600 md:text-2xl">已享用之優惠</h4>
                    <p>全店商品滿1000免運</p>
                </div>
                <div class="flex justify-end items-center py-2 px-2 text-sm md:py-6 md:px-12 md:text-base">
                    <p>商品金額：</p>
                    <p class="text-secondary-500">NT $1460 </p>
                </div>
            </div>
        </div>
        <div class="col-span-4 md:col-start-9 text-base -mt-3">
            <div class="border-2 border-black px-3 py-9 md:px-6">
                <div class="flex justify-between pb-6 border-b border-black md:text-xl">
                    <p>商品金額</p>
                    <p>NT$1460</p>
                </div>
                <div class="flex justify-between pt-6 pb-6 border-b border-black md:text-xl md:pt-9">
                    <p>運費</p>
                    <p>免運</p>
                </div>
                <div class="flex justify-between pt-6 pb-6 border-b border-black md:text-xl md:pt-9">
                    <p>合計</p>
                    <p>NT$1460</p>
                </div>
                <div class="pt-6 md:pt-28">
                    <RouterLink
                        class="flex items-center justify-center text-center py-2 px-4 bg-secondary-400 rounded border-2 border-black hover:shadow-base transition active:shadow-none"
                        to="/checkout/shipping-payment">
                        <p>前往結帳購物車</p>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="col-start-1 col-span-2 pt-3 md:pt-12">
            <RouterLink
                class="flex items-center py-2 px-4 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none"
                to="/mealboxlist">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2" />
                <p>繼續購物</p>
            </RouterLink>
        </div>
    </div>
</template>
<style scoped></style>