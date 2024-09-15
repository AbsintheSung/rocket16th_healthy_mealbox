<script setup>
import { ref, computed } from 'vue'
const sideDishesList = defineModel('sideDishesList')
const sideDishes = ref([
  {
    id: 4,
    dishesType: 'sideDishes', // 配菜 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '青花椰',
    grams: 100, // 公克
    img: new URL('@/assets/image/餐盤測試/青花耶.png', import.meta.url).href, // 菜色去背後的圖片
    price: 30,
    // 營養素組成
    composition: {
      calories: 200, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 15, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 200 // 庫存
  },
  {
    id: 5,
    dishesType: 'sideDishes', // 配菜 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '小黃瓜',
    grams: 100, // 公克
    img: new URL('@/assets/image/餐盤測試/小黃瓜.png', import.meta.url).href, // 菜色去背後的圖片
    price: 30,
    // 營養素組成
    composition: {
      calories: 200, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 15, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 200 // 庫存
  }
])

const getSideDishes = computed(() => {
  return sideDishes.value.map((item) => ({
    ...item,
    composition: { ...item.composition }
  }))
})
</script>
<template>
  <el-collapse-item :title="`配菜`" name="3">
    <el-checkbox-group v-model="sideDishesList" :min="0" :max="1" class="flex flex-col">
      <el-checkbox v-for="item in getSideDishes" :key="item.id" :label="item.name" :value="item" />
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style scoped></style>
