<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useMemberStore } from '@/stores/member'
import { ElLoading, ElMessage } from 'element-plus'

const route: RouteLocationNormalizedLoadedGeneric = useRoute()
const memberStore = useMemberStore()
const cartStore = useCartStore()
console.log('測試獲取資料：', cartStore.getGeneralBoxes)

// 提示訊息
const message = (mes: any, mesType: any) => {
    ElMessage({
        message: mes,
        type: mesType,
        duration: 1500
    })
}


//餐盒數量
const generalBoxes = computed(() => cartStore.getGeneralBoxes)
// 購物車資訊
const cartInfo = computed(() => cartStore.getCartInfo)
//餐盒總數
const totalQuantity = computed(() => cartStore.getMealBoxTotal) 
// 加入運費後的值(若免運則+0)
const totalPrice = computed(() => {
  const prize = cartInfo.value.prize || 0
  return cartInfo.value.freightFree ? prize : prize + 100
})

onMounted(async () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading'
    })
    try {
        await Promise.all([
            memberStore.fetchMemberInfo(),
            cartStore.fetchMemberCartInfo()
        ])
    } catch (error: any) {
        message(error.message, 'error')
    } finally {
        loading.close()
    }
})

onMounted(async () => {
    await cartStore.fetchMemberCartInfo() //發請求獲取資料後，將一般餐盒所有資料存起來
    console.log('餐盒資料陣列：', cartStore.getGeneralBoxes) //取得存放餐盒的陣列
    console.log('訂單價格資料：', cartStore.getCartInfo) //取的訂單的價錢
})

</script>
<template>
    <div class="grid grid-cols-4 md:grid-cols-12 gap-6">
        <!-- 購物車資訊 -->
        <div class="col-span-4 md:col-span-8">
            <div class="border-2 border-black">
                <div class="flex items-center py-2 border-b border-black bg-primary-300">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="px-3 md:pl-6 pr-2" />
                    <p class="font-bold text-sm md:text-base">購物車</p>
                </div>
                <div class="p-3 border-b border-black md:p-6">
                    <div class="flex justify-between items-center pb-3 sm:pb-6">
                        <h3 class="text-sm text-primary-600 md:text-2xl">訂餐計畫 {{ totalQuantity }} 餐</h3>
                        <button class="text-black hover:text-secondary-400 transition">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                    </div>
                    <!-- 套餐細項 -->
                    <div class="text-sm md:text-base md:pr-6">
                        <div v-for="item in generalBoxes" :key="item.id"  class="flex justify-between items-center">
                            <p>{{ item.name }} </p>
                            <span>NT${{ item.quantity }}</span>
                        </div>
                    </div>
                </div>
                <div
                    class="flex justify-between items-center border-b border-black text-sm px-3 py-5 md:py-7 md:pl-6 md:pr-12 md:text-base">
                    <h4 class="text-primary-600 md:text-2xl">已享用之優惠</h4>
                    <p>{{ cartInfo.freightFree ? '全店商品滿1000免運' : '無' }}</p>
                </div>
                <div class="flex justify-end items-center py-2 px-2 text-sm md:py-6 md:px-12 md:text-base">
                    <p>商品金額：</p>
                    <p class="text-secondary-500">NT$ {{ cartInfo.prize }} </p>
                </div>
            </div>
        </div>
        <!-- 價格總計 -->
        <div class="col-span-4 md:col-start-9 text-base">
            <div class="border-2 border-black px-3 py-9 md:px-6">
                <div class="flex justify-between pb-6 border-b border-black md:text-xl">
                    <p>商品金額</p>
                    <p>NT$ {{ cartInfo.prize }} </p>
                </div>
                <div class="flex justify-between pt-6 pb-6 border-b border-black md:text-xl md:pt-9">
                    <p>運費</p>
                    <p>{{ cartInfo.freightFree ? '免運' : 'NT$100' }}</p>
                </div>
                <div class="flex justify-between pt-6 pb-6 border-b border-black md:text-xl md:pt-9">
                    <p>合計</p>
                    <p>NT$ {{ totalPrice }} </p>
                </div>
                <div class="pt-6 md:pt-28">
                    <RouterLink
                        class="flex items-center justify-center text-center py-2 px-4 bg-secondary-400 rounded border-2 border-black hover:shadow-base transition active:shadow-none"
                        to="/checkout/shipping-payment">
                        <p>前往結帳購物車</p>
                    </RouterLink>
                </div>
            </div>
        </div>
        <!-- 繼續購物 -->
        <div class="col-start-1 col-span-2 pt-3 md:pt-12">
            <RouterLink
                class="flex items-center py-2 px-4 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none"
                to="/mealboxlist">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2" />
                <p>繼續購物</p>
            </RouterLink>
        </div>
    </div>
</template>
<style scoped></style>