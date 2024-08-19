<script setup></script>
<template>
  <h2 class="text-6xl font-normal">會員資料</h2>
  <ul class="flex flex-col gap-y-6 py-16">
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
  </ul>
</template>
<style lang="scss" scoped></style>
