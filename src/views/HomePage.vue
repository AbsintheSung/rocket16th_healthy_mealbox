<script setup lang="ts">
import TheSvg from '@/components/global/TheSvg.vue'
</script>

<template>
  <main>
    <section class="bg-home-main bg-cover bg-center bg-no-repeat">
      <div class="container flex items-center justify-between">
        <div class="w-1/2 py-48">
          <TheSvg svgIcon="main-logo" class="h-[90px]" />
          <p class="text-2xl text-white">
            無論您的生活多麼忙碌都能吃得營養均衡，輕鬆快速訂購，<br />
            盒食提供您日常飲食更多元的選擇，健康美味輕鬆上桌!
          </p>
        </div>
        <div class="flex w-1/2 justify-end self-end">
          <TheSvg svgIcon="rhombus-full" class="w-[80px]" />
          <TheSvg svgIcon="rhombus" class="w-[80px]" />
          <TheSvg svgIcon="rhombus-full" class="w-[80px]" />
          <TheSvg svgIcon="rhombus" class="w-[80px]" />
        </div>
      </div>
    </section>
    <section class="container py-24">
      <p class="text-center font-bold text-primary-700">選擇困難嗎？</p>
      <div class="relative flex items-center justify-center py-4">
        <h2 class="text-2xl font-bold">金牌營養師推薦套餐</h2>
        <RouterLink to="/" class="absolute bottom-0 right-0">查看所有餐點</RouterLink>
      </div>

      <ul class="grid grid-cols-12 gap-6 py-12">
        <li
          class="col-span-6 flex flex-col gap-y-3 rounded lg:col-span-3"
          v-for="item in 4"
          :key="item"
        >
          <img src="../assets/image/homemeal.jpg" />
          <div>
            <h3>7餐</h3>
            <p>減脂豐富吃</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="self-end rounded border border-secondary-900 px-3 py-1 text-secondary-900"
            >
              加入購物車
            </button>
            <RouterLink to="/" class="text-primary-700">
              <p>查看此方案</p>
              <p>詳細資訊</p>
            </RouterLink>
          </div>
        </li>
      </ul>
    </section>
    <!-- <section class="container py-12">
      <h2 class="text-3xl font-bold text-primary-700 md:text-5xl lg:text-7xl">
        「想要健康，就要吃得均衡。」
      </h2>
      <div class="flex flex-col gap-y-28 py-8">
        <p class="text-2xl font-medium md:text-4xl lg:text-6xl">蛋白質20g</p>
        <p class="text-2xl font-medium md:text-4xl lg:text-6xl">澱粉 15g</p>
        <p class="text-2xl font-medium md:text-4xl lg:text-6xl">熱量200Kcal</p>
      </div>
    </section> -->
    <section class="container py-24">
      <div class="grid grid-cols-12">
        <h2 class="col-span-full mb-16 text-center text-3xl font-bold">不再需要耗時的工作</h2>
        <ul class="col-span-8 col-start-3 flex items-start gap-6">
          <li class="w-1/4">
            <img src="../assets//image/homemeal.jpg" />
            <h3 class="mt-5">食材購買</h3>
          </li>
          <li class="w-1/4">
            <img src="../assets//image/homemeal.jpg" />
            <h3 class="mt-5">烹飪調理</h3>
          </li>
          <li class="w-1/4">
            <img src="../assets//image/homemeal.jpg" />
            <h3 class="mt-5">清洗碗盤</h3>
          </li>
          <li class="w-1/4">
            <img src="../assets//image/homemeal.jpg" />
            <h3 class="mt-5">思考要吃什麼</h3>
          </li>
        </ul>
      </div>
    </section>
    <!-- 
    <section class="container py-24">
      <div>
        <h2 class="mb-16 text-center text-3xl font-bold">簡單下訂，一鍵送到家</h2>
        <ul class="grid grid-cols-12 gap-6">
          <li class="col-span-6 flex flex-col gap-y-3 lg:col-span-3">
            <div class="flex">
              <h3 class="text-5xl font-bold">1</h3>
              <div>
                <p>選擇套餐方案</p>
                <p>選擇適合你的數量</p>
              </div>
            </div>
            <img class="mt-auto" src="../assets//image/homemeal.jpg" />
          </li>
          <li class="col-span-6 flex flex-col gap-y-3 lg:col-span-3">
            <div class="flex">
              <h3 class="text-5xl font-bold">2</h3>
              <div>
                <p>套餐內容選擇</p>
                <p>選配好的套餐，或是親自挑選</p>
              </div>
            </div>
            <img class="mt-auto" src="../assets//image/homemeal.jpg" />
          </li>
          <li class="col-span-6 flex flex-col gap-y-3 lg:col-span-3">
            <div class="flex">
              <h3 class="text-5xl font-bold">3</h3>
              <div>
                <p>餐盒冷凍保存</p>
                <p>餐點放置冷凍庫急凍保存</p>
              </div>
            </div>
            <img class="mt-auto" src="../assets//image/homemeal.jpg" />
          </li>
          <li class="col-span-6 flex flex-col gap-y-3 lg:col-span-3">
            <div class="flex">
              <h3 class="text-5xl font-bold">4</h3>
              <div>
                <p>加熱享用</p>
                <p>使用微波或電鍋加熱輕鬆上桌</p>
              </div>
            </div>
            <img class="mt-auto" src="../assets//image/homemeal.jpg" />
          </li>
        </ul>
      </div>
    </section>
    <section class="container flex flex-col gap-y-16 py-24">
      <div>
        <h2 class="text-center font-bold text-primary-700">餐餐自由配</h2>
        <p class="mt-2 text-center text-3xl font-bold">適合您的生活方式的3種方案</p>
      </div>
      <ul class="flex items-center justify-center gap-x-24">
        <li class="rounded border border-black" v-for="item in 3" :key="item">
          <h3 class="bg-primary-700 py-1 text-center text-4xl font-bold text-white">7餐</h3>
          <div class="flex flex-col items-center justify-center gap-y-6 px-8 py-6">
            <div>
              <p class="text-2xl">平均一餐</p>
              <p class="text-4xl">NT.70</p>
              <p>總價700元起*</p>
            </div>
            <div>
              <RouterLink
                to="/"
                class="block rounded border border-primary-700 px-14 py-1 text-primary-700"
                >選擇方案</RouterLink
              >
            </div>
          </div>
        </li>
      </ul>
      <div>
        <p class="text-center">您可以根據自身狀況選擇套餐方案，產品一律採用冷凍配送，</p>
        <p class="text-center">我們也歡迎您與親朋好友一起訂購。</p>
      </div>
    </section> -->

    <section class="container py-24">
      <h2 class="mb-16 text-center text-3xl font-bold text-primary-700">「又懶又健康」</h2>
      <p class="text-center">
        這是<span class="font-bold">盒十</span
        >的宗旨，健康是財富之本，我們希望無論您的生活多麼忙碌都能吃得營養均衡。
      </p>
      <p class="py-1 text-center">
        無論您是忙碌的上班族、辛苦的全職媽媽，或者您與我們一樣，是個又懶又想吃的健康的人，
      </p>
      <p class="text-center">
        <span class="font-bold">盒十</span>提供您日常飲食更多元的選擇，健康美味輕鬆上桌。
      </p>
    </section>
  </main>
</template>
