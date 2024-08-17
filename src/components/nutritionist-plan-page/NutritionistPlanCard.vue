<script setup>
// 測試用ㄉ假資料
defineProps({
  title: String,
  src: String,
})
</script>
<template>
<div class="">
  <h3>{{ title }}</h3>
  <div>
    <img :src="src" :alt="title" >
    <div class="flex justify-end items-center">
      <button>加入購物車</button>
      <a href="#" class="flex items-center"><p>查看詳細</p><font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
    </div>
  </div>
</div>
</template>
<style scoped></style>