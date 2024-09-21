<script setup lang="ts">
import { RouterLink, useRouter, type Router } from 'vue-router'
import { ref, watch } from 'vue'
import TheSvg from '@/components/global/TheSvg.vue'
const mainNav = ref([
  { id: 'plan', title: '方案選擇', path: '/plan-selection' },
  { id: 'usage', title: '使用方式', path: '/how-to-use' },
  { id: 'faq', title: '常見問題', path: '/fqa' }
])
const utilNav = ref([
  { id: 'cart', iconStyle: ['fas', 'cart-shopping'], path: '/checkout' },
  { id: 'user', iconStyle: ['fas', 'user'], path: '/member' },
  { id: 'signin', iconStyle: ['fas', 'right-to-bracket'], path: '/signin' }
])
const isOpen = ref(false)
const router: Router = useRouter()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
watch(
  () => router.currentRoute.value.path,
  () => {
    isOpen.value = false
  }
)
</script>
<template>
  <header class="relative">
    <nav class="container py-5">
      <!-- 左側LOGO -->
      <div class="flex flex-wrap">
        <div class="w-3/12">
          <h1 class="hidden md:block">
            <RouterLink to="/">
              <TheSvg class="h-[40px]" svgIcon="logo" />
            </RouterLink>
          </h1>
          <h1 class="block text-center md:hidden">
            <RouterLink to="/">
              <TheSvg class="h-[40px] w-[92px]" svgIcon="mobile-logo" />
            </RouterLink>
          </h1>
        </div>

        <!-- 右側各選項按鈕 -->
        <div class="flex w-9/12 items-center justify-end gap-x-4">
          <!-- 手機板會隱藏此處 -->
          <ul class="hidden items-center gap-x-4 md:flex">
            <li v-for="mainNavItem in mainNav" :key="mainNavItem.id">
              <RouterLink class="block p-2" :to="`${mainNavItem.path}`">
                {{ mainNavItem.title }}
              </RouterLink>
            </li>
          </ul>
          <ul class="flex items-center gap-x-4">
            <li v-for="utilNavItem in utilNav" :key="utilNavItem.id">
              <RouterLink class="block p-2" :to="`${utilNavItem.path}`">
                <FontAwesomeIcon :icon="utilNavItem.iconStyle" size="lg" />
              </RouterLink>
            </li>
          </ul>
          <!-- 用來控制縮合的按鈕，手機板才會顯示 -->
          <button class="hover: block cursor-pointer p-2 md:hidden" @click="toggleMenu">
            <FontAwesomeIcon :icon="['fas', 'bars']" size="lg" />
          </button>
        </div>
      </div>
    </nav>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-show="isOpen" class="absolute left-0 right-0 z-10 w-full bg-white shadow-lg md:hidden">
        <ul class="py-2">
          <li v-for="mainNavItem in mainNav" :key="mainNavItem.id">
            <RouterLink
              class="block p-4 hover:bg-primary-200"
              :to="mainNavItem.path"
              @click="isOpen = false"
            >
              {{ mainNavItem.title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>
<style scoped></style>
