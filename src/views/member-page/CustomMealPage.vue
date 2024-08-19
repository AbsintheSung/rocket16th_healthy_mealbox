<script setup>
import { ref } from 'vue'
import MealCard from '@/components/global/MealCard.vue'
const currentPage1 = ref(1)
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
  <h2 class="mb-8 text-6xl font-normal">自定義餐盒</h2>
  <ul class="grid w-2/3 grid-cols-2 gap-x-6 gap-y-12">
    <MealCard v-for="item in 6" :key="item" />
  </ul>
  <div class="flex w-2/3 items-center justify-center py-6">
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
</template>
<style lang="scss" scoped></style>
