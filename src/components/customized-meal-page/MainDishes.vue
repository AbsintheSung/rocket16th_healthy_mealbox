<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  mainMealList: {
    type: Array,
    default: () => []
  }
})
// 定義 emits 來將數據發送回父組件
const emits = defineEmits({
  updateMainSelected: () => {
    return true
  }
})
const test = (checked, item) => {
  if (checked) {
    emits('updateMainSelected', checked, [item])
  } else {
    emits('updateMainSelected', checked, [])
  }
}

// 創建一個本地的 ref 副本來儲存 mainMealList
const localMainMealList = ref([...props.mainMealList])

const mainMealDishes = ref([
  {
    id: 6,
    dishesType: 'mainMeal', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '嫩煎雞腿',
    price: 20,
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/雞肉.png', // 菜色去背後的圖片
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
    img: '/src/assets/image/餐盤測試/雞肉.png', // 菜色去背後的圖片
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
// const emits = defineEmits({
//   updateMealSelected: () => {
//     return true
//   }
// })
// const test = (checked, item) => {
//   emits('updateMealSelected', checked, item)
//   //   console.log(val)
// }
</script>
<template>
  <el-collapse-item :title="`主食`" name="2">
    <el-checkbox-group v-model="localMainMealList" :min="0" :max="1" class="flex flex-col">
      <el-checkbox
        v-for="item in getMainMealDishes"
        :key="item.id"
        :label="item.name"
        :value="item"
        @change="(checked) => test(checked, item)"
      />
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style scoped></style>
