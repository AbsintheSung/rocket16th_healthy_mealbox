<script setup>
const emit = defineEmits(['select-nutritionist-plan', 'select-custom-plan'])

const selectNutritionistPlan = () => {
    emit('select-nutritionist-plan', '/nutritionist-plan')
}

const selectCustomPlan = () => {
    emit('select-custom-plan', '/mealboxlist')
}
</script>
<template>
    <!-- 方案選擇區塊 -->
    <div class="grid grid-cols-4 gap-3 md:grid-cols-12 md:gap-6">
        <!-- 營養師方案 -->
        <section class="flex flex-col col-span-4 mb-9 md:col-start-3 md:mb-0">
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
            <div
                class="flex flex-col items-center justify-center border-2 border-black rounded-b px-3 py-9 relative bg-background-style-3 bg-cover md:bg-none">
                <div
                    class="text-center flex justify-center items-center border-2 border-black bg-white rounded-full w-20 h-20 mb-4">
                    <TheSvg svgIcon="nutritionist-icon" class="w-[50px] h-[50px]" />
                </div>
                <!-- 營養師方案標籤 -->
                <div class="hidden justify-center items-center absolute top-0 -left-1/3 transform -translate-x-1/2 md:flex"
                    style="transform: rotate(-15deg);">
                    <div
                        class="relative flex items-center justify-center w-[150px] h-[150px] transition-all duration-300 ease-in-out lg:w-[230px] lg:h-[230px]">
                        <h3 class="text-base font-bold text-center z-10 absolute transform transition-all duration-300 ease-in-out lg:text-2xl"
                            style="transform: rotate(-10deg);">
                            營養師方案
                        </h3>
                        <TheSvg svgIcon="hendecagon" class="absolute w-full h-full -z-10" />
                    </div>
                </div>
                <p class="text-center mb-4 font-medium">由專業營養師依照成人<br>一日所需搭配餐盒</p>
                <div class="flex flex-row flex-wrap justify-center pb-12">
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
                    <button @click="selectNutritionistPlan"
                        class="text-center py-5 px-24 border-2 border-secondary-900 text-secondary-900 bg-white rounded hover:border-2 hover:bg-secondary-400 hover:text-black hover:border-black hover:shadow-base hover:transition active:shadow-none lg:px-28">
                        <p>直接訂購</p>
                    </button>
                </div>
            </div>
        </section>
        <!-- 自定義方案 -->
        <section class="flex flex-col col-span-4 md:col-start-7">
            <!-- 卡片上方欄位 -->
            <div class="flex justify-between items-center border-2 border-black rounded-t bg-primary-300 px-4 py-3">
                <ul class="flex gap-2">
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#F15159]"></li>
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#FDCF00]"></li>
                    <li class="border-2 border-black rounded-full h-4 w-4 bg-[#2DD46F]"></li>
                </ul>
                <h3 class="font-bold md:hidden">自定義方案</h3>
            </div>
            <!-- 自定義方案卡片 -->
            <div
                class="flex flex-col items-center justify-center border-2 border-black rounded-b px-3 py-9 relative bg-background-style-3 bg-cover md:bg-none">
                <div
                    class="text-center flex justify-center items-center border-2 border-black bg-white rounded-full w-20 h-20 mb-4">
                    <TheSvg svgIcon="customize-icon" class="w-[50px] h-[50px]" />
                </div>
                <!-- 自定義方案標籤 -->
                <div class="hidden justify-center items-center absolute top-[20%] -right-1/3 transform -translate-x-1/2 md:flex"
                    style="transform: rotate(20deg);">
                    <div
                        class="relative flex items-center justify-center w-[150px] h-[150px] transition-all duration-300 ease-in-out lg:w-[230px] lg:h-[230px]">
                        <h3 class="text-base font-bold text-center z-10 absolute transform transition-all duration-300 ease-in-out lg:text-2xl"
                            style="transform: rotate(-5deg);">
                            自定義方案
                        </h3>
                        <TheSvg svgIcon="hendecagon" class="absolute w-full h-full -z-10" />
                    </div>
                </div>
                <p class="text-center mb-4 font-medium">由您挑選喜歡的餐盒，<br>不喜歡還能自定義餐盒！</p>
                <div class="flex flex-row flex-nowrap justify-center pb-12">
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
                    <button @click="selectCustomPlan"
                        class="text-center py-5 px-24 border-2 border-secondary-900 text-secondary-900 bg-white rounded hover:border-2 hover:bg-secondary-400 hover:text-black hover:border-black hover:shadow-base hover:transition active:shadow-none lg:px-28">
                        <p>直接訂購</p>
                    </button>
                </div>
            </div>

        </section>
    </div>
</template>
<style scoped></style>