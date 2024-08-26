<script setup>
</script>
<template>
    <!-- 方案選擇區塊 -->
    <div class="grid grid-cols-12 gap-6">
        <!-- 營養師方案 -->
        <section class="flex flex-col justify-evenly col-span-4 col-start-2">
            <div class="flex justify-center">
                <TheSvg svgIcon="nutritionist-icon" class="mt-auto hidden w-[100px] h-[108px] md:block" />
            </div>
            <div class="relative">
                <h3 class="py-12 text-3xl font-medium text-center">營養師方案</h3>
                <!-- 裝飾性圖片 -->
                <TheSvg svgIcon="hendecagon"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-auto hidden w-[250px] -z-10 md:block" />
            </div>
            <p class="text-center mb-4">由專業營養師依照成人一日所需營養素搭配餐盒</p>
            <div class="flex flex-row flex-nowrap justify-center pb-16">
                <ul class="space-y-2">
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>想要快快決定吃什麼的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>不想花時間思考餐盒搭配的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>有選擇困難症的人
                        </p>
                    </li>
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>口頭禪是「都可以，你決定就好～」的P人</p>
                    </li>
                </ul>
            </div>
            <div class="flex justify-center items-center">
                <RouterLink
                    class="text-center w-4/5 py-5 border-2 border-black bg-secondary-base rounded hover:shadow-base transition active:shadow-none"
                    to="/nutritionist-plan">
                    <p>直接訂購</p>
                </RouterLink>
            </div>
        </section>
        <!-- 自定義方案 -->
        <section class="flex flex-col justify-evenly col-span-4 col-start-8">
            <div class="flex justify-center">
                <TheSvg svgIcon="customize-icon" class="mt-auto hidden w-[100px] h-[108px] md:block" />
            </div>
            <div class="relative">
                <h3 class="py-12 text-3xl font-medium text-center">自定義方案</h3>
                <!-- 裝飾性圖片 -->
                <TheSvg svgIcon="ovalShape"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-auto hidden w-[200px] -z-10 md:block" />
            </div>
            <p class="text-center mb-4">由您挑選喜歡的餐盒，不喜歡還能自定義餐盒！</p>
            <div class="flex flex-row flex-nowrap justify-center pb-16">
                <ul class="space-y-2">
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>有點小挑食，會精挑細選的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>想要慢慢決定吃什麼的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>沒有選擇困難症的人</p>
                    </li>
                    <li>
                        <p><span class="text-primary-base pr-1"><font-awesome-icon
                                    :icon="['fas', 'check']" /></span>口頭禪是「就這麼決定了！」的J人</p>
                    </li>
                </ul>
            </div>
            <div class="flex justify-center items-center">
                <RouterLink
                    class="text-center w-4/5 py-5 border-2 border-black bg-secondary-base rounded hover:shadow-base transition active:shadow-none"
                    to="/mealboxlist">
                    <p>直接訂購</p>
                </RouterLink>
            </div>
        </section>
    </div>
    <!-- 裝飾性圖片 -->
    <TheSvg svgIcon="polygon" class="mt-auto hidden w-[160px] md:block" />
</template>
<style scoped></style>