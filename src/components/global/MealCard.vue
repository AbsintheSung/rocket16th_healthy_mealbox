<script setup>
import { Plus, Minus, Loading } from '@element-plus/icons-vue'
import { computed, watch, inject } from 'vue'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
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
  }
})
const isGeneralAddButtonLoad = inject('isGeneralAddButtonLoad')
const isGeneralDelButtonLoad = inject('isGeneralDelButtonLoad')
const isGeneralMealId = inject('isGeneralMealId')
const addButtonLoad = computed(() => {
  return isGeneralMealId.value === props.mealInfo.id && isGeneralAddButtonLoad.value
})
const delButtonLoad = computed(() => {
  return isGeneralMealId.value === props.mealInfo.id && isGeneralDelButtonLoad.value
})
const lockButton = computed(() => isGeneralAddButtonLoad.value || isGeneralDelButtonLoad.value)
const cartMealQty = computed(() => {
  const cartItem = cartStore.getGeneralBoxes.find((item) => item.id === props.mealInfo.id)
  return cartItem ? cartItem.boxQuantity : 0
})
</script>
<template>
  <li class="flex flex-col gap-y-4 rounded border p-4">
    <!-- <img src="https://picsum.photos/278/214?random=1" /> -->
    <img :src="mealInfo.imgArr[0]" />
    <div class="flex flex-col gap-y-4">
      <RouterLink :to="`/singlemeal/${mealInfo.id}`">
        <p class="font-bold">{{ mealInfo.name }}</p>
      </RouterLink>
      <!-- <ul class="flex flex-row flex-wrap items-center gap-x-4 gap-y-4 text-[10px] sm:text-[14px]">
        <li class="text-center">{{ mealInfo.composition.calories }}Kcal</li>
        <li class="text-center">蛋白質{{ mealInfo.composition.protein }}g</li>
        <li class="text-center">碳水{{ mealInfo.composition.carbohydrate }}g</li>
      </ul> -->
      <p class="text-[10px] sm:text-[14px]">
        {{ mealInfo.composition.calories }}Kcal &ensp;|&ensp; 蛋白質{{
          mealInfo.composition.protein
        }}g &ensp;|&ensp; 碳水{{ mealInfo.composition.carbohydrate }}g
      </p>
    </div>
    <div class="mt-auto flex items-center gap-x-3">
      <el-button
        :disabled="lockButton"
        @click="minusData(mealInfo.id)"
        size="large"
        type="default"
        class="custom-hover-button hidden w-1/2 flex-grow items-center justify-center gap-x-2 md:flex"
      >
        <template #default>
          <div class="flex items-center gap-x-3">
            <el-icon v-if="!delButtonLoad">
              <Minus />
            </el-icon>
            <el-icon class="is-loading" v-else>
              <Loading />
            </el-icon>
            <p>刪除</p>
          </div>
        </template>
      </el-button>

      <el-button
        :disabled="lockButton"
        size="large"
        @click="addData(mealInfo.id)"
        class="custom-hover-button add-button flex w-1/2 flex-grow items-center justify-center gap-x-2"
      >
        <template #default>
          <div class="flex items-center gap-x-3">
            <el-icon v-if="!addButtonLoad">
              <Plus />
            </el-icon>
            <el-icon class="is-loading" v-else>
              <Loading />
            </el-icon>
            <p class="hover-text-black text-primary-700">加入</p>
          </div>
        </template>
      </el-button>
      <!-- <el-button
        v-else
        class="add-button flex h-full w-1/2 flex-grow items-center justify-center gap-x-2"
        loading
      ></el-button> -->
      <!-- <button
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
      </button> -->
      <div class="flex gap-x-1 self-end text-[12px] font-bold">
        <p>
          {{ cartMealQty }}
        </p>
        <p>餐</p>
      </div>
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
