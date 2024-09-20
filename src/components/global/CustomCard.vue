<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const routerPath = computed(() => route.path)
const props = defineProps({
  mealInfo: {
    type: Object,
    default: () => ({
      name: '商品準備中',
      composition: { calories: '', protein: '', adipose: '', carbohydrate: '', fiber: '' }
    })
  },
  addData: {
    type: Function,
    default: () => {}
  },
  minusData: {
    type: Function,
    default: () => {}
  },
  deleteData: {
    type: Function,
    default: () => {}
  },
  editData: {
    type: Function,
    default: () => {}
  }
})
</script>
<template>
  <li class="flex flex-col gap-y-4 rounded border p-4">
    <!-- <img src="https://picsum.photos/278/214?random=1" /> -->
    <img :src="mealInfo.imgSrc" class="h-[125px] sm:h-[225px] md:h-[220px]" />
    <div class="flex flex-col gap-y-4">
      <RouterLink :to="`/customsingle/${mealInfo.id}`">
        <p class="font-bold">{{ mealInfo.name }}</p>
      </RouterLink>
      <ul class="flex flex-row gap-y-4 text-[10px] sm:text-[14px]">
        <li class="flex-grow">{{ mealInfo.composition.calories }}Kcal</li>
        <li class="flex-grow border-e border-s border-black text-center">
          醣類{{ mealInfo.composition.carbohydrate }}g
        </li>
        <li class="flex-grow text-center">蛋白質{{ mealInfo.composition.protein }}g</li>
      </ul>
    </div>
    <div v-if="routerPath === '/member/custommeal'" class="mt-auto flex gap-x-3">
      <button
        @click="deleteData(mealInfo.id, mealInfo.name)"
        class="hidden flex-grow items-center justify-center gap-x-2 rounded border border-black py-2 md:flex"
      >
        刪除
      </button>
      <button
        @click="editData(mealInfo.id)"
        class="flex flex-grow items-center justify-center gap-x-2 rounded border border-primary-700 py-2 text-primary-700"
      >
        編輯
      </button>
    </div>
    <div
      v-else-if="
        routerPath === '/mealboxlist/mealcustomized' ||
        routerPath === '/mealboxlist2/mealcustomized2'
      "
      class="mt-auto flex gap-x-3"
    >
      <button
        @click="minusData(mealInfo.id)"
        class="hidden flex-grow items-center justify-center gap-x-2 rounded border border-black py-2 md:flex"
      >
        <FontAwesomeIcon :icon="['fas', 'minus']" />刪除
      </button>
      <button
        @click="addData(mealInfo.id)"
        class="flex flex-grow items-center justify-center gap-x-2 rounded border border-primary-700 py-2 text-primary-700"
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" class="text-primary-700" />加入
      </button>
    </div>
  </li>
</template>
<style lang="scss" scoped></style>
