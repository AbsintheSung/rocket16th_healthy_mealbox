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
    <h2 class="mb-7 w-fit rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base">
      自定義餐盒
    </h2>
    <ul class="grid flex-grow grid-cols-3 gap-6">
      <MealCard v-for="item in 9" :key="item" />
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
