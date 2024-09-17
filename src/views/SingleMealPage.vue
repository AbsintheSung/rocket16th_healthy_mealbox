<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'
import { useRoute, useRouter } from 'vue-router'
import TheIngredient from '@/components/global/TheIngredient.vue'
const generalMealBoxStore = useGeneralMealBoxStore()
const route = useRoute()
const router = useRouter()
// const drawer = ref(false)
const oneMealData = computed(() => generalMealBoxStore.getOneGeneralMeal)
const getDishList = computed(() => {
  return [
    {
      ...oneMealData.value,
      composition: { ...oneMealData.value.composition },
      imgArr: [...oneMealData.value.imgArr]
    }
  ]
})
const handlePrevious = () => {
  router.back()
}
onMounted(async () => {
  await generalMealBoxStore.fetchOneGeneralMeal(route.params.id)
  // console.log(generalMealBoxStore.getOneGeneralMeal)
})
</script>
<template>
  <main class="flex flex-grow flex-col">
    <section class="container flex flex-grow flex-col py-4">
      <div class="grid flex-grow grid-cols-4 gap-6 py-4 sm:grid-cols-12 sm:pt-24">
        <div class="col-span-3 col-start-1 -me-3 sm:col-span-4 sm:me-0 lg:col-span-3">
          <!-- <img src="https://picsum.photos/536/536?random=1" />
          <div class="hidden pt-8 sm:block">走馬燈</div> -->
          <img :src="oneMealData.imgArr[1]" />
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
              {{ oneMealData.name }}
            </h2>
            <button class="ms-auto hidden hover:cursor-pointer sm:block" @click="handlePrevious">
              <FontAwesomeIcon :icon="['fas', 'xmark']" size="xl" />
              <!-- <FontAwesomeIcon :icon="['far', 'circle-xmark']" size="xl" /> -->
            </button>
          </div>
          <div class="lg:w-2/3">
            <p>{{ oneMealData.description }}</p>
            <!-- <p>{{ oneMealData.menuDescription }}</p> -->
          </div>
          <ul class="flex flex-col gap-y-4">
            <li class="lg:w-2/3">
              <h3 class="text-primary-700">產品成分</h3>
              <p>
                {{ oneMealData.ingredient }}
              </p>
            </li>
            <!-- <li class="lg:w-2/5">
              <h3>【菜單說明】</h3>
              <p>{{ oneMealData.description }}{{ oneMealData.menuDescription }}</p>
            </li> -->
            <li>
              <h3 class="text-primary-700">過敏原</h3>
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
      </div>
      <div class="col-span-full col-start-1">
        <TheIngredient :allDishList="getDishList" />
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped></style>
