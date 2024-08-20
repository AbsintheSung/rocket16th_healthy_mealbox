<script setup>
</script>
<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-8">
            <div class="border-2 border-black">
                <div class="flex items-center py-2 border-b border-black">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="pl-6 pr-2" />
                    <p>購物車</p>
                </div>
                <div class="p-6 border-b border-black">
                    <div class="flex justify-between items-center pb-6">
                        <h3 class="text-2xl text-primary-600">訂餐計畫 14餐</h3>
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </div>
                    <!-- 套餐細項 -->
                    <div class="pr-28">
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">健康套餐A</p>
                            <span>NT$100</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-primary-600">自定義餐盒 (1) </p>
                            <span>NT$160</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center border-b border-black pt-6 pb-12 pl-6 pr-12">
                    <h4 class="text-2xl text-primary-600">已享用之優惠</h4>
                    <p>全店商品滿1000免運</p>
                </div>
                <div class="flex justify-end items-center py-6 px-12">
                    <p>商品金額：</p>
                    <p class="text-secondary-500">NT $1460 </p>
                </div>
            </div>
        </div>
        <div class="col-start-9 col-span-3">右邊區塊</div>
        <div class="col-start-1 col-span-2 pt-24">
            <RouterLink class="flex items-center py-2 px-4 border-2 border-black hover:shadow-base transition active:shadow-none" to="/mealboxlist">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2"/>
                <p>繼續購物</p>
            </RouterLink>
        </div>
    </div>
</template>
<style scoped></style>