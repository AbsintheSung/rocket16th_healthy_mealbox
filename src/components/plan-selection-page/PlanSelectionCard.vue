<script setup>
</script>
<template>
    <!-- 方案選擇區塊 -->
    <div class="grid grid-cols-4 gap-3 md:grid-cols-12 md:gap-6">
        <!-- 營養師方案 -->
        <section class="flex flex-col col-span-4 md:col-start-3">
            <!-- 卡片上方欄位 -->
            <div class="flex justify-between items-center border-2 border-black rounded-t bg-primary-300 px-4 py-3">
                <ul class="flex gap-2">
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#F15159]"></li>
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#FDCF00]"></li>
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#2DD46F]"></li>
                </ul>
                <h3 class="font-bold md:hidden">營養師方案</h3>
            </div>
            <!-- 營養師方案卡片 -->
            <div class="flex flex-col items-center justify-center border-2 border-black rounded-b py-9">
                <div class="text-center flex justify-center items-center border-2 border-black rounded-full w-20 h-20 mb-4">
                    <TheSvg svgIcon="nutritionist-icon" class="w-[50px] h-[50px]" />
                </div>
                <!-- <div class="relative">
                    <h3 class="py-12 text-2xl font-bold text-center">營養師方案</h3>
                    <TheSvg svgIcon="hendecagon"
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-auto hidden w-[290px] -z-10 md:block" />
                </div> -->
                <p class="text-center mb-4 font-medium">由專業營養師依照成人<br>一日所需營養素搭配餐盒</p>
                <div class="flex flex-row flex-nowrap justify-center pb-12">
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
                        class="text-center py-5 px-28 border-2 border-secondary-900 rounded hover:border-2 hover:bg-secondary-400 hover:border-black hover:shadow-base hover:transition active:shadow-none"
                        to="/nutritionist-plan">
                        <p>直接訂購</p>
                    </RouterLink>
                </div>
            </div>
        </section>
        <!-- 自定義方案 -->
        <section class="flex flex-col justify-evenly col-span-4 md:col-start-7">
            <!-- 卡片上方欄位 -->
            <div class="border-2 border-black rounded-t bg-primary-300 px-4 py-3">
                <ul class="flex gap-2">
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#F15159]"></li>
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#FDCF00]"></li>
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#2DD46F]"></li>
                </ul>
                <h3 class="font-bold md:hidden">自定義方案</h3>
            </div>
            <!-- 自定義方案卡片 -->
            <div class="border-2 border-black rounded-b py-9">
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
            </div>

        </section>
    </div>
    <!-- 裝飾性圖片 -->
    <TheSvg svgIcon="polygon" class="mt-auto hidden w-[160px] md:block" />
</template>
<style scoped></style>