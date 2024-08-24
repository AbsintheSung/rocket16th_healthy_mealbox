<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TheSvg from '@/components/global/TheSvg.vue'
const route = useRoute()
const memberLink = ref([
  { id: 'editmember', title: '個人資訊', path: '/member' },
  { id: 'orderhistory', title: '歷史訂單', path: '/member/orderhistory' },
  { id: 'custommeal', title: '我的自定義餐盒', path: '/member/custommeal' },
  { id: 'coupon', title: '我的優惠券', path: '/' },
  { id: 'news', title: '最新消息', path: '/' }
])
const memberTitleData = ref({
  EditMember: '我的個人帳戶',
  OrderHistory: '歷史訂單',
  CustomMeal: '我的自定義餐盒'
})
const memberTitle = computed(() => {
  return route.name in memberTitleData.value ? memberTitleData.value[route.name] : ''
})
</script>
<template>
  <main class="container py-6 md:py-20">
    <section class="grid grid-cols-4 gap-6 sm:grid-cols-12">
      <h2
        class="col-span-full rounded bg-primary-300 px-4 py-3 text-center text-4xl font-normal shadow-base md:hidden"
      >
        {{ memberTitle }}
      </h2>
      <div class="col-span-full col-start-1 flex flex-col md:col-span-4 lg:col-span-3">
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
        <TheSvg svgIcon="polygon" class="mt-auto hidden w-[160px] md:block" />
      </div>

      <div
        class="col-span-full col-start-1 md:col-span-8 md:col-start-5 lg:col-span-9 lg:col-start-4"
      >
        <RouterView></RouterView>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
.router-link-exact-active {
  background-color: $primary-300;
}
</style>
