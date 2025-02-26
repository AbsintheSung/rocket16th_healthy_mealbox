<script setup>
import { computed, inject } from 'vue'
import { Plus, Minus, Loading } from '@element-plus/icons-vue'
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
const isCustomAddButtonLoad = inject('isCustomAddButtonLoad')
const isCustomDelButtonLoad = inject('isCustomDelButtonLoad')
const isCustomMealId = inject('isCustomMealId')
const addButtonLoad = computed(() => {
  return isCustomMealId.value === props.mealInfo.id && isCustomAddButtonLoad.value
})
const delButtonLoad = computed(() => {
  return isCustomMealId.value === props.mealInfo.id && isCustomDelButtonLoad.value
})
const lockButton = computed(() => isCustomAddButtonLoad.value || isCustomDelButtonLoad.value)
const cartMealQty = computed(() => {
  const cartItem = cartStore.getCustomizedBoxes.find((item) => item.id === props.mealInfo.id)
  return cartItem ? cartItem.boxQuantity : 0
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
