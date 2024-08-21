<script setup>
import { ref } from 'vue'
import TheSvg from '@/components/global/TheSvg.vue'
const memberLink = ref([
  { id: 'memberhome', title: '會員中心', path: '/member' },
  { id: 'editmember', title: '會員資料', path: '/member/editmember' },
  { id: 'orderhistory', title: '歷史訂單', path: '/member/orderhistory' },
  { id: 'custommeal', title: '我的自定義餐盒', path: '/member/custommeal' },
  { id: 'coupon', title: '我的優惠券', path: '/' },
  { id: 'news', title: '最新消息', path: '/' }
])
</script>
<template>
  <main class="container relative py-20">
    <section class="grid grid-cols-12 gap-6">
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
            <li
              class="border-b border-black hover:bg-primary-300"
              v-for="memberLinkItem in memberLink"
              :key="memberLinkItem.id"
            >
              <RouterLink :to="`${memberLinkItem.path}`" class="block px-6 py-4">
                {{ memberLinkItem.title }}
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
      <div class="col-span-8 col-start-5">
        <RouterView></RouterView>
      </div>
    </section>
    <TheSvg svgIcon="polygon" class="absolute bottom-0 hidden w-[160px] md:block" />
  </main>
</template>
<style scoped lang="scss">
.router-link-exact-active {
  background-color: $primary-300;
}
</style>
