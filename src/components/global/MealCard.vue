<script setup></script>
<template>
  <li class="flex flex-col gap-y-4 rounded border p-4">
    <img src="https://picsum.photos/278/214?random=1" />
    <div class="flex flex-col gap-y-4">
      <p class="font-bold">吃了就會很健康的麥當勞</p>
      <ul class="flex flex-row gap-y-4 text-[10px] sm:text-[14px]">
        <li class="flex-grow">999Kcal</li>
        <li class="flex-grow border-e border-s border-black text-center">3糖889g</li>
        <li class="flex-grow text-center">蛋白質898g</li>
      </ul>
    </div>
    <div class="flex gap-x-3">
      <button
        class="flex flex-grow items-center justify-center gap-x-2 rounded border border-black py-2"
      >
        <FontAwesomeIcon :icon="['fas', 'minus']" />刪除
      </button>
      <button
        class="flex flex-grow items-center justify-center gap-x-2 rounded border border-black bg-primary-base py-2"
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" />加入
      </button>
    </div>
  </li>
</template>
<style lang="scss" scoped></style>
