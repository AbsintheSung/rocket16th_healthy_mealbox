<script setup>
import { inject, ref } from 'vue'
import MealCard from '@/components/global/MealCard.vue'
import TheCardSkeleton from '@/components/global/TheCardSkeleton.vue'
import ThePagination from '@/components/global/ThePagination.vue'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'
import { useCartStore } from '@/stores/cart'
const generalMealBoxStore = useGeneralMealBoxStore()
const cartStore = useCartStore()
const isCardLoaning = inject('isCardLoaning')
const changeIsCardLoaning = inject('changeIsCardLoaning')
const nutrientsValue = ref('all')
const nutrientsOptions = [
  {
    value: 'all',
    label: '所有餐盒'
  },
  {
    value: 'calories',
    label: '依 卡路里排序'
  },
  {
    value: 'protein',
    label: '依 蛋白質排序'
  },
  // {
  //   value: 'adipose',
  //   label: '依 脂肪排序'
  // },
  {
    value: 'carbohydrate',
    label: '依 碳水化合物排序'
  }
  // {
  //   value: 'fiber',
  //   label: '依 纖維排序'
  // },
  // {
  //   value: 'sodium',
  //   label: '依 鈉含量排序'
  // }
]
const message = (mes, mesType) => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
const addGeneralCart = async (id) => {
  try {
    const response = await cartStore.fetchaddGeneralCart(id)
    if (response === 'endOrder') {
      return
    } else {
      message('餐盒已加入', 'success')
    }
  } catch (error) {
    message(error.message, 'error')
  }
}
const minusGeneralCart = async (id) => {
  try {
    const response = await cartStore.fetchMinusGeneralCart(id)
    if (response === 'notExist') {
      return
    } else {
      message('餐盒已移除', 'warning')
    }
  } catch (error) {
    message(error.message, 'error')
  }
}

const handelSelect = async () => {
  changeIsCardLoaning()
  try {
    if (nutrientsValue.value === 'all') {
      await generalMealBoxStore.fetchGeneralMeal()
    } else {
      await generalMealBoxStore.fetchFilterGeneralMeal(nutrientsValue.value)
    }
  } catch (error) {
    return null
  } finally {
    changeIsCardLoaning()
  }
}
</script>
<template>
  <div>
    <div>
      <el-select
        v-model="nutrientsValue"
        placeholder="Select"
        class="sm:w-1/3"
        @change="handelSelect"
      >
        <el-option
          v-for="item in nutrientsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
      <template v-if="isCardLoaning">
        <TheCardSkeleton :isCardLoaning="isCardLoaning" v-for="item in 8" :key="item" />
      </template>
      <template v-else>
        <MealCard
          v-for="mealItem in generalMealBoxStore.getFilterGeneralBoxes"
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
