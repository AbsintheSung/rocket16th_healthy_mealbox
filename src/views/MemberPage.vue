<script setup>
import TheSvg from '@/components/global/TheSvg.vue'
</script>
<template>
  <main class="container">
    <section class="grid grid-cols-12 gap-6 md:-mx-3">
      <div class="col-span-3 col-start-1">
        <aside>
          <div class="relative bg-primary-100 py-6 text-xl">
            <TheSvg svgIcon="decorate-re" class="absolute h-[46px] w-[46px] object-cover" />
            <TheSvg
              svgIcon="single-star"
              class="absolute bottom-0 right-0 h-[46px] w-[46px] object-cover"
            />
            <img class="mx-auto rounded-full" src="https://picsum.photos/160/160?random=1" />
            <p class="py-3 text-center font-bold">林本丸</p>
            <p class="text-center text-primary-base">一般會員</p>
          </div>
          <ul class="border-block border-block flex flex-col justify-center border">
            <li class="border-b border-black hover:bg-primary-100">
              <RouterLink to="/member" class="block px-4 py-6">個人資料</RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-100">
              <RouterLink to="/member/editmember" class="block px-4 py-6"> 歷史訂單 </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-100">
              <RouterLink to="/member/orderhistory" class="block px-4 py-6">
                我的自定義餐盒
              </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-100">
              <RouterLink to="/member" class="block px-4 py-6"> 我的優惠券 </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-100">
              <RouterLink to="/member" class="block px-4 py-6"> 最新消息 </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
      <div class="col-span-8 col-start-5">
        <RouterView></RouterView>
      </div>
    </section>
    <!-- <section class="flex gap-x-6">
      <aside class="w-1/4">
        <div class="bg-[#EFF2F6] py-6 text-xl">
          <img class="mx-auto rounded-full" src="https://picsum.photos/160/160?random=1" />
          <p class="py-3 text-center font-bold">林本丸</p>
          <p class="text-center">一般會員</p>
        </div>
        <ul class="flex flex-col justify-center gap-y-1 border-b px-6 py-4">
          <li>
            <RouterLink to="/member">會員中心</RouterLink>
          </li>
          <li>
            <RouterLink to="/member/editmember">編輯個人資料</RouterLink>
          </li>
          <li>
            <RouterLink to="/member/orderhistory">歷史訂單查詢</RouterLink>
          </li>
          <li>
            <RouterLink to="/member/custommeal">我的自定義餐盒</RouterLink>
          </li>
        </ul>
        <ul class="flex flex-col justify-center gap-y-1 px-6 py-4">
          <li>
            <RouterLink to="/member">優惠券</RouterLink>
          </li>
          <li>
            <RouterLink to="/member">最新消息</RouterLink>
          </li>
        </ul>
      </aside>
      <div class="flex-grow">
        <RouterView></RouterView>
      </div>
    </section> -->
  </main>
</template>
<style scoped lang="scss"></style>
