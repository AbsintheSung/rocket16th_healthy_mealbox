<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import TheSvg from '@/components/global/TheSvg.vue'
const mainNav = ref([
  { id: 'plan', title: '方案選擇', path: '/' },
  { id: 'usage', title: '使用方式', path: '/' },
  { id: 'faq', title: '常見問題', path: '/mealboxlist' }
])
const utilNav = ref([
  { id: 'cart', iconStyle: ['fas', 'cart-shopping'], path: '/checkout' },
  { id: 'user', iconStyle: ['fas', 'user'], path: '/member' },
  { id: 'signin', iconStyle: ['fas', 'right-to-bracket'], path: '/signin' }
])
// const selectedAction = ref('')

// const handleCommand = (command: string) => {
//   selectedAction.value = command
//   console.log(`你選擇了: ${selectedAction.value}`)
// }
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <header>
    <nav class="container py-5">
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

        <div class="flex w-9/12 items-center justify-end gap-x-4">
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
          <button class="hover: block cursor-pointer p-2 md:hidden" @click="toggleMenu">
            <FontAwesomeIcon :icon="['fas', 'bars']" size="lg" />
          </button>
        </div>
        <div
          :class="[isOpen ? 'max-h-screen' : 'max-h-0']"
          class="w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        >
          <ul>
            <li v-for="mainNavItem in mainNav" :key="mainNavItem.id">
              <RouterLink class="block p-2" :to="`${mainNavItem.path}`">
                {{ mainNavItem.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="grid grid-cols-4 gap-6 sm:grid-cols-12">
        桌機板顯示此處(LOGO)
        <h1 class="col-span-3 col-start-1 hidden text-center md:block">
          <RouterLink to="/">
            <TheSvg class="h-[40px]" svgIcon="logo" />
          </RouterLink>
        </h1>
        mobile版顯示此處(LOGO)
        <h1 class="col-span-1 col-start-1 block text-center md:hidden">
          <RouterLink to="/">
            <TheSvg class="h-[40px] w-[92px]" svgIcon="mobile-logo" />
          </RouterLink>
        </h1>
        桌機板顯示此處
        <div class="col-span-9 col-start-4 hidden gap-x-6 sm:flex">
          <ul class="ms-auto flex items-center gap-x-4 text-[12px] md:text-base">
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
        </div>
     
      </div> -->
    </nav>
  </header>
</template>
<style scoped>
.el-dropdown-link,
:deep(.el-dropdown-menu__item) {
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
}
</style>
