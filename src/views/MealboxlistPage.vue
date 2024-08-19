<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const currentPage1 = ref(1)
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
  <main>
    <section class="container">
      <div class="py-7">
        <h2 class="text-center text-[32px] font-bold">從列表中選擇您最愛的餐點</h2>
        <div class="mt-6">
          <p class="text-center">營養均衡、健康的配菜，隨手可得</p>
          <p class="text-center">從我們的精選單中選擇您最喜歡的餐點</p>
        </div>
      </div>
      <div>
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
        <div class="pb-12 pt-6">
          <RouterView></RouterView>
        </div>
        <div class="flex w-full items-center justify-center py-6">
          <el-pagination
            style="--el-fill-color: white"
            layout="prev, pager, next"
            v-model:current-page="currentPage1"
            background
            :page-size="20"
            :pager-count="11"
            :total="200"
            :prev-text="'上一頁'"
            :next-text="'下一頁'"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </section>
    <section class="bg-primary-50">
      <div class="container">
        <div class="flex items-center justify-center gap-x-6 py-10">
          <button class="w-1/4 rounded border-2 border-black py-3" @click="drawer = true">
            查看預覽
          </button>
          <button class="w-1/4 rounded border-2 border-black bg-secondary-base py-3">
            確認餐點，加入購物車
          </button>
          <!-- <span class="w-1/12 self-end">已選擇{{ 6 }}餐</span> -->
        </div>
      </div>
      <!-- 預覽列 -->
      <div>
        <el-drawer
          v-model="drawer"
          :direction="'btt'"
          :append-to-body="false"
          :lock-scroll="false"
          :show-close="false"
        >
          <template #header> </template>
          <template #default>
            <div class="container flex h-[500px] flex-col">
              <div class="flex items-center justify-center gap-x-6 pb-6">
                <button class="w-1/4 rounded border-2 border-black py-3">刪除</button>
                <button class="w-1/4 rounded border-2 border-black bg-secondary-base py-3">
                  確認餐點，加入購物車
                </button>
              </div>
              <ul class="flex-grow gap-y-4 overflow-y-auto">
                <li class="flex items-center gap-x-4 px-6 py-3">
                  <img src="https://picsum.photos/200/200?random=1" class="w-[66px] object-cover" />
                  <div class="w-full sm:flex">
                    <div class="flex flex-col gap-y-6">
                      <h3 class="font-bold">抗氧化彩虹蔬菜炒麵</h3>
                      <p>270Kcal | 蛋白質15g |脂肪12g</p>
                    </div>
                    <div class="ms-auto flex items-center justify-center gap-x-5">
                      <button class="border p-1">
                        <FontAwesomeIcon :icon="['fas', 'minus']" />
                      </button>
                      <span>{{ 21 }}</span>
                      <button class="border bg-primary-base p-1">
                        <FontAwesomeIcon :icon="['fas', 'plus']" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
          <template #footer> </template>
        </el-drawer>
      </div>
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
  background-color: $primary-50;
  height: 50% !important;
}
</style>
