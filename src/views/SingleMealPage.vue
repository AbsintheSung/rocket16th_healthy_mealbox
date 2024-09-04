<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMealBoxStore } from '@/stores/mealbox'
const mealBoxStore = useMealBoxStore()
const route = useRoute()
const router = useRouter()
const drawer = ref(false)
const oneMealData = computed(() => mealBoxStore.getOneGeneralMeal)
//英文對應中文
const nutrientNameMap = {
  calories: '卡路里',
  protein: '蛋白質',
  adipose: '脂肪',
  carbohydrate: '碳水化合物',
  fiber: '纖維',
  sodium: '鈉含量'
}
//將物件轉換為數組並添加單位
const nutritionItems = computed(() => {
  if (!oneMealData.value || !oneMealData.value.composition) return []

  return Object.entries(oneMealData.value.composition).map(([key, value]) => ({
    name: nutrientNameMap[key] || key,
    value: `${value}${key === 'calories' ? 'kcal' : 'g'}`
  }))
})
// const nutritionItems = [
//   { name: '卡路里', value: '300kcal' },
//   { name: '蛋白質', value: '20g' },
//   { name: '脂肪', value: '12g' },
//   { name: '碳水化合物', value: '300kcal' },
//   { name: '糖', value: '15g' },
//   { name: '纖維', value: '3.1g' }
// ]
const handlePrevious = () => {
  router.back()
}
onMounted(async () => {
  await mealBoxStore.featchOneGeneralMeal(route.params.id)
})
</script>
<template>
  <main class="flex flex-grow flex-col">
    <section class="container flex flex-grow flex-col py-4">
      <div class="grid flex-grow grid-cols-4 gap-6 py-4 sm:grid-cols-12 md:pt-12">
        <div class="col-span-3 col-start-1 -me-3 sm:col-span-4 sm:me-0 lg:col-span-3">
          <img src="https://picsum.photos/536/536?random=1" />
          <div class="hidden pt-8 sm:block">走馬燈</div>
        </div>
        <div class="col-span-1 col-start-4 flex items-start sm:hidden">
          <button class="ms-auto hover:cursor-pointer" @click="handlePrevious">
            <FontAwesomeIcon :icon="['far', 'circle-xmark']" size="xl" />
          </button>
        </div>
        <div
          class="col-span-full col-start-1 sm:col-span-8 sm:col-start-5 lg:col-span-9 lg:col-start-4"
        >
          <div class="flex items-center">
            <h2
              class="mb-6 w-fit rounded bg-primary-300 p-4 text-2xl shadow-base md:mb-4 md:px-7 md:py-6"
            >
              {{ oneMealData.name }}
            </h2>
            <button class="ms-auto hidden hover:cursor-pointer sm:block" @click="handlePrevious">
              <FontAwesomeIcon :icon="['far', 'circle-xmark']" size="xl" />
            </button>
          </div>
          <ul class="flex flex-col gap-y-4">
            <li class="lg:w-1/3">
              <h3>【原物料】</h3>
              <p>
                {{ oneMealData.ingredient }}
              </p>
            </li>
            <li class="lg:w-2/5">
              <h3>【菜單說明】</h3>
              <p>{{ oneMealData.description }}{{ oneMealData.menuDescription }}</p>
            </li>
            <li>
              <h3>【過敏原】</h3>
              <p>
                {{ oneMealData.allergens }}
              </p>
            </li>
            <li class="flex text-secondary-500">
              <p>*</p>
              <p>{{ '營養資訊標籤的數值會根據原食材的購買狀況而變化 請檢查您收到的產品內容' }}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="col-span-full col-start-1">
          <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
            <li
              v-for="(item, index) in nutritionItems"
              :key="item.name"
              class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
              :class="[
                index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
                index % 3 === 0 ? 'md:border-l' : 'border-l',
                (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
                'md:border-x',
                { 'md:first:border-l-0': index === 0 },
                { 'md:last:border-r-0': index === nutritionItems.length - 1 }
              ]"
            >
              <h3>{{ item.name }}</h3>
              <p>{{ item.value }}</p>
            </li>
          </ul>
        </div> -->
      </div>
      <div class="col-span-full col-start-1">
        <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
          <li
            v-for="(item, index) in nutritionItems"
            :key="item.name"
            class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
            :class="[
              index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
              index % 3 === 0 ? 'md:border-l' : 'border-l',
              (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
              'md:border-x',
              { 'md:first:border-l-0': index === 0 },
              { 'md:last:border-r-0': index === nutritionItems.length - 1 }
            ]"
          >
            <h3>{{ item.name }}</h3>
            <p>{{ item.value }}</p>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped></style>
