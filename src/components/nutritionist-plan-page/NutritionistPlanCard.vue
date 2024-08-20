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
      <div class="flex justify-end items-center bg-secondary-50 py-4">
        <div class="pr-4"><button class="bg-secondary-base py-2 px-8 border-2 border-black rounded-md hover:shadow-base transition active:shadow-none">加入購物車</button></div>
        <RouterLink class="flex items-center text-2xl text-black hover:text-secondary-500 transition" to="/nutritionist-plan-detail">
          <p class="pr-4">查看詳細</p><font-awesome-icon :icon="['fas', 'arrow-right']" class="pr-4" />
        </RouterLink>

      </div>
    </div>
  </div>
</template>
<style scoped></style>