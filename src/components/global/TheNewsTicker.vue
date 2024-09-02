<script setup>
import newTicker from '@/assets/image/news-ticker.png'
</script>

<template>
  <div class="overflow-hidden bg-primary-400 py-5">
    <div class="flex w-full">
      <div class="marquee-anime flex flex-none items-center gap-x-12">
        <img
          v-for="index in 10"
          :key="`item-${index}`"
          :src="newTicker"
          alt="跑馬燈文字圖片"
          class="object-contain"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-anime {
  animation: scroll 15s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 1rem));
  }
}
</style>
