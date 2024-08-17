<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const mainNav = ref([
  { id: 'usage', title: '使用方式', path: '/' },
  { id: 'about-us', title: '關於我們', path: '/' },
  { id: 'faq', title: '常見問題', path: '/' }
])
const utilNav = ref([
  //   { id: 'search', iconStyle: '', path: '/' },
  { id: 'user', iconStyle: ['fas', 'user'], path: '/' },
  { id: 'cart', iconStyle: ['fas', 'cart-shopping'], path: '/' }
])
</script>
<template>
  <header>
    <nav class="container py-5">
      <div class="flex items-center justify-between">
        <ul class="flex gap-x-4">
          <li></li>
          <li v-for="mainNavItem in mainNav" :key="mainNavItem.id">
            <RouterLink class="block p-2" :to="`${mainNavItem.path}`">
              {{ mainNavItem.title }}
            </RouterLink>
          </li>
        </ul>
        <ul class="flex items-center gap-x-4">
          <li><FontAwesomeIcon :icon="['fas', 'magnifying-glass']" size="xl" /></li>
          <li v-for="utilNavItem in utilNav" :key="utilNavItem.id">
            <RouterLink class="block p-2" :to="`${utilNavItem.path}`">
              <FontAwesomeIcon :icon="utilNavItem.iconStyle" size="xl" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<style scoped></style>
