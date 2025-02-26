<script setup>
import { Plus, Minus, Loading } from '@element-plus/icons-vue'
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
      <p class="text-[10px] sm:text-[14px]">
        {{ mealInfo.composition.calories }}Kcal &ensp;|&ensp; 蛋白質{{
          mealInfo.composition.protein
        }}g &ensp;|&ensp; 碳水{{ mealInfo.composition.carbohydrate }}g
      </p>
    </div>
    <div class="mt-auto flex gap-x-3">
      <el-button
        @click="deleteData(mealInfo.id, mealInfo.name)"
        size="large"
        type="default"
        class="custom-hover-button hidden w-1/2 flex-grow items-center justify-center gap-x-2 md:flex"
      >
        <template #default>
          <div class="flex items-center gap-x-3">
            <el-icon>
              <Minus />
            </el-icon>
            <p>刪除</p>
          </div>
        </template>
      </el-button>

      <el-button
        size="large"
        @click="editData(mealInfo.id)"
        class="custom-hover-button add-button flex w-1/2 flex-grow items-center justify-center gap-x-2"
      >
        <template #default>
          <div class="flex items-center gap-x-3">
            <el-icon>
              <Plus />
            </el-icon>
            <p class="hover-text-black text-primary-700">編輯</p>
          </div>
        </template>
      </el-button>
      <!-- <button
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
      </button> -->
    </div>
  </li>
</template>
<style lang="scss" scoped>
:deep(.el-button) {
  @apply mx-0 rounded border;
}
.add-button {
  :deep(.el-icon) {
    color: $primary-700;
  }
  &:hover {
    :deep(.el-icon) {
      color: black;
    }
  }
}
.custom-hover-button {
  @apply rounded border-2 border-secondary-900 bg-white text-secondary-900;
}
.custom-hover-button:hover {
  @apply border-2 border-black bg-secondary-400 text-black shadow-base transition !important;
}
.custom-hover-button:hover .hover-text-black {
  @apply text-black !important;
}
.custom-hover-button:active {
  @apply shadow-none !important;
}
</style>
