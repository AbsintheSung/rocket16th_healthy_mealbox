<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import HeaderLayout from '@/components/global/HeaderLayout.vue'
import FooterLayout from '@/components/global/FooterLayout.vue'
import ThePlaidAdorn from './components/global/ThePlaidAdorn.vue'
const memberStore = useMemberStore()

onMounted(async () => {
  try {
    await memberStore.fetchMemberInfo()
  } catch (error) {
    //此處只是驗證是否保持登入，無需做任何錯誤顯示
    return
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
  <FooterLayout />
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
