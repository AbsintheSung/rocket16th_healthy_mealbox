<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const mainNav = ref([
  { id: 'usage', title: '使用方式', path: '/' },
  { id: 'faq', title: '常見問題', path: '/' }
])
const utilNav = ref([
  { id: 'home', iconStyle: ['fas', 'house'], path: '/' },
  { id: 'user', iconStyle: ['fas', 'user'], path: '/' },
  { id: 'cart', iconStyle: ['fas', 'cart-shopping'], path: '/' }
])
const selectedAction = ref('')

const handleCommand = (command: string) => {
  selectedAction.value = command
  console.log(`你選擇了: ${selectedAction.value}`)
}
</script>
<template>
  <header>
    <nav class="container py-5">
      <div class="grid grid-cols-12 gap-6 md:-mx-3">
        <h1 class="col-span-3 col-start-1 text-center"><RouterLink to="/">Logo</RouterLink></h1>
        <div class="col-span-9 col-start-4 flex gap-x-6">
          <ul class="ms-auto flex gap-x-4">
            <li class="flex items-center justify-center">
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">餐盒選擇</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="7">7 餐</el-dropdown-item>
                    <el-dropdown-item command="14">14 餐</el-dropdown-item>
                    <el-dropdown-item command="21">21 餐</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </li>
            <li v-for="mainNavItem in mainNav" :key="mainNavItem.id">
              <RouterLink class="block p-2" :to="`${mainNavItem.path}`">
                {{ mainNavItem.title }}
              </RouterLink>
            </li>
          </ul>
          <ul class="flex items-center gap-x-4">
            <!-- <li><FontAwesomeIcon :icon="['fas', 'magnifying-glass']" size="xl" /></li> -->
            <li v-for="utilNavItem in utilNav" :key="utilNavItem.id">
              <RouterLink class="block p-2" :to="`${utilNavItem.path}`">
                <FontAwesomeIcon :icon="utilNavItem.iconStyle" size="xl" />
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.el-dropdown-link,
:deep(.el-dropdown-menu__item) {
  font-size: 16px;
}
</style>
