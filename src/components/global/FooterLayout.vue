<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const mainNav = ref([
  { id: 'accoumt', title: '我的帳戶', path: '/' },
  { id: 'faq', title: '常見問題', path: '/' },
  { id: 'privacy-policy', title: '隱私權保護政策', path: '/' }
])
const utilNav = ref([
  { id: 'ig', iconStyle: ['fab', 'instagram'], path: '/' },
  { id: 'fb', iconStyle: ['fab', 'facebook'], path: '/' },
  { id: 'line', iconStyle: ['fab', 'line'], path: '/' }
])
</script>
<template>
  <footer class="bg-primary-700">
    <div class="container py-6">
      <div class="flex items-center justify-between text-[#FFFFFF]">
        <ul class="flex">
          <li v-for="mainNavItem in mainNav" :key="mainNavItem.id" class="py-1">
            <RouterLink class="block px-2" :to="`${mainNavItem.path}`" :id="mainNavItem.id">
              {{ mainNavItem.title }}
            </RouterLink>
          </li>
        </ul>
        <ul class="flex items-center justify-between">
          <li v-for="utilNavItem in utilNav" :key="utilNavItem.id" class="py-1">
            <RouterLink class="block px-2" :to="`${utilNavItem.path}`">
              <FontAwesomeIcon :icon="utilNavItem.iconStyle" size="xl" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<style scoped lang="scss">
#faq {
  border: 1px solid #ffffff;
  border-top: none;
  border-bottom: none;
}
</style>
