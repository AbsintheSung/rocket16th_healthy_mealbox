<script setup lang="ts">
import type { CartGeneralMealBoxes, CartCustomBoxes } from '@/types/type'
type Props = {
  isExpanded: Boolean
  cartGeneralBoxes: CartGeneralMealBoxes[]
  cartCustomBoxes: CartCustomBoxes[]
  addGeneralCart: (id: number) => Promise<void>
  minusGeneralCart: (id: number) => Promise<void>
  addCustomCart: (id: number) => Promise<void>
  minusCustomCart: (id: number) => Promise<void>
  deleteAllCart: () => Promise<void>
}
const props = defineProps<Props>()
</script>
<template>
  <div
    v-show="isExpanded"
    class="container overflow-hidden transition-all duration-300 ease-in-out"
  >
    <!-- 商品列表區塊 -->
    <div class="grid grid-cols-4 gap-6 py-4 md:grid-cols-12">
      <ul
        class="scrollbar-hide col-span-4 col-start-1 flex h-96 flex-col gap-y-4 overflow-y-auto text-[12px] md:col-span-10 md:col-start-2 md:text-base"
      >
        <li
          v-for="generalItem in cartGeneralBoxes"
          :key="generalItem.id"
          class="bg-white px-4 py-3 md:px-5"
        >
          <div class="flex h-full items-center gap-x-3 md:gap-x-5">
            <img :src="generalItem.imgArr[0]" class="h-[66px]" />
            <div class="flex h-full flex-col justify-between">
              <h3 class="font-bold">{{ generalItem.name }}</h3>
              <p>
                <span> {{ generalItem.composition.calories }}Kcal |</span>
                <span>蛋白質{{ generalItem.composition.protein }}g |</span>
                <span>脂肪{{ generalItem.composition.adipose }}g</span>
              </p>
            </div>
            <div class="ms-auto flex items-center justify-end gap-x-5 self-end">
              <button class="border p-1" @click="minusGeneralCart(generalItem.id)">
                <FontAwesomeIcon :icon="['fas', 'minus']" />
              </button>
              <span>{{ generalItem.boxQuantity }}</span>
              <button class="border bg-primary-base p-1" @click="addGeneralCart(generalItem.id)">
                <FontAwesomeIcon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>
        </li>
        <li
          v-for="customItem in cartCustomBoxes"
          :key="customItem.id"
          class="bg-white px-4 py-3 md:px-5"
        >
          <div class="flex h-full items-center gap-x-3 md:gap-x-5">
            <img :src="customItem.imgSrc" class="h-[66px]" />
            <div class="flex h-full flex-col justify-between">
              <h3 class="font-bold">{{ customItem.name }}</h3>
              <p>
                <span> {{ customItem.composition.calories }}Kcal |</span>
                <span>蛋白質{{ customItem.composition.protein }}g |</span>
                <span>脂肪{{ customItem.composition.adipose }}g</span>
              </p>
            </div>
            <div class="ms-auto flex items-center justify-end gap-x-5 self-end">
              <button class="border p-1" @click="minusCustomCart(customItem.id)">
                <FontAwesomeIcon :icon="['fas', 'minus']" />
              </button>
              <span>{{ customItem.boxQuantity }}</span>
              <button class="border bg-primary-base p-1" @click="addCustomCart(customItem.id)">
                <FontAwesomeIcon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>
        </li>
      </ul>
      <!-- <p v-else class="text-gray-400">目前無商品</p> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* WebKit */
}
</style>
