<script setup>
</script>
<template>
    <main class="container py-12 md:py-20">
        <h3
            class="mb-7 hidden rounded bg-primary-300 px-24 py-5 text-2xl font-bold border-2 border-black shadow-base md:block md:w-fit">
            使用方式</h3>
        <section>
            <ul class="py-9">
                <li class="flex items-center pb-4">
                    <div class="flex flex-col pr-6">
                        <div class="flex flex-row items-center pb-2">
                            <p class="text-4xl font-bold pr-4">1</p>
                            <h4 class="text-xl font-bold">選擇套餐方案</h4>
                        </div>
                        <img src="../assets/image/步驟1.png" alt="選擇套餐方案" class="w-[200px] object-cover">
                    </div>
                    <div class="self-end">
                        <ul class="leading-loose">
                            <li>在開始購物之前，請先<RouterLink to="/signin" class="font-semibold hover:text-primary-700"> 登入會員
                                </RouterLink>。</li>
                            <li>盒食提供您兩種不同的方案選擇：</li>
                            <li>‧如果您想輕鬆快速地尋找符合您需求的套餐，請點選「<RouterLink to="/nutritionist-plan"
                                    class="font-semibold hover:text-primary-700"> 營養師方案 </RouterLink>」。</li>
                            <li>‧如果您想自行分配所需熱量、蛋白質、營養素等，請點選「<RouterLink to="/mealboxlist/mealgeneral"
                                    class="font-semibold hover:text-primary-700"> 自訂義方案 </RouterLink>」。</li>
                            <li>選好方案後，再根據您的需求選擇餐盒數量，我們有 ７／１４／２１ 的餐盒數量可以讓您挑選。</li>
                        </ul>
                    </div>
                </li>
                <li class="flex pb-4">
                    <div class="flex flex-col pr-6">
                        <div class="flex flex-row items-center pb-2">
                            <p class="text-4xl font-bold pr-4">2</p>
                            <h4 class="text-xl font-bold">套餐內容選擇</h4>
                        </div>
                        <img src="../assets/image/步驟2.png" alt="套餐內容選擇" class="w-[200px] object-cover">
                    </div>
                    <div class="self-center">
                        <ul class="leading-loose pt-6">
                            <li>選取營養師方案後，套餐內的餐盒選項不得變更，</li>
                            <li>如果您希望有更多元的營養師方案選擇，歡迎您來信許願，我們的團隊會持續評估新的方案。</li>
                            <li>在自訂義方案中，我們有多元的一般餐盒選項，不怕您吃膩，您可以根據條件篩選您所需的餐盒。</li>
                            <li>當然，如果您有特殊需求，盒食還提供了「自定義餐盒」的選項，讓您自由拼湊屬於您的健康餐盒。</li>
                        </ul>
                    </div>
                </li>
                <li class="flex pb-4">
                    <div class="flex flex-col pr-6">
                        <div class="flex flex-row items-center pb-2">
                            <p class="text-4xl font-bold pr-4">3</p>
                            <h4 class="text-xl font-bold">餐盒冷凍保存</h4>
                        </div>
                        <img src="../assets/image/步驟3.png" alt="餐盒冷凍保存" class="w-[200px] object-cover">
                    </div>
                    <div class="self-end">
                        <ul class="leading-loose ">
                            <li>訂單將於下單後隔天寄出，２－３天會送達指定地點（不包含例假日）。</li>
                            <li>出貨一律採取冷凍配送，無論是超商取貨還是宅配到府，餐盒在配送過程中全程保持冷凍狀態。</li>
                            <li>我們的餐盒會裝在專門寄送冷凍食品的箱子中，並在箱內放入保冷劑來保持低溫，</li>
                            <li>即便您選擇超商取貨再自己帶回家，也能確保食物的品質和安全。</li>
                            <li>冷凍餐盒可以在冷凍狀態下保存2個月，解凍後，建議您在24小時內食用，以確保食材品質與最佳的風味。</li>
                        </ul>
                    </div>
                </li>
                <li class="flex pb-4">
                    <div class="flex flex-col pr-6">
                        <div class="flex flex-row items-center pb-2">
                            <p class="text-4xl font-bold pr-4">4</p>
                            <h4 class="text-xl font-bold">加熱享用</h4>
                        </div>
                        <img src="../assets/image/步驟4.png" alt="加熱享用" class="w-[200px] object-cover">
                    </div>
                    <div class="self-end">
                        <ul class="leading-loose ">
                            <li>無論是在辦公室享用午餐，還是下班後想要快快吃到晚餐，盒食的餐盒都會是您的好夥伴。</li>
                            <li>我們的冷凍餐盒包裝可以直接放入微波爐（推薦）或是使用電鍋加熱。</li>
                            <li>加熱前請詳閱包裝上的指示，並且取出時請注意食物溫度與蒸氣，避免燙傷。</li>
                            <li>若您使用電鍋加熱，建議您將食材取出，放入合適的容器內再加熱。</li>
                            <li>叮咚！一餐營養均衡、方便美味的餐盒上桌囉！</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
        <div class="flex">
            <RouterLink
                class="flex items-center w-1/2 py-2 px-4 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none md:w-2/12"
                to="/">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2" />
                <p>返回首頁</p>
            </RouterLink>
        </div>
    </main>
</template>
<style scoped></style>