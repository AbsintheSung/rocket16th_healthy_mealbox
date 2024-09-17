<script setup>
</script>
<template>
    <main class="container py-12 md:py-20">
        <h3
            class="mb-7 hidden rounded bg-primary-300 px-24 py-5 text-2xl font-bold border-2 border-black shadow-base md:block md:w-fit">
            常見問題</h3>
        <section>
            <ul class="py-9">
                <li class="pb-9">
                    <h4 class="text-primary-700 text-2xl font-medium pb-2 text-pretty">1. 收到餐盒後，我要如何食用？</h4>
                    <p>Ａ：盒食的冷凍餐盒可以直接放入微波爐（推薦）或是使用電鍋加熱。</p>
                    <p>‧微波爐：將餐盒上的封膜撕開一角，然後放入微波爐中，700w加熱3-5分鐘後即可輕鬆享用。（視餐點內容調整）</p>
                    <p>‧電鍋：將餐盒拆開放入合適的器具中，再放入電鍋，外鍋放2/3碗水，電鍋跳起來後再悶15-20分鐘。（視餐點內容調整）</p>
                </li>
                <li class="pb-9">
                    <h4 class="text-primary-700 text-2xl font-medium pb-2 text-pretty">2. 餐盒的保存期限是多久？</h4>
                    <p>Ａ：盒食的冷凍餐盒可以在冷凍狀態下保存2個月。</p>
                    <p>解凍後，建議您在24小時內食用，以確保食材品質與最佳的風味。</p>
                </li>
                <li class="pb-9">
                    <h4 class="text-primary-700 text-2xl font-medium pb-2 text-pretty">3. 我要在哪裡查看過敏原資訊？</h4>
                    <p>Ａ：在網站的產品資訊中我們註明了食材與過敏原資訊，並且每個餐盒的包裝上也同樣詳細地標明過敏原資訊，</p>
                    <p>包括可能含有堅果、乳製品、麩質等。</p>
                    <p>如果您對某些食材有過敏反應，請仔細閱讀網站及包裝上的成分表或在下單前與我們的客服聯繫。</p>
                </li>
                <li class="pb-9">
                    <h4 class="text-primary-700 text-2xl font-medium pb-2 text-pretty">4. 如何確保餐盒配送過程中的冷凍狀態？</h4>
                    <p>Ａ：盒食一律採用冷凍配送，無論是超商取貨還是宅配到府，餐盒在配送過程中全程保持冷凍狀態。</p>
                    <p>我們的餐盒會裝在專門寄送冷凍食品的箱子中，並在箱內放入保冷劑來保持低溫，即便您選擇超商取貨再自己帶回家，也能確保食物的品質和安全。</p>
                </li>
                <li class="pb-9">
                    <h4 class="text-primary-700 text-2xl font-medium pb-2 text-pretty">5.想取消訂單或是想修改已成立訂單內容，該如何處理呢？</h4>
                    <p>Ａ：如果您想修正或取消您的訂單，請將您的下單日期、下單人、訂單編號與簡易需求描述mail至盒食的電子信箱內，客服會在1-3個工作天內協助您處理訂單事宜。</p>
                </li>
            </ul>
            <div class="">
                <RouterLink
                    class="flex items-center w-1/2 py-2 px-4 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none md:w-2/12"
                    to="/">
                    <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2" />
                    <p>返回首頁</p>
                </RouterLink>
            </div>
        </section>
    </main>
</template>
<style scoped></style>