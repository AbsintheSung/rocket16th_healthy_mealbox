<script setup>
defineProps({
  sideDishesListImg: {
    type: Array,
    default: () => []
  },
  mainMealListImg: {
    type: Array,
    default: () => []
  },
  starchDishesListImg: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <div class="flex">
    <div class="relative">
      <img src="../../assets/image/餐盤測試2/左上.png" />
      <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
        <div v-if="sideDishesListImg.length >= 1" class="flex">
          <img :src="sideDishesListImg[0]" alt="Main meal" />
        </div>
      </div>
    </div>
    <div class="relative">
      <img src="../../assets/image/餐盤測試2/中上.png" />
      <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
        <div v-if="sideDishesListImg.length >= 2" class="flex">
          <img :src="sideDishesListImg[1]" alt="Main meal" />
        </div>
      </div>
    </div>
    <div class="relative">
      <img src="../../assets/image/餐盤測試2/右上.png" />
      <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
        <div v-if="sideDishesListImg.length >= 3" class="flex">
          <img :src="sideDishesListImg[2]" alt="Main meal" />
        </div>
      </div>
    </div>
  </div>
  <div class="flex">
    <div class="relative">
      <img src="../../assets/image/餐盤測試2/左下.png" />
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="flex items-center justify-center">
          <img
            :src="item"
            alt="Main meal"
            class="w-2/3"
            v-for="item in mainMealListImg"
            :key="item"
          />
          <img
            :src="item"
            alt="starchDishes-img"
            class="w-2/3"
            v-for="item in starchDishesListImg"
            :key="item"
          />
        </div>
      </div>
    </div>
    <div class="relative">
      <img src="../../assets/image/餐盤測試2/右下.png" />
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div v-if="sideDishesListImg.length >= 4" class="flex items-center justify-center">
          <img :src="sideDishesListImg[3]" alt="Main meal" class="w-2/3" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
