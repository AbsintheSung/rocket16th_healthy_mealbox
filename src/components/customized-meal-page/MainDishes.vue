<script setup>
import { ref, computed } from 'vue'
const mainMealList = defineModel('mainMealList')
const mainMealDishes = ref([
  {
    id: 6,
    dishesType: 'mainMeal', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '嫩煎雞腿',
    price: 20,
    grams: 100, // 公克
    img: new URL('@/assets/image/餐盤測試/雞肉.png', import.meta.url).href, // 菜色去背後的圖片
    // 營養素組成
    composition: {
      calories: 470, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 55, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 100 // 庫存
  },
  {
    id: 7,
    dishesType: 'mainMeal', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '嫩煎雞腿2',
    price: 20,
    grams: 100, // 公克
    img: new URL('@/assets/image/餐盤測試/雞肉.png', import.meta.url).href, // 菜色去背後的圖片
    // 營養素組成
    composition: {
      calories: 470, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 55, // 碳水化合物
      fiber: 6, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 100 // 庫存
  }
])

const getMainMealDishes = computed(() => {
  return mainMealDishes.value.map((item) => ({
    ...item,
    composition: { ...item.composition }
  }))
})
</script>
<template>
  <el-collapse-item :title="`主食`" name="2">
    <el-checkbox-group v-model="mainMealList" :min="0" :max="1" class="flex flex-col">
      <el-checkbox
        v-for="item in getMainMealDishes"
        :key="item.id"
        :label="item.name"
        :value="item"
      />
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style scoped></style>
