<script setup>
import { ref, computed, watch } from 'vue'

// const starchDishesList = ref([])
const props = defineProps({
  starchDishesList: {
    type: Array,
    default: () => []
  }
})
const localstarchDisheList = ref([...props.starchDishesList])

const starchDishes = ref([
  {
    id: 2,
    dishesType: 'starch', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '半碗米飯',
    price: 20,
    grams: 100, // 公克
    img: new URL('@/assets/image/餐盤測試/白飯.png', import.meta.url).href, // 菜色去背後的圖片
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
    id: 3,
    dishesType: 'starch', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '一碗米飯',
    price: 20,
    grams: 100, // 公克
    img: new URL('@/assets/image/餐盤測試/白飯.png', import.meta.url).href, // 菜色去背後的圖片
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
const getstarchDishes = computed(() => {
  return starchDishes.value.map((item) => ({
    ...item,
    composition: { ...item.composition }
  }))
})
const emits = defineEmits({
  updateStarchDisheSelected: () => {
    return true
  }
})
const test = (checked, item) => {
  if (checked) {
    emits('updateStarchDisheSelected', checked, [item])
  } else {
    emits('updateStarchDisheSelected', checked, [])
  }
}
</script>
<template>
  <el-collapse-item :title="`澱粉`" name="1">
    <el-checkbox-group v-model="localstarchDisheList" :min="0" :max="1" class="flex flex-col">
      <el-checkbox
        v-for="item in getstarchDishes"
        :key="item.id"
        :label="item.name"
        :value="item"
        @change="(checked) => test(checked, item)"
      />
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style scoped></style>
