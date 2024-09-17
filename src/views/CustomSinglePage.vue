<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useCustomMealBoxStore } from '@/stores/custommealbox'
import { useMakeCustomMealStore } from '@/stores/makecustommeal'
import { useRoute, useRouter } from 'vue-router'
import TheIngredient from '@/components/global/TheIngredient.vue'
const customMealBoxStore = useCustomMealBoxStore()
const makeCustomMealStore = useMakeCustomMealStore()
const route = useRoute()
const router = useRouter()
const customData = ref({})
const handlePrevious = () => {
  router.back()
}

// 查找id 有沒有在 資料裡
function findDishById(id, list) {
  return list.find((item) => item.id === id)
}
const mapIdsToObjects = (ids, list) => {
  //一開始加載為空，map會報錯誤，設條件判斷
  if (!Array.isArray(ids) || !Array.isArray(list)) {
    return []
  }
  return ids.map((id) => list.find((item) => item.id === id)).filter((item) => item !== undefined)
}
// 計算映射後的資料
const getCustomData = computed(() => {
  //   if (!customData.value) return []
  return {
    ...customData.value,
    starch: mapIdsToObjects(customData.value.starch, makeCustomMealStore.getstarchDishes),
    mainMeal: mapIdsToObjects(customData.value.mainMeal, makeCustomMealStore.getMainMealDishes),
    sideDishes: mapIdsToObjects(customData.value.sideDishes, makeCustomMealStore.getSideDishes)
  }
})

const getCustomDatatoArray = computed(() => {
  return [customData.value]
})

onMounted(async () => {
  await makeCustomMealStore.fetchCustomMenu()
  await customMealBoxStore.fetchCustomMeal()
  const data = customMealBoxStore.getCustomMeal
  const id = Number(route.params.id)
  const item = findDishById(id, data)
  customData.value = item
})
</script>
<template>
  <main class="flex flex-grow flex-col">
    <section class="container flex flex-grow flex-col py-4">
      <div class="grid flex-grow grid-cols-4 gap-6 py-4 sm:grid-cols-12 sm:pt-24">
        <div class="col-span-3 col-start-1 -me-3 sm:col-span-4 sm:me-0 lg:col-span-3">
          <!-- <div class="img-bg p-4"> -->
          <img :src="getCustomData.imgSrc" />
          <!-- </div> -->
        </div>
        <div class="col-span-1 col-start-4 flex items-start sm:hidden">
          <button class="ms-auto hover:cursor-pointer" @click="handlePrevious">
            <FontAwesomeIcon :icon="['far', 'circle-xmark']" size="xl" />
          </button>
        </div>
        <div
          class="col-span-full col-start-1 flex flex-col gap-y-2 sm:col-span-8 sm:col-start-5 md:gap-y-4 lg:col-span-9 lg:col-start-4"
        >
          <div class="flex items-center">
            <h2
              class="mb-6 w-fit rounded bg-primary-300 p-4 text-2xl shadow-base md:mb-4 md:px-7 md:py-6"
            >
              {{ getCustomData.name }}
            </h2>
            <button class="ms-auto hidden hover:cursor-pointer sm:block" @click="handlePrevious">
              <FontAwesomeIcon :icon="['fas', 'xmark']" size="xl" />
            </button>
          </div>
          <div class="lg:w-2/3">
            <p>{{ getCustomData.remark }}</p>
          </div>
          <ul class="flex flex-col gap-y-4">
            <li class="lg:w-2/3">
              <h3 class="text-primary-700">產品成分</h3>
              <p v-for="item in getCustomData.mainMeal" :key="item.id">{{ item.name }}</p>
              <p v-for="item in getCustomData.sideDishes" :key="item.id">{{ item.name }}</p>
              <p v-for="item in getCustomData.starch" :key="item.id">{{ item.name }}</p>
            </li>
            <li class="flex text-secondary-500">
              <p>*</p>
              <p>{{ '營養資訊標籤的數值會根據原食材的購買狀況而變化 請檢查您收到的產品內容' }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-full col-start-1">
        <TheIngredient :allDishList="getCustomDatatoArray" />
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
// .img-bg {
//   background-image: url('../assets/image/餐盤測試/底圖.jpg');
// }
</style>
