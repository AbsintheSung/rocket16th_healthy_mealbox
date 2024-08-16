<script setup>
</script>
<template>
    <div>我是header</div>
    <!-- 方案天數選擇區塊 -->
    <div class="bg-el-primary flex justify-evenly text-4xl font-bold py-2">
        <button>7餐</button>
        <button>14餐</button>
        <button>21餐</button>
    </div>
    <!-- 方案選擇區塊 -->
    <div class="container py-20">
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-4 col-start-2">
                <div class="flex justify-center">
                    <img src="@/assets/image/營養師.svg"
                        alt="營養師方案" class="w-fit">
                </div>
                <h3 class="py-8 text-3xl font-medium text-center">營養師方案</h3>
                <p class="text-center mb-4">由專業營養師依照成人一日所需搭配餐盒</p>
                <div class="flex flex-row flex-nowrap justify-center pb-24">
                    <ul class="space-y-2">
                        <li>
                            <p><span>✔️</span>想要快快決定吃什麼的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>不想花時間思考餐盒搭配的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>有選擇困難症的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>口頭禪是「都可以，你決定就好～」的P人</p>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center">
                    <button class="w-4/5 rounded-md border-2 px-4 py-3">
                        <p>直接訂購</p>
                    </button>
                </div>
            </div>
            <div class="col-span-4 col-start-8">
                <div class="flex justify-center">
                    <img src="@/assets/image/自定義.svg"
                        alt="自定義方案" class="w-fit">
                </div>
                <h3 class="py-8 text-3xl font-medium text-center">自定義方案</h3>
                <p class="text-center mb-4">由您挑選喜歡的餐盒，不喜歡還能自定義餐盒！</p>
                <div class="flex flex-row flex-nowrap justify-center pb-28">
                    <ul class="space-y-2">
                        <li>
                            <p><span>✔️</span>有點小挑食，會精挑細選的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>想要慢慢決定吃什麼的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>沒有選擇困難症的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>口頭禪是「就這麼決定了！」的J人</p>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center">
                    <button class="w-4/5 rounded-md border-2 px-4 py-3">
                        <p>直接訂購</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div>我是footer</div>

</template>
<style scoped>
</style>