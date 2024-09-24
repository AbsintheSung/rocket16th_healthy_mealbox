<script setup>
import TheSvg from '@/components/global/TheSvg.vue'
</script>
<template>
  <div class="bg-primary-100">
    <div class="container py-6 md:py-12">
      <div class="gird-cols-4 grid gap-6 md:grid-cols-12">
        <div class="col-span-full flex flex-col gap-y-6 md:col-span-3 lg:col-span-4">
          <TheSvg svgIcon="footer-logo" class="hidden h-[40px] md:block md:w-[100px]" />
          <TheSvg class="h-[40px] w-[92px] md:hidden" svgIcon="mobile-logo" />
          <div class="flex flex-col md:w-[200px]">
            <h3 class="text-primary-700 md:hidden">開盒即食，懶出新高度 - 盒食，輕鬆又健康</h3>
            <h3 class="hidden md:text-primary-700">開盒即食，懶出新高度</h3>
            <h3 class="hidden md:text-primary-700 self-end">- 盒食，輕鬆又健康</h3>
          </div>
        </div>
        <div class="col-span-full flex flex-col gap-y-6 md:col-span-2">
          <h3 class="text-primary-700">方案選擇</h3>
          <ul>
            <li>
              <RouterLink to="/">7餐</RouterLink>
            </li>
            <li>
              <RouterLink to="/">14餐</RouterLink>
            </li>
            <li>
              <RouterLink to="/">21餐</RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-span-full flex flex-col gap-y-6 md:col-span-3 lg:col-span-2">
          <h3 class="text-primary-700">套餐內容</h3>
          <ul>
            <li>
              <RouterLink to="/">營養師推薦組合</RouterLink>
            </li>
            <li>
              <RouterLink to="/">自定義套餐組合</RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-span-full flex flex-col gap-y-6 md:col-span-4">
          <h3 class="text-primary-700">最新消息與優惠資訊</h3>
          <div class="flex flex-row md:flex-col">
            <p class="hidden md:block">不想錯過我們的新菜單、新優惠？</p>
            <p class="hidden md:block">留下您的Email，活動消息一把抓！</p>
            <p class="md:hidden">不想錯過我們的新菜單、新優惠？留下您的Email，活動消息一把抓！</p>
          </div>
          <div class="item-center relative flex">
            <input type="text" class="w-full rounded border border-black bg-transparent" />
            <button class="absolute right-0 top-1/2 flex h-full -translate-y-1/2 items-center justify-center px-3">
              <FontAwesomeIcon :icon="['fas', 'paper-plane']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
