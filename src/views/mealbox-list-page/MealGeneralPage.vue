<script setup lang="ts">
import { inject } from 'vue'
import MealCard from '@/components/global/MealCard.vue'
import TheCardSkeleton from '@/components/global/TheCardSkeleton.vue'
import ThePagination from '@/components/global/ThePagination.vue'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'
import { useCartStore } from '@/stores/cart'
const generalMealBoxStore = useGeneralMealBoxStore()
const cartStore = useCartStore()
const isCardLoaning = inject('isCardLoaning')
const message = (mes: any, mesType: string) => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
const addGeneralCart = async (id: number) => {
  try {
    const response = await cartStore.fetchaddGeneralCart(id)
    if (response === 'endOrder') {
      return
    } else {
      message('餐盒已加入', 'success')
    }
  } catch (error: any) {
    message(error.message, 'error')
  }
}
const minusGeneralCart = async (id: number) => {
  try {
    const response = await cartStore.fetchMinusGeneralCart(id)
    if (response === 'notExist') {
      return
    } else {
      message('餐盒已移除', 'warning')
    }
  } catch (error: any) {
    message(error.message, 'error')
  }
}
</script>
<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
      <template v-if="isCardLoaning">
        <TheCardSkeleton :isCardLoaning="isCardLoaning" v-for="item in 8" :key="item" />
      </template>
      <template v-else>
        <MealCard
          v-for="mealItem in generalMealBoxStore.getGeneralBoxes"
          :key="mealItem.id"
          :mealInfo="mealItem"
          :addData="addGeneralCart"
          :minusData="minusGeneralCart"
        />
      </template>

      <!-- <MealCard
        v-for="mealItem in generalMealBoxStore.getGeneralBoxes"
        :key="mealItem.id"
        :mealInfo="mealItem"
        :addData="addGeneralCart"
        :minusData="minusGeneralCart"
      /> -->
    </ul>
    <!-- <div class="mt-auto flex w-full items-center justify-center">
      <ThePagination
        v-model:currentPageNum="generalMealBoxStore.currentPage"
        :pagerCount="5"
        :pageSize="generalMealBoxStore.getPageSize"
        :pageTotal="generalMealBoxStore.getDataTotal"
        :changePage="generalMealBoxStore.changePage"
      />
    </div> -->
  </div>
</template>
<style scoped></style>
