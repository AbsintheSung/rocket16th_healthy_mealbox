<script setup lang="ts">
import { computed, inject } from 'vue'
// import MealCard from '@/components/global/MealCard.vue'
import CustomCard from '@/components/global/CustomCard.vue'
import TheCardSkeleton from '@/components/global/TheCardSkeleton.vue'
import ThePagination from '@/components/global/ThePagination.vue'
import TheSvg from '@/components/global/TheSvg.vue'
import { useCustomMealBoxStore } from '@/stores/custommealbox'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
const router = useRouter()
const cartStore = useCartStore()
const customMealBoxStore = useCustomMealBoxStore()
const isCardLoaning = inject('isCardLoaning')
const handleCustomMealId = inject('handleCustomMealId') as (id: number) => void
const handleCustomAddButton = inject('handleCustomAddButton') as () => void
const handleCustomDelButton = inject('handleCustomDelButton') as () => void
const isLastPage = computed(() => {
  return customMealBoxStore.currentPage === customMealBoxStore.getTotalPages
})
const handleAddCustom = () => {
  router.push('/customized')
}
const message = (mes: any, mesType: string) => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 750,
    grouping: true
  })
}
const addCustomCart = async (id: number) => {
  try {
    handleCustomMealId(id)
    handleCustomAddButton()
    const response = await cartStore.fetchaddCustomCart(id)
    if (response === 'endOrder') {
      return
    } else {
      message('餐盒已加入', 'success')
    }
  } catch (error: any) {
    message(error.message, 'error')
  } finally {
    handleCustomMealId(-1)
    handleCustomAddButton()
  }
}
const minusCustomCart = async (id: number) => {
  try {
    handleCustomMealId(id)
    handleCustomDelButton()
    const response = await cartStore.fetchMinusCustomCart(id)
    if (response === 'notExist') {
      return
    } else {
      message('餐盒已移除', 'warning')
    }
  } catch (error: any) {
    message(error.message, 'error')
  } finally {
    handleCustomMealId(-1)
    handleCustomDelButton()
  }
}
</script>
<template>
  <div>
    <template v-if="isCardLoaning">
      <ul
        class="custom-mealcard-row grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4"
      >
        <TheCardSkeleton :isCardLoaning="isCardLoaning" v-for="item in 8" :key="item" />
      </ul>
    </template>
    <template v-else>
      <ul
        v-if="customMealBoxStore.getDataTotal > 0"
        class="custom-mealcard-row grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4"
      >
        <CustomCard
          v-for="custItem in customMealBoxStore.getCustomMeal"
          :key="custItem.id"
          :mealInfo="custItem"
          :addData="addCustomCart"
          :minusData="minusCustomCart"
        />
        <li v-if="isLastPage" class="flex h-full flex-col gap-y-4 rounded border border-dashed p-4">
          <button
            class="flex flex-grow flex-col items-center justify-center gap-y-6"
            @click="handleAddCustom"
          >
            <fontAwesomeIcon :icon="['fas', 'plus']" class="p-2" />
            <p>新增餐盒</p>
          </button>
        </li>
      </ul>
      <div class="flex flex-grow flex-col py-20" v-else>
        <div
          class="flex flex-grow flex-col items-center justify-center gap-y-8 border-2 border-dashed border-black py-4 md:py-14"
        >
          <TheSvg svgIcon="custom-sprite" class="h-[98px] w-[98px]" />
          <div class="flex flex-col items-center justify-center">
            <p>還沒有加入任何餐盒</p>
            <p>點擊新增開始來製作專屬餐盒吧！</p>
          </div>
          <button
            class="rounded bg-secondary-400 px-3 py-5 hover:cursor-pointer hover:shadow-base"
            @click="handleAddCustom"
          >
            新增自定義餐盒
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped lang="scss">
.custom-mealcard-row {
  /* 
  因為 自定義區塊 有一個卡片按鈕是 新增餐盒，它必須和其他卡片一樣的高度，
  當該按鈕，在最下方且周圍沒有其他 li 卡片的話，會導致它無法跟有內容的卡片高度一致，
  使得它高度為原始高度。
  可以直接在 ul 添加 grid-auto-rows-fr ，為了註解並解釋此 css設定所以另外寫
  */
  grid-auto-rows: 1fr;
}
</style>
