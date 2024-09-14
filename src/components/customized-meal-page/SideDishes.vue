<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  sideDishesList: {
    type: Array,
    default: () => []
  }
})
// 定義 emits 來將數據發送回父組件
const emits = defineEmits({
  updateSideDishesSelected: () => {
    return true
  }
})
const test = (checked, item) => {
  if (checked) {
    emits('updateSideDishesSelected', [item])
  } else {
    emits('updateSideDishesSelected', [])
  }
}

// 創建一個本地的 ref 副本來儲存 mainMealList
const localSideDishesList = ref([...props.sideDishesList])

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
    <el-checkbox-group v-model="localSideDishesList" :min="0" :max="1" class="flex flex-col">
      <el-checkbox
        v-for="item in getSideDishes"
        :key="item.id"
        :label="item.name"
        :value="item"
        @change="(checked) => test(checked, item)"
      />
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style scoped></style>
