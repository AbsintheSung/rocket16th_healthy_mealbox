<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLayout from '@/components/global/HeaderLayout.vue'
import FooterLayout from '@/components/global/FooterLayout.vue'
import HeaderAdorn from '@/components/global/HeaderAdorn.vue'
</script>

<template>
  <!-- <HeaderLayout /> -->
  <HeaderAdorn />
  <!-- <RouterView /> -->
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
    </transition>
  </RouterView>
  <!-- <FooterLayout /> -->
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
