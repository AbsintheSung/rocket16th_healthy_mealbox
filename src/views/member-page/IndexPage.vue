<script setup>
import { ref } from 'vue'
import TheSvg from '@/components/global/TheSvg.vue'
const memberLink = ref([
  { id: 'editmember', title: '會員資料', path: '/member/editmember', icon: ['fas', 'user'] },
  { id: 'orderhistory', title: '歷史訂單', path: '/member/orderhistory', icon: ['fas', 'file'] },
  { id: 'custommeal', title: '我的自定義餐盒', path: '/member/custommeal', icon: ['far', 'heart'] },
  { id: 'coupon', title: '我的優惠券', path: '/', icon: ['fas', 'gift'] }
])
</script>
<template>
  <div class="relative mb-32">
    <h2 class="w-fit rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base">
      會員中心
    </h2>
    <TheSvg svgIcon="decorate" class="absolute right-0 top-0 hidden w-[140px] md:block" />
  </div>
  <ul class="grid grid-cols-8 gap-6">
    <template v-for="(memberLinkItem, index) in memberLink" :key="memberLinkItem.id">
      <li
        v-if="index % 2 === 0"
        class="col-start-1 col-end-4 rounded border-2 border-black hover:shadow-base"
      >
        <RouterLink :to="`${memberLinkItem.path}`" class="block py-24 hover:bg-primary-100">
          <div class="flex flex-col items-center justify-center gap-y-4">
            <FontAwesomeIcon :icon="`${memberLinkItem.icon}`" size="lg" />
            <p>{{ memberLinkItem.title }}</p>
          </div>
        </RouterLink>
      </li>
      <li v-else class="col-start-4 col-end-7 rounded border-2 border-black hover:shadow-base">
        <RouterLink :to="`${memberLinkItem.path}`" class="block py-24 hover:bg-primary-100">
          <div class="flex flex-col items-center justify-center gap-y-4">
            <FontAwesomeIcon :icon="`${memberLinkItem.icon}`" size="lg" />
            <p>{{ memberLinkItem.title }}</p>
          </div>
        </RouterLink>
      </li>
    </template>

    <!-- <li class="col-start-1 col-end-4 rounded border-2 border-black hover:shadow-base">
      <RouterLink to="/member" class="block py-24 hover:bg-primary-100">
        <div class="flex flex-col items-center justify-center gap-y-4">
          <FontAwesomeIcon :icon="['fas', 'user']" size="lg" />
          <p>會員資料</p>
        </div>
      </RouterLink>
    </li>
    <li class="col-start-4 col-end-7 rounded border-2 border-black hover:shadow-base">
      <RouterLink to="/" class="block py-24 hover:bg-primary-100">
        <div class="flex flex-col items-center justify-center gap-y-4">
          <FontAwesomeIcon :icon="['fas', 'file']" size="lg" />
          <p>歷史訂單</p>
        </div>
      </RouterLink>
    </li>
    <li class="col-start-1 col-end-4 rounded border-2 border-black hover:shadow-base">
      <RouterLink to="/" class="block py-24 hover:bg-primary-100">
        <div class="flex flex-col items-center justify-center gap-y-4">
          <FontAwesomeIcon :icon="['far', 'heart']" size="lg" />
          <p>我的自定義餐盒</p>
        </div>
      </RouterLink>
    </li>
    <li class="col-start-4 col-end-7 rounded border-2 border-black hover:shadow-base">
      <RouterLink to="/" class="block py-24 hover:bg-primary-100">
        <div class="flex flex-col items-center justify-center gap-y-4">
          <FontAwesomeIcon :icon="['fas', 'gift']" size="lg" />
          <p>我的優惠券</p>
        </div>
      </RouterLink>
    </li> -->
  </ul>
  <!-- <ul class="flex flex-col gap-y-6 py-16">
    <li>
      <h3 class="pb-4">我個人帳戶</h3>
      <div class="h-[132px] bg-slate-500">圖片區?</div>
      <RouterLink to="member/editmember">
        <p class="bg-primary-base px-4 py-2 text-end hover:underline">
          前往查看<FontAwesomeIcon class="ps-2" :icon="['fas', 'arrow-right']" />
        </p>
      </RouterLink>
    </li>
    <li>
      <h3 class="pb-4">歷史訂單</h3>
      <div class="h-[132px] bg-slate-500">圖片區?</div>
      <RouterLink to="member/editmember">
        <p class="bg-primary-base px-4 py-2 text-end hover:underline">
          前往查看<FontAwesomeIcon class="ps-2" :icon="['fas', 'arrow-right']" />
        </p>
      </RouterLink>
    </li>
    <li>
      <h3 class="pb-4">我的自定義餐盒</h3>
      <div class="h-[132px] bg-slate-500">圖片區?</div>
      <RouterLink to="member/editmember">
        <p class="bg-primary-base px-4 py-2 text-end hover:underline">
          前往查看<FontAwesomeIcon class="ps-2" :icon="['fas', 'arrow-right']" />
        </p>
      </RouterLink>
    </li>
    <li>
      <h3 class="pb-4">我的優惠券?</h3>
      <div class="h-[132px] bg-slate-500">圖片區?</div>
      <RouterLink to="member/editmember">
        <p class="bg-primary-base px-4 py-2 text-end hover:underline">
          前往查看<FontAwesomeIcon class="ps-2" :icon="['fas', 'arrow-right']" />
        </p>
      </RouterLink>
    </li>
  </ul> -->
</template>
<style lang="scss" scoped></style>
