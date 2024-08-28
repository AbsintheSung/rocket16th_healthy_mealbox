<script setup lang="ts"></script>

<template>
  <main>
    <section class="bg-home-main bg-cover bg-center bg-no-repeat py-72"></section>
    <section class="container py-24">
      <p class="text-center font-bold text-primary-700">選擇困難嗎？</p>
      <div class="relative flex items-center justify-center py-4">
        <h2 class="text-2xl font-bold">金牌營養師推薦套餐</h2>
        <RouterLink to="/" class="absolute bottom-0 right-0">查看所有餐點</RouterLink>
      </div>
      <!-- 輪播套件( 改天再引入 ) -->
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
    <section class="container py-12">
      <h2 class="text-3xl font-bold text-primary-700 md:text-5xl lg:text-7xl">
        「想要健康，就要吃得均衡。」
      </h2>
      <div class="flex flex-col gap-y-28 py-8">
        <p class="ms-auto text-2xl font-medium md:text-4xl lg:text-6xl">蛋白質20g</p>
        <p class="mx-auto text-2xl font-medium md:text-4xl lg:text-6xl">澱粉 15g</p>
        <p class="me-auto text-2xl font-medium md:text-4xl lg:text-6xl">熱量200Kcal</p>
      </div>
    </section>
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
  </main>
</template>
