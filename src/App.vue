<script setup lang="ts">
import { computed, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderLayout from '@/components/global/HeaderLayout.vue'
import FooterLayout from '@/components/global/FooterLayout.vue'
import ThePlaidAdorn from './components/global/ThePlaidAdorn.vue'
const route = useRoute()

// 判斷是否應該隱藏 footer
const hiddenFooter = computed(() => {
  // 如果當前路徑包含 /mealboxlist 則隱藏 footer
  return route.path.startsWith('/mealboxlist')
})
onBeforeMount(() => {
  const loadingElement = document.querySelector('.view-load') as HTMLElement | null
  if (loadingElement) {
    loadingElement.remove()
  }
})
</script>

<template>
  <HeaderLayout />
  <ThePlaidAdorn />
  <!-- <RouterView /> -->
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
    </transition>
  </RouterView>
  <FooterLayout v-if="!hiddenFooter" />
</template>

<style scoped land="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
