<script setup>
import { ref, onMounted } from 'vue'
import ThePreview from '@/components/mealboxlist-page/ThePreview.vue'
import { useGeneralMealBoxStore } from '@/stores/generalMealBox'
const generalMealBoxStore = useGeneralMealBoxStore()
const drawer = ref(false)
onMounted(async () => {
  await generalMealBoxStore.fetchGeneralMeal()
})
</script>
<template>
  <main class="flex flex-grow flex-col">
    <section class="container flex flex-grow flex-col">
      <div class="py-7">
        <h2 class="text-center text-[32px] font-bold">從列表中選擇您最愛的餐點</h2>
        <div class="mt-6">
          <p class="text-center">營養均衡、健康的配菜，隨手可得</p>
          <p class="text-center">從我們的精選單中選擇您最喜歡的餐點</p>
        </div>
      </div>
      <div class="flex flex-grow flex-col">
        <div class="flex border-t border-black py-8 text-2xl">
          <RouterLink
            class="meal-link flex-grow text-center"
            to="/mealboxlist/mealgeneral"
            linkExactActiveClass="link-active"
          >
            一般餐盒
          </RouterLink>
          <RouterLink
            class="meal-link flex-grow text-center"
            to="/mealboxlist/mealcustomized"
            linkExactActiveClass="link-active"
          >
            自定義餐盒
          </RouterLink>
        </div>

        <RouterView class="flex flex-grow flex-col gap-y-6 py-6 md:gap-y-12"></RouterView>
      </div>
    </section>
    <section class="mt-auto bg-secondary-50">
      <div class="container">
        <div class="grid grid-cols-4 gap-6 py-10 sm:grid-cols-12">
          <button
            class="col-span-2 col-start-1 rounded border-2 border-secondary-900 bg-white py-3 text-secondary-900 sm:col-span-5 sm:col-start-2 md:col-span-4 md:col-start-3 lg:col-span-3 lg:col-start-4"
            @click="drawer = true"
          >
            查看預覽
          </button>
          <button
            class="col-span-2 col-start-3 rounded border-2 border-black bg-secondary-base py-3 sm:col-span-5 sm:col-start-7 md:col-span-4 lg:col-span-3"
          >
            確認餐點，加入購物車
          </button>
        </div>
      </div>
      <!-- 預覽列 -->
      <ThePreview v-model:drawer="drawer" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.router-link-active {
  color: $primary-base;
}
.meal-link:nth-child(1) {
  border-right: 1px solid black;
}
</style>
<style lang="scss">
.el-drawer {
  background-color: $secondary-50;
  height: 50% !important;
}
.el-drawer__body {
  // overflow-y: hidden;
  padding: 0px;
  scrollbar-width: none;
}
</style>
