<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/button.scss'

const cartStore = useCartStore()
const router = useRouter()

const isLoading = ref(true)
const isLoggedIn = ref(false)


// 身分驗證 - 因為取得購物車資料需要登入，無法取得則判斷為未登入
const authenticate = async () => {
    isLoading.value = true
    try {
        await cartStore.fetchMemberCartInfo()
        isLoggedIn.value = true
    } catch (error: any) {
        console.error('獲取購物車資料時發生錯誤:', error)
        isLoggedIn.value = false
        if (error && error.status === 401) {
            ElMessage({
                message: '請先登入會員',
                type: 'warning',
                duration: 3000
            })
            setTimeout(() => {
                const loading = ElLoading.service({
                    lock: true,
                    text: '正在跳轉至登入頁面...',
                })
                setTimeout(() => {
                    loading.close()
                    router.push('/signin')
                }, 1000)
            }, 2000)
        } else {
            console.log('發生其他錯誤:', error.message)
            ElMessage({
                message: '發生錯誤，請稍後再試',
                type: 'error',
                duration: 2000
            })
        }
    } finally {
        isLoading.value = false
    }
}

//獲取 一般餐盒+自訂義餐盒資訊
const allMealBoxes = computed(() => {
    const generalBoxes = cartStore.getGeneralBoxes.map(box => ({ ...box, type: 'general' }))
    const customBoxes = cartStore.getCustomizedBoxes.map(box => ({ ...box, type: 'custom' }))
    return [...generalBoxes, ...customBoxes]
})

// 購物車資訊
const cartInfo = computed(() => cartStore.getCartInfo)
// 餐盒總數
const totalQuantity = computed(() => cartStore.getMealBoxTotal)
// 加入運費後的值(若免運則+0)
const totalPrice = computed(() => {
    const prize = cartInfo.value.prize || 0
    return cartInfo.value.freightFree ? prize : prize + 300
})
// 確認購物車內是否有商品
const hasCartItems = computed(() =>
    allMealBoxes.value.length > 0
)

// 清空購物車
const handleClearCart = async () => {
    try {
        await ElMessageBox.confirm(
            '確定要清空購物車嗎？',
            '警告',
            {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        const result = await cartStore.cleanCart()
        if (result === "success") {
            ElMessage.success('購物車已清空')
            await cartStore.fetchMemberCartInfo()
        }
    } catch (error) {
        console.error('清空購物車時發生錯誤:', error);
        if (error !== 'cancel') {
            ElMessage.error('清空購物車失敗')
        }
    }
}

onMounted(async () => {
    await authenticate()
})

</script>
<template>
    <div class="grid grid-cols-4 md:grid-cols-12 gap-6">
        <!-- 購物車資訊 -->
        <div class="col-span-4 md:col-span-8">
            <!-- 有訂單顯示 -->
            <div v-if="isLoggedIn && hasCartItems" class="border-2 border-black">
                <div class="flex items-center py-2 border-b border-black bg-primary-300">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="px-3 md:pl-6 pr-2" />
                    <p class="font-bold text-sm md:text-base">購物車</p>
                </div>
                <div class="p-3 border-b border-black md:p-6">
                    <div class="flex justify-between items-center pb-3 sm:pb-6">
                        <h3 class="text-sm text-primary-600 md:text-2xl">訂餐計畫 {{ totalQuantity }} 餐</h3>
                        <button plain @click="handleClearCart" class="text-black hover:text-secondary-400 transition">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                    </div>
                    <!-- 一般套餐細項 -->
                    <div class="text-sm md:text-base md:pr-6">
                        <div v-for="item in allMealBoxes" :key="item.id" class="flex justify-between items-center">
                            <p>{{ item.name }} x{{ item.boxQuantity }}</p>
                            <span>NT${{ item.price * item.boxQuantity }}</span>
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
            <!-- 未登入、無訂單顯示 -->
            <div v-else class="border-2 border-black">
                <div class="flex items-center py-2 border-b border-black bg-primary-300">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="px-3 md:pl-6 pr-2" />
                    <p class="font-bold text-sm md:text-base">購物車</p>
                </div>
                <div class="p-3 border-b border-black md:p-6">
                    <div class="flex justify-center items-center flex-col">
                        <TheSvg svgIcon="pac-man-eat" class="mt-auto hidden h-[60px] w-[450px] md:block" />
                        <h4 class="py-6 text-lg font-bold text-primary-500 md:pt-6">購物車內還沒有商品，快來新增！</h4>
                    </div>
                </div>
            </div>
        </div>
        <!-- 價格總計 -->
        <div class="col-span-4 md:col-start-9 text-base">
            <!-- 有訂單顯示 -->
            <div v-if="isLoggedIn && hasCartItems" class="border-2 border-black px-3 py-9 md:px-6">
                <div class="flex justify-between pb-6 border-b border-black md:text-xl">
                    <p>商品金額</p>
                    <p>NT$ {{ cartInfo.prize }} </p>
                </div>
                <div class="flex justify-between pt-6 pb-6 border-b border-black md:text-xl md:pt-9">
                    <p>運費</p>
                    <p>{{ cartInfo.freightFree ? '免運' : 'NT$300' }}</p>
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
            <!-- 未登入、無訂單顯示 -->
            <div v-else class="border-2 border-black px-3 py-9 md:px-6">
                <h4 class="py-6 text-lg font-bold text-primary-500 text-center md:pt-6">購物車內還沒有商品，快來新增！</h4>
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