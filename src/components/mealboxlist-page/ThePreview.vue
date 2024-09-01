<script setup lang="ts">
const drawer = defineModel('drawer')
</script>
<template>
  <div>
    <el-drawer
      v-model="drawer"
      direction="btt"
      :append-to-body="false"
      :lock-scroll="false"
      :show-close="false"
    >
      <div class="container p-4">
        <div class="grid grid-cols-4 gap-6 sm:grid-cols-12">
          <button
            class="col-span-2 col-start-1 rounded border-2 border-secondary-900 bg-white py-3 text-secondary-900 sm:col-span-5 sm:col-start-2 md:col-span-4 md:col-start-3 lg:col-span-3 lg:col-start-4"
          >
            全部刪除
          </button>
          <button
            class="col-span-2 col-start-3 rounded border-2 border-black bg-secondary-base py-3 sm:col-span-5 sm:col-start-7 md:col-span-4 lg:col-span-3"
          >
            確認餐點，加入購物車
          </button>
          <ul
            class="scrollbar-hide col-span-4 col-start-1 flex h-80 flex-col gap-y-4 text-[12px] sm:col-span-12 md:text-base"
          >
            <li
              v-for="item in 14"
              :key="item"
              class="grid grid-cols-4 items-center gap-6 sm:grid-cols-12"
            >
              <div class="col-span-4 bg-white p-2 sm:col-span-10 sm:col-start-2">
                <div class="grid grid-cols-4 items-center gap-6 sm:grid-cols-10">
                  <img
                    src="https://picsum.photos/200/200?random=1"
                    class="col-span-1 h-[66px] sm:col-span-2 lg:col-span-1"
                  />
                  <div class="col-span-2 flex flex-col gap-y-4 sm:col-span-5 lg:col-span-5">
                    <h3 class="font-bold">抗氧化彩虹蔬菜炒麵</h3>
                    <p>270Kcal | 蛋白質15g |脂肪12g</p>
                  </div>
                  <div
                    class="col-span-1 flex items-center justify-end gap-x-5 self-end sm:col-span-3 lg:col-span-4"
                  >
                    <button class="border p-1">
                      <FontAwesomeIcon :icon="['fas', 'minus']" />
                    </button>
                    <span>{{ 21 }}</span>
                    <button class="border bg-primary-base p-1">
                      <FontAwesomeIcon :icon="['fas', 'plus']" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<style scoped></style>
