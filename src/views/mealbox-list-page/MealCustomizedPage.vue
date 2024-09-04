<script setup>
import MealCard from '@/components/global/MealCard.vue'
import ThePagination from '@/components/global/ThePagination.vue'
import TheSvg from '@/components/global/TheSvg.vue'
</script>
<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
      <MealCard v-for="item in 6" :key="item" />
      <li class="flex flex-col gap-y-4 rounded border border-dashed p-4">
        <button class="flex flex-grow flex-col items-center justify-center gap-y-6">
          <fontAwesomeIcon :icon="['fas', 'plus']" class="p-2" />
          <p>新增餐盒</p>
        </button>
      </li>
    </ul>
    <!-- <div class="flex flex-grow flex-col py-20">
      <div
        class="flex flex-grow flex-col items-center justify-center gap-y-8 border-2 border-dashed border-black"
      >
        <TheSvg svgIcon="custom-sprite" class="h-[98px] w-[98px]" />
        <div class="flex flex-col items-center justify-center">
          <p>還沒有加入任何餐盒</p>
          <p>點擊新增開始來製作專屬餐盒吧！</p>
        </div>
        <button class="rounded bg-secondary-400 px-3 py-5 hover:cursor-pointer hover:shadow-base">
          新增自定義餐盒
        </button>
      </div>
    </div> -->
    <div class="mt-auto flex w-full items-center justify-center">
      <ThePagination />
    </div>
  </div>
</template>
<style scoped></style>
