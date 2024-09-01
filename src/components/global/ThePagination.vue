<script setup lang="ts">
const currentPageNum = defineModel('currentPageNum')
const props = defineProps({
  //每頁該顯示的資料數量
  pageSize: {
    type: Number,
    default: 1
  },
  //資料總數
  pageTotal: {
    type: Number,
    default: 1
  },
  //最大頁碼數。 頁碼按鈕數量，當總頁數超過該值時會摺疊( 官方文件:最小值5 )
  pagerCount: {
    type: Number,
    default: 5
  },
  //切換function
  changePage: {
    type: Function,
    default: () => {}
  }
})
const handleCurrentChange = (val: any) => {
  // console.log(`current page: ${val}`)
  props.changePage(val)
}
</script>
<template>
  <el-pagination
    style="--el-fill-color: white"
    layout="prev, pager, next"
    v-model:current-page="currentPageNum"
    background
    :pager-count="pagerCount"
    :page-size="pageSize"
    :total="pageTotal"
    :prev-text="'上一頁'"
    :next-text="'下一頁'"
    @current-change="handleCurrentChange"
  />
</template>
<style scoped></style>
