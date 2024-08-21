<script setup>
import TheSvg from '@/components/global/TheSvg.vue'
</script>
<template>
  <main class="container relative py-20">
    <section class="grid grid-cols-12 gap-6 md:-mx-3">
      <div class="col-span-3 col-start-1">
        <aside class="rounded border-2 border-black">
          <div class="relative bg-primary-100 py-6 text-xl">
            <TheSvg svgIcon="decorate-re" class="absolute left-4 top-4 h-[46px] w-[46px]" />
            <TheSvg svgIcon="single-star" class="absolute bottom-4 right-4 h-[46px] w-[46px]" />
            <img class="mx-auto rounded-full" src="https://picsum.photos/160/160?random=1" />
            <p class="py-3 text-center font-bold">林本丸</p>
            <p class="text-center text-primary-base">一般會員</p>
          </div>
          <ul class="flex flex-col justify-center">
            <li class="border-b border-black hover:bg-primary-300">
              <RouterLink
                to="/member/editmember"
                class="block px-6 py-4"
                linkExactActiveClass="link-active"
              >
                個人資料
              </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-300">
              <RouterLink
                to="/member/orderhistory"
                class="block px-6 py-4"
                linkExactActiveClass="link-active"
              >
                歷史訂單
              </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-300">
              <RouterLink
                to="/member/custommeal"
                class="block px-6 py-4"
                linkExactActiveClass="link-active"
              >
                我的自定義餐盒
              </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-300">
              <RouterLink to="/" class="block px-6 py-4" linkExactActiveClass="link-active">
                我的優惠券
              </RouterLink>
            </li>
            <li class="border-b border-black hover:bg-primary-300">
              <RouterLink to="/" class="block px-6 py-4" linkExactActiveClass="link-active">
                最新消息
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
      <div class="col-span-8 col-start-5">
        <RouterView></RouterView>
      </div>
    </section>
    <TheSvg svgIcon="decorate-re" class="absolute bottom-0 w-[160px]" />
  </main>
</template>
<style scoped lang="scss">
.router-link-active {
  background-color: $primary-300;
}
</style>
