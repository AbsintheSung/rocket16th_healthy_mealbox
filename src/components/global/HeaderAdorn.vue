<script setup>
import TheSvg from './TheSvg.vue'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
const { width } = useWindowSize()
const imgSize = computed(() => Math.ceil(width.value / 40))
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
