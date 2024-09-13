<script setup>
import { ref } from 'vue'
import MealCard from '@/components/global/MealCard.vue'
const currentPage1 = ref(1)
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
  <div class="flex h-full flex-col">
    <h2
      class="mb-7 hidden rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base md:block md:w-fit"
    >
      自定義餐盒
    </h2>
    <ul class="grid flex-grow grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-3 lg:gap-y-6">
      <!-- <MealCard v-for="item in 9" :key="item" class="text-[12px] md:text-base" /> -->
    </ul>
    <div class="flex items-center justify-center py-6">
      <el-pagination
        style="--el-fill-color: white"
        layout="prev, pager, next"
        v-model:current-page="currentPage1"
        background
        :page-size="20"
        :pager-count="11"
        :total="100"
        :prev-text="'上一頁'"
        :next-text="'下一頁'"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
