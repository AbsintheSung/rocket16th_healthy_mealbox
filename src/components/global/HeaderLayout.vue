<script setup lang="ts">
import { RouterLink, useRouter, type Router } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { useMemberStore } from '@/stores/member'
import TheSvg from '@/components/global/TheSvg.vue'
// import { title } from 'process'

const memberStore = useMemberStore()

// const mainNav = ref([
//   { id: 'plan', title: '方案選擇', path: '/plan-selection' },
//   { id: 'usage', title: '使用方式', path: '/how-to-use' },
//   { id: 'faq', title: '常見問題', path: '/fqa' }
// ])
// const utilNav = ref([
//   { id: 'cart', iconStyle: ['fas', 'cart-shopping'], path: '/checkout' },
//   { id: 'user', iconStyle: ['fas', 'user'], path: '/member' },
//   { id: 'signin', iconStyle: ['fas', 'right-to-bracket'], path: '/signin' }
// ])

const mainNav = computed(() => [
  { id: 'usage', title: '使用方式', path: '/how-to-use' },
  { id: 'plan', title: '方案選擇', path: '/plan-selection' },
  { id: 'cart', title: '購物車', path: '/checkout' }
])

// ...(memberStore.getMemberInfo.id
//     ? [{ id: 'user', title: '會員中心', path: '/member' }]
//     : [{ id: 'signin', title: '登入 / 註冊', path: '/signin' }]),

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
  <header class="relative border-b-2 border-black">
    <nav class="container py-3 md:py-5">
      <!-- 左側LOGO -->
      <div class="flex flex-wrap">
        <div class="w-3/12">
          <h1 class="hidden md:block">
            <RouterLink to="/">
              <TheSvg class="h-[40px]" svgIcon="logo" />
            </RouterLink>
          </h1>
          <h1 class="block pt-3 text-center md:hidden">
            <RouterLink to="/">
              <TheSvg class="h-[40px] w-[100px]" svgIcon="mobile-logo" />
            </RouterLink>
          </h1>
        </div>

        <!-- 右側各選項按鈕 -->
        <div class="flex w-9/12 items-center justify-end gap-x-4">
          <!-- 手機板會隱藏此處 -->
          <ul class="hidden items-center gap-x-4 md:flex">
            <!-- <li class="relative h-10 w-24">
              <Transition name="fade" mode="out-in">
                <RouterLink
                  v-if="!memberStore.getLoginStatus"
                  key="signin"
                  class="absolute inset-0 flex items-center justify-center p-2 font-bold text-[#7C7C7C] hover:text-primary-700"
                  to="/signin"
                >
                  登入 / 註冊
                </RouterLink>
                <RouterLink
                  v-else
                  key="user"
                  class="absolute inset-0 flex items-center justify-center p-2 font-bold text-[#7C7C7C] hover:text-primary-700"
                  to="/member"
                >
                  會員中心
                </RouterLink>
              </Transition>
            </li> -->
            <li class="h-10 w-24">
              <Transition name="fade" mode="out-in">
                <RouterLink
                  v-if="!memberStore.getLoginStatus"
                  key="signin"
                  class="flex h-full w-full items-center justify-center p-2 font-bold text-[#7C7C7C] hover:text-primary-700"
                  to="/signin"
                >
                  登入 / 註冊
                </RouterLink>
                <RouterLink
                  v-else
                  key="user"
                  class="flex h-full w-full items-center justify-center p-2 font-bold text-[#7C7C7C] hover:text-primary-700"
                  to="/member"
                >
                  會員中心
                </RouterLink>
              </Transition>
            </li>
            <li v-for="mainNavItem in mainNav" :key="mainNavItem.id">
              <RouterLink
                class="block p-2 font-bold text-[#7C7C7C] hover:text-primary-700"
                :to="`${mainNavItem.path}`"
              >
                {{ mainNavItem.title }}
              </RouterLink>
            </li>
          </ul>
          <!-- 原icon區塊 -->
          <!-- <ul class="flex items-center gap-x-4">
            <li v-for="utilNavItem in utilNav" :key="utilNavItem.id">
              <RouterLink class="block p-2" :to="`${utilNavItem.path}`">
                <FontAwesomeIcon :icon="utilNavItem.iconStyle" size="lg" />
              </RouterLink>
            </li>
          </ul> -->
          <!-- 用來控制縮合的按鈕，手機板才會顯示 -->
          <button class="cursor-pointer p-2 hover:block md:hidden" @click="toggleMenu">
            <RouterLink key="cart" class="font-bold hover:text-primary-700" to="/checkout">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" />
            </RouterLink>
          </button>
          <button class="cursor-pointer p-2 hover:block md:hidden" @click="toggleMenu">
            <FontAwesomeIcon :icon="['fas', 'bars']" size="xl" />
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
          <li>
            <RouterLink
              v-if="!memberStore.getMemberInfo.id"
              key="signin"
              class="block p-4 hover:bg-primary-200"
              to="/signin"
            >
              登入 / 註冊
            </RouterLink>
            <RouterLink v-else key="user" class="block p-4 hover:bg-primary-200" to="/member">
              會員中心
            </RouterLink>
          </li>
          <li
            v-for="mainNavItem in mainNav.filter((item) => item.id !== 'cart')"
            :key="mainNavItem.id"
          >
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
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
