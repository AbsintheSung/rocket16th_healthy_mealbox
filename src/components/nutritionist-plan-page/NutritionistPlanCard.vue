<script setup>
// 測試用ㄉ假資料
defineProps({
  title: String,
  src: String,
})
</script>
<template>
<div class="flex flex-col">
  <h3 class="text-2xl font-medium pb-6">{{ title }}</h3>
  <div class="w-full">
    <img :src="src" :alt="title" class="w-full h-[179px] object-cover">
    <div class="flex justify-end items-center bg-primary-base py-4">
      <div class="pr-4"><el-button>加入購物車</el-button></div>
      <a href="#" class="flex items-center text-2xl text-white"><p class="pr-4">查看詳細</p><font-awesome-icon :icon="['fas', 'arrow-right']" class="pr-4"/></a>
    </div>
  </div>
</div>
</template>
<style scoped>
</style>