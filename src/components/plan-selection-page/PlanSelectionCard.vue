<script setup>
</script>
<template>
    <!-- 方案選擇區塊 -->
    <div class="grid grid-cols-12 gap-6">
        <!-- 營養師方案 -->
        <div class="flex flex-col justify-evenly col-span-4 col-start-2">
            <div class="flex justify-center">
                <img src="@/assets/image/營養師.svg" alt="營養師方案" class="w-fit pb-2">
            </div>
            <div class="relative">
                <h3 class="py-8 text-3xl font-medium text-center">營養師方案</h3>
                <img src="@/assets/image/Ellipse 1.svg" alt=""
                    class="w-fit absolute left-1/2 transform -translate-x-1/2 -translate-y-20 -z-10">
            </div>
            <p class="text-center mb-4">由專業營養師依照成人一日所需搭配餐盒</p>
            <div class="flex flex-row flex-nowrap justify-center pb-24">
                <ul class="space-y-2">
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>想要快快決定吃什麼的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>不想花時間思考餐盒搭配的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon :icon="['fas', 'check']" /></span>有選擇困難症的人
                        </p>
                    </li>
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>口頭禪是「都可以，你決定就好～」的P人</p>
                    </li>
                </ul>
            </div>
            <div class="flex justify-center">
                <button class="order-btn">
                    <p>直接訂購</p>
                </button>
            </div>
        </div>
        <!-- 自定義方案 -->
        <div class="flex flex-col justify-evenly col-span-4 col-start-8">
            <div class="flex justify-center">
                <img src="@/assets/image/自定義.svg" alt="自定義方案" class="w-fit">
            </div>
            <h3 class="py-8 text-3xl font-medium text-center">自定義方案</h3>
            <p class="text-center mb-4">由您挑選喜歡的餐盒，不喜歡還能自定義餐盒！</p>
            <div class="flex flex-row flex-nowrap justify-center pb-24">
                <ul class="space-y-2">
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>有點小挑食，會精挑細選的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>想要慢慢決定吃什麼的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>沒有選擇困難症的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>口頭禪是「就這麼決定了！」的J人</p>
                    </li>
                </ul>
            </div>
            <div class="flex justify-center">
                <button class="order-btn">
                    <p>直接訂購</p>
                </button>
            </div>
        </div>
    </div>
    <div class="relative -z-10 overflow-visible pointer-events-none mb-20">
        <img src="@/assets/image/Star 3.svg" alt="" class="w-fit absolute left-20 top-2">
        <img src="@/assets/image/Star 2.svg" alt="" class="w-fit absolute left-4 top-12">
    </div>
</template>
<style scoped>
.order-btn {
    width: 80%;
    border-radius: 0.375rem;
    border-width: 2px;
    border-color: #FE7F5F;
    color: #FE7F5F;
    background-color: #fff;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    &:hover {
        border-color: #000;
        color: #000;
        background-color: #FE7F5F;
        transition: .3s;
    }
}
</style>