<script setup lang="ts">
import { ref, onMounted, watch, computed, provide } from 'vue'
import TheMask from '@/components/global/TheMask.vue'
import DaysSelectionButton from '@/components/global/DaysSelectionButton.vue'
import ThePreview from '@/components/mealboxlist-page/ThePreview.vue'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'
import { useCustomMealBoxStore } from '@/stores/custommealbox'
import { useCartStore } from '@/stores/cart'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const generalMealBoxStore = useGeneralMealBoxStore()
const customMealBoxStore = useCustomMealBoxStore()
const cartStore = useCartStore()
const drawer = ref(false)
const isCardLoaning = ref(false)
const isExpanded = ref(false) //控制預覽列以及遮罩
const getDirection = computed(() => (width.value >= 768 ? 'rtl' : 'btt'))
const getDirectionHeight = computed(() => (width.value >= 768 ? '60%' : '50%'))
const message = (mes: any, mesType: any): void => {
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
const addCustomCart = async (id: number) => {
  try {
    const response = await cartStore.fetchaddCustomCart(id)
    if (response === 'endOrder') {
      return
    } else {
      message('餐盒已加入', 'success')
    }
  } catch (error: any) {
    message(error.message, 'error')
  }
}
const minusCustomCart = async (id: number) => {
  try {
    const response = await cartStore.fetchMinusCustomCart(id)
    if (response === 'notExist') {
      return
    } else {
      message('餐盒已移除', 'warning')
    }
  } catch (error: any) {
    message(error.message, 'error')
  }
}
const deleteAllCart = async () => {
  try {
    await cartStore.cleanCart()
    message('餐盒已移除', 'warning')
  } catch (error: any) {
    message(error.message, 'error')
  }
}
const handlePreview = () => {
  window.scrollTo({
    top: 0
    // behavior: 'smooth' // 可選，讓滾動有平滑過渡效果
  })
  drawer.value = true
}
provide('isCardLoaning', isCardLoaning)
onMounted(async () => {
  isCardLoaning.value = true
  await generalMealBoxStore.fetchGeneralMeal()
  await customMealBoxStore.fetchCustomMeal()
  await cartStore.fetchMemberCartInfo()
  isCardLoaning.value = false
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>
<template>
  <main class="flex flex-grow flex-col pb-40">
    <!-- 遮罩 -->
    <TheMask :isExpanded="isExpanded" :toggleExpand="toggleExpand" />
    <DaysSelectionButton />
    <section class="container flex flex-grow flex-col">
      <div class="py-7">
        <h2 class="text-center text-[32px] font-bold">從列表中選擇您最愛的餐點</h2>
        <div class="mt-6">
          <p class="text-center">營養均衡、健康的配菜，隨手可得</p>
          <p class="text-center">從我們的精選單中選擇您最喜歡的餐點</p>
        </div>
      </div>
      <div class="flex flex-grow flex-col">
        <div class="flex border-t border-black py-8 text-2xl">
          <RouterLink
            class="meal-link flex-grow text-center"
            to="/mealboxlist/mealgeneral"
            linkExactActiveClass="link-active"
          >
            一般餐盒
          </RouterLink>
          <RouterLink
            class="meal-link flex-grow text-center"
            to="/mealboxlist/mealcustomized"
            linkExactActiveClass="link-active"
          >
            自定義餐盒
          </RouterLink>
        </div>

        <RouterView class="flex flex-grow flex-col gap-y-6 py-6 md:gap-y-12"></RouterView>
      </div>
    </section>

    <!-- 預覽列-2  -->
    <section
      class="fixed bottom-0 left-0 right-0 z-10 bg-secondary-50 shadow-lg transition-all duration-300 ease-in-out"
    >
      <div class="container">
        <div class="grid grid-cols-4 gap-6 py-10 sm:grid-cols-12" v-if="!drawer">
          <button
            v-if="!isExpanded"
            class="col-span-2 col-start-1 rounded border-2 border-secondary-900 bg-white py-3 text-secondary-900 sm:col-span-5 sm:col-start-2 md:col-span-4 md:col-start-3 lg:col-span-3 lg:col-start-4"
            @click="toggleExpand"
          >
            查看預覽
          </button>
          <button
            v-else
            class="col-span-2 col-start-1 rounded border-2 border-secondary-900 bg-white py-3 text-secondary-900 sm:col-span-5 sm:col-start-2 md:col-span-4 md:col-start-3 lg:col-span-3 lg:col-start-4"
            @click="deleteAllCart"
          >
            全部刪除
          </button>
          <RouterLink
            to="/checkout"
            v-if="cartStore.getIsEndOrder"
            class="col-span-2 col-start-3 rounded border-2 border-black bg-secondary-base py-3 text-center sm:col-span-5 sm:col-start-7 md:col-span-4 lg:col-span-3"
          >
            確認餐點，加入購物車
          </RouterLink>
          <p
            v-else
            class="col-span-2 col-start-3 rounded bg-secondary-200 py-3 text-center sm:col-span-5 sm:col-start-7 md:col-span-4 lg:col-span-3"
          >
            已選擇{{ cartStore.getMealBoxTotal }} / {{ cartStore.getCaseType }}餐
          </p>
        </div>
      </div>
      <ThePreview
        :isExpanded="isExpanded"
        :cartGeneralBoxes="cartStore.getGeneralBoxes"
        :cartCustomBoxes="cartStore.getCustomizedBoxes"
        :addGeneralCart="addGeneralCart"
        :minusGeneralCart="minusGeneralCart"
        :addCustomCart="addCustomCart"
        :minusCustomCart="minusCustomCart"
        :deleteAllCart="deleteAllCart"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.router-link-active {
  color: $primary-base;
}
.meal-link:nth-child(1) {
  border-right: 1px solid black;
}
</style>
