<script setup lang="ts">
import type { CartGeneralMealBoxes, CartCustomBoxes } from '@/types/type'
type Props = {
  directionPosition: String
  directionWidth: String
  mealBoxTotal: number
  caseType: number
  cartGeneralBoxes: CartGeneralMealBoxes[]
  cartCustomBoxes: CartCustomBoxes[]
  isEndOrder: boolean
  addGeneralCart: (id: number) => Promise<void>
  minusGeneralCart: (id: number) => Promise<void>
  addCustomCart: (id: number) => Promise<void>
  minusCustomCart: (id: number) => Promise<void>
  deleteAllCart: () => Promise<void>
}
const props = defineProps<Props>()
const drawer = defineModel('drawer')
////js設定
// const props = defineProps({
//   mealBoxTotal: {
//     type: Number,
//     default: 0
//   },
//   caseType: {
//     type: Number,
//     default: 7
//   },
//   generalBoxes: {
//     type: Array,
//     default: () => []
//   }
// })
</script>
<template>
  <div>
    <el-drawer
      v-model="drawer"
      :direction="directionPosition"
      :append-to-body="false"
      :lock-scroll="true"
      :show-close="false"
      :size="directionWidth"
    >
      <template #header>
        <div class="container p-4">
          <div class="grid grid-cols-4 gap-6 md:grid-cols-12">
            <button
              class="col-span-2 col-start-1 rounded border-2 border-secondary-900 bg-white py-3 text-secondary-900 md:col-span-5 md:col-start-2"
              @click="deleteAllCart"
            >
              全部刪除
            </button>
            <RouterLink
              to="/checkout"
              v-if="isEndOrder"
              class="col-span-2 col-start-3 rounded border-2 border-black bg-secondary-base py-3 text-center text-black md:col-span-5"
            >
              確認餐點，加入購物車
            </RouterLink>
            <p
              v-else
              class="col-span-2 col-start-3 rounded bg-secondary-200 py-3 text-center text-black md:col-span-5"
            >
              已選擇{{ mealBoxTotal }} / {{ caseType }}餐
            </p>
          </div>
        </div>
      </template>
      <div class="container p-4">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-12">
          <!-- <button
            class="col-span-2 col-start-1 rounded border-2 border-secondary-900 bg-white py-3 text-secondary-900 sm:col-span-5 sm:col-start-2 md:col-span-4 md:col-start-3 lg:col-span-3 lg:col-start-4"
            @click="deleteAllCart"
          >
            全部刪除
          </button>
          <RouterLink
            to="/checkout"
            v-if="isEndOrder"
            class="col-span-2 col-start-3 rounded border-2 border-black bg-secondary-base py-3 text-center sm:col-span-5 sm:col-start-7 md:col-span-4 lg:col-span-3"
          >
            確認餐點，加入購物車
          </RouterLink>
          <p
            v-else
            class="col-span-2 col-start-3 rounded bg-secondary-200 py-3 text-center sm:col-span-5 sm:col-start-7 md:col-span-4 lg:col-span-3"
          >
            已選擇{{ mealBoxTotal }} / {{ caseType }}餐
          </p> -->
          <ul
            class="scrollbar-hide col-span-4 col-start-1 flex h-80 flex-col gap-y-4 text-[12px] md:col-span-12 md:text-base"
          >
            <li
              v-for="generalItem in cartGeneralBoxes"
              :key="generalItem.id"
              class="grid grid-cols-4 items-center gap-6 md:grid-cols-12"
            >
              <div class="col-span-4 bg-white p-2 md:col-span-10 md:col-start-2">
                <div class="grid grid-cols-4 items-center gap-6 md:grid-cols-10">
                  <img :src="generalItem.imgArr[0]" class="col-span-1 h-[66px] md:col-span-2" />
                  <div class="col-span-2 flex flex-col gap-y-4 md:col-span-5">
                    <h3 class="font-bold">{{ generalItem.name }}</h3>
                    <p>
                      <span> {{ generalItem.composition.calories }}Kcal |</span>
                      <span>蛋白質{{ generalItem.composition.protein }}g |</span>
                      <span>脂肪{{ generalItem.composition.adipose }}g</span>
                    </p>
                  </div>
                  <div
                    class="col-span-1 flex items-center justify-end gap-x-5 self-end md:col-span-3"
                  >
                    <button class="border p-1" @click="minusGeneralCart(generalItem.id)">
                      <FontAwesomeIcon :icon="['fas', 'minus']" />
                    </button>
                    <span>{{ generalItem.boxQuantity }}</span>
                    <button
                      class="border bg-primary-base p-1"
                      @click="addGeneralCart(generalItem.id)"
                    >
                      <FontAwesomeIcon :icon="['fas', 'plus']" />
                    </button>
                  </div>
                </div>
              </div>
            </li>

            <li
              v-for="customItem in cartCustomBoxes"
              :key="customItem.id"
              class="grid grid-cols-4 items-center gap-6 md:grid-cols-12"
            >
              <div class="col-span-4 bg-white p-2 md:col-span-10 md:col-start-2">
                <div class="grid grid-cols-4 items-center gap-6 md:grid-cols-10">
                  <img :src="customItem.imgSrc" class="col-span-1 h-[66px] md:col-span-2" />
                  <div class="col-span-2 flex flex-col gap-y-4 md:col-span-5">
                    <h3 class="font-bold">{{ customItem.name }}</h3>
                    <p>
                      <span> {{ customItem.composition.calories }}Kcal |</span>
                      <span>蛋白質{{ customItem.composition.protein }}g |</span>
                      <span>脂肪{{ customItem.composition.adipose }}g</span>
                    </p>
                  </div>
                  <div
                    class="col-span-1 flex items-center justify-end gap-x-5 self-end md:col-span-3"
                  >
                    <button class="border p-1" @click="minusCustomCart(customItem.id)">
                      <FontAwesomeIcon :icon="['fas', 'minus']" />
                    </button>
                    <span>{{ customItem.boxQuantity }}</span>
                    <button
                      class="border bg-primary-base p-1"
                      @click="addCustomCart(customItem.id)"
                    >
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
<style scoped lang="scss">
:deep(.el-drawer__header) {
  padding: 0px;
  margin: 0px;
}
:deep(.el-drawer) {
  background-color: $secondary-50;
  // height: v-bind(getDirectionHeight);
  // height: 50% !important;
}
:deep(.el-drawer__body) {
  // overflow-y: hidden;
  padding: 0px;
  scrollbar-width: none;
}
</style>
