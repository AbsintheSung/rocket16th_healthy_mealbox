<script setup>
import TheSvg from './TheSvg.vue'
import { useWindowSize } from '@vueuse/core'
import { ref, onMounted, watch, onUnmounted, computed } from 'vue'
const { width } = useWindowSize()
// const windowWidth = ref(window.innerWidth)
const imgSize = computed(() => Math.ceil(width.value / 40))
// const updateWindowWidth = () => {
//   windowWidth.value = window.innerWidth
// }
// onMounted(() => {
//   window.addEventListener('resize', updateWindowWidth)
// })
// onUnmounted(() => {
//   window.removeEventListener('resize', updateWindowWidth)
// })

// watch(
//   () => windowWidth.value,
//   (newWindowWidth) => {
//     windowWidth.value = newWindowWidth
//     // console.log('Window width changed:', newWindowWidth)
//   }
// )
</script>
<template>
  <!-- header下方的長條裝飾物  -->
  <div class="flex flex-nowrap">
    <TheSvg
      svgIcon="adorn"
      class="h-[40px] w-[40px] overflow-x-hidden"
      v-for="item in imgSize"
      :key="item"
    />
  </div>
</template>
<style scoped></style>
