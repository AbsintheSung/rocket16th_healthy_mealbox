<script setup>
import { computed, watch } from 'vue'
const props = defineProps({
  // ingredientData: {
  //   type: Array,
  //   default: () => []
  // },
  allDishList: {
    type: Array,
    default: () => []
  }
})
// 定義所有營養成分的預設值
const defaultComposition = {
  calories: 0,
  protein: 0,
  adipose: 0,
  carbohydrate: 0,
  fiber: 0,
  sodium: 0
}
const nutrientNameMap = {
  calories: '卡路里',
  protein: '蛋白質',
  adipose: '脂肪',
  carbohydrate: '碳水化合物',
  fiber: '纖維',
  sodium: '鈉含量'
}
//營養素累加
const dishIngredient = computed(() => {
  return props.allDishList.reduce(
    (total, dish) => {
      const composition = dish.composition || {} //排除空物件 - 無法累加

      Object.keys(composition).forEach((key) => {
        // 排除不在 defaultComposition 中的屬性
        if (key in total) {
          total[key] += composition[key] || 0 // 如果為 undefined 或 null 則加 0
        }
      })

      return total
    },
    { ...defaultComposition }
  )
  // return props.allDishList.reduce(
  //   (total, dish) => {
  //     Object.keys(dish.composition).forEach((key) => {
  //       if (typeof total[key] === 'undefined') {
  //         total[key] = 0
  //       }
  //       total[key] += dish.composition[key]
  //     })
  //     return total
  //   },
  //   { ...defaultComposition }
  // )
})
//將上面轉成中文，並以 [ {name:卡路里,value:450kcal},... ]方式輸出
const dishIngredientChinese = computed(() => {
  return Object.entries(dishIngredient.value).map(([key, value]) => ({
    name: nutrientNameMap[key] || key,
    // value: `${value}${key === 'calories' ? 'kcal' : 'g'}`
    value: `${value}${key === 'calories' ? 'kcal' : key === 'sodium' ? 'mg' : 'g'}`
  }))
})
</script>
<template>
  <!-- <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
    <li
      v-for="(item, index) in ingredientData"
      :key="item.name"
      class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
      :class="[
        index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
        index % 3 === 0 ? 'md:border-l' : 'border-l',
        (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
        'md:border-x',
        { 'md:first:border-l-0': index === 0 },
        { 'md:last:border-r-0': index === ingredientData.length - 1 }
      ]"
    >
      <h3>{{ item.name }}</h3>
      <p>{{ item.value }}</p>
    </li>
  </ul> -->
  <!-- 桌機板 -->
  <ul class="hidden w-full flex-wrap items-center py-6 md:flex md:flex-nowrap">
    <li
      v-for="(item, index) in dishIngredientChinese"
      :key="item.name"
      class="flex-1 px-2 py-4 text-center"
      :class="{
        'border-r': index < dishIngredientChinese.length - 1
      }"
    >
      <div class="mb-2 font-bold">{{ item.name }}</div>
      <div>{{ item.value }}</div>
    </li>
  </ul>

  <!-- 平板 -->
  <ul class="w-full py-6 md:hidden">
    <li class="grid grid-cols-3">
      <div
        v-for="(item, index) in dishIngredientChinese.slice(0, 3)"
        :key="item.name"
        class="px-2 py-4 text-center"
        :class="{
          'border-r': index !== 2,
          'border-l': index !== 0
        }"
      >
        <div class="mb-2 font-bold">{{ item.name }}</div>
        <div>{{ item.value }}</div>
      </div>
    </li>

    <div class="my-2 border-t"></div>

    <li class="grid grid-cols-3">
      <div
        v-for="(item, index) in dishIngredientChinese.slice(3)"
        :key="item.name"
        class="px-2 py-4 text-center"
        :class="{
          'border-r': index !== 2,
          'border-l': index !== 0
        }"
      >
        <div class="mb-2 font-bold">{{ item.name }}</div>
        <div>{{ item.value }}</div>
      </div>
    </li>
  </ul>
</template>
<style scoped></style>
