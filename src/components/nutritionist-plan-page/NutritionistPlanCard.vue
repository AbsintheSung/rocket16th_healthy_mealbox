<script setup>
// 測試用ㄉ假資料
defineProps({
  title: String,
  src: String,
})
</script>
<template>
  <div class="flex flex-col">
    <div class="w-full">
      <div class="border-2 border-black rounded-t"><img :src="src" :alt="title" class="w-full h-[200px] object-cover">
      </div>
      <div class="flex flex-col items-start border-2 border-black rounded-b p-3">
        <RouterLink to="/nutritionist-plan-detail">
          <h3 class="text-xl hover:text-primary-600 transition">{{ title }}</h3>
        </RouterLink>
        <div class="py-2">
          <p class="text-sm text-gray-400">Display richer content by adding some configs.</p>
          <p class="text-sm text-gray-400">Display richer content by adding some configs.</p>
        </div>
        <div class="pr-4">
          <button
            class="py-1 px-4 border-2 border-secondary-900 rounded hover:border-2 hover:bg-secondary-400 hover:border-black hover:shadow-base hover:transition active:shadow-none">
            <p class="text-secondary-900 hover:text-black">加入購物車</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>