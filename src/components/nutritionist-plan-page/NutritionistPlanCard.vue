<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'

const cartStore = useCartStore()
const router = useRouter()

const props = defineProps({
  planInfo: {
    type: Object,
    default: () => ({
      nutritionistName: '',
      nutritionistImg: '',
      nutritionistSeniority: '',
      caseType: null,
      caseName: '商品準備中',
      caseThumbnail: '',
      caseDescription: '',
      boxes: []
    })
  }
})

const addToCart = async () => {
  try {
    const result = await cartStore.addNutritionistPlanToCart(props.planInfo.id)
    const loading = ElLoading.service({
      lock: true,
      text: '正在加入至購物車...',
    })
    setTimeout(() => {
      loading.close()
    }, 300)
    setTimeout(() => {
      if (result === "success") {
        ElMessage.success('成功加入購物車')
        router.push('/checkout/order-confirmation')
      } else if (result === "partiallyAdded") {
        ElMessage.warning('購物車已滿')
      } else if (result === "cartFull") {
        ElMessage.warning('購物車已滿')
      }
    }, 500)
  } catch (error) {
    if (error && error.status === 401) {
      ElMessage({
        message: '請先登入會員',
        type: 'warning',
        duration: 800
      })
      setTimeout(() => {
        const loading = ElLoading.service({
          lock: true,
          text: '正在跳轉至登入頁面...',
        })
        loading.close()
      }, 500)

      setTimeout(() => {
        router.push('/signin')
      }, 800)
    } else {
      ElMessage.error('加入購物車失敗')
    }
  }
}


</script>
<template>
  <div class="flex flex-col">
    <div class="w-full">
      <div class="border-2 border-black rounded-t"><img :src="planInfo.caseThumbnail" :alt="planInfo.caseName"
          class="w-full h-[200px] object-cover">
      </div>
      <div class="flex flex-col items-start border-2 border-black rounded-b p-3">
        <RouterLink :to="`/nutritionist-plan/${planInfo.id}`">
          <h3 class="text-xl">{{ planInfo.nutritionistName }}營養師推薦 <span class="text-xl text-primary-600">{{
            planInfo.caseName }}</span></h3>
        </RouterLink>
        <div class="py-2">
          <p class="text-sm text-gray-400">{{ planInfo.caseDescription }}</p>
        </div>
        <div class="pr-4">
          <button @click="addToCart"
            class="py-1 px-4 border-2 border-secondary-900 rounded hover:border-2 hover:bg-secondary-400 hover:border-black hover:shadow-base hover:transition active:shadow-none">
            <p class="text-secondary-900 hover:text-black">加入購物車</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>