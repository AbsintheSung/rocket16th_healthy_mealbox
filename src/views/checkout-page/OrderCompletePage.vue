<script setup>
import { ref, onMounted,computed } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const orderInfo = computed(() => cartStore.getLastSubmittedOrder)

//購物車狀態列函式
const steps = ref(['購物車', '填寫資料', '訂單確認'])
const activeStep = ref(3)

onMounted(() => {
    orderInfo.value = cartStore.getLastSubmittedOrder
    // console.log('獲得的訂單資訊：', orderInfo.value)
})
// 格式化日期時間的函數
const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '無資料';
    const date = new Date(dateTimeString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}


</script>
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- 購物車步驟 -->
        <div class="col-start-5 col-span-4 mb-3">
            <ShoppingCartProgressBar :active-step="activeStep" :steps="steps" />
        </div>
        <!-- 訂單已成立框框 -->
        <div class="col-span-12">
            <div class="flex flex-col justify-center items-center border-2 border-black">
                <div class="flex justify-center items-center pt-7 pb-3">
                    <TheSvg svgIcon="pac-man" class="mt-auto hidden w-[50px] h-[50px] md:block" />
                    <h2 class="text-2xl font-bold pl-5">謝謝您！您的訂單已成立！</h2>
                </div>
                <div class="text-left pb-8">
                    <p>訂單號碼：{{ orderInfo?.id }}</p>
                    <p>訂單確認電郵已發送到您的電子信箱：</p>
                    <p>{{ orderInfo?.senderEmail }}</p>
                </div>
            </div>
        </div>
        <!-- 訂單資訊框框 -->
        <div class="col-span-12 pt-6">
            <div class="flex flex-wrap border-2 border-black p-6">
                <!-- 訂單資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-16">
                    <h2 class="font-bold text-2xl mb-2">訂單資訊</h2>
                    <div class="flex mb-1">
                        <span>訂單編號：</span>
                        <span>{{ orderInfo?.orderNumber }}</span>
                    </div>
                    <div class="flex">
                        <span>訂單建立時間：</span>
                        <span>{{ formatDateTime(orderInfo?.createTime) }}</span>
                    </div>
                </div>

                <!-- 顧客資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <h2 class="font-bold text-2xl mb-2">顧客資訊</h2>
                    <div class="flex mb-1">
                        <span>姓名：</span>
                        <span>{{ orderInfo?.senderName }}</span>
                    </div>
                    <div class="flex">
                        <span>電話號碼：</span>
                        <span>{{ orderInfo?.senderPhoneNumber }}</span>
                    </div>
                </div>

                <!-- 送貨資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <h2 class="font-bold text-2xl mb-2">送貨資訊</h2>
                    <div class="flex">
                        <span>送貨方式：</span>
                        <span>{{ orderInfo?.shippingMethod }}</span>
                    </div>
                </div>

                <!-- 付款資訊 -->
                <div class="w-full md:w-1/2 px-2 mb-6">
                    <div class="">
                        <h2 class="font-bold text-2xl mb-2">付款資訊</h2>
                        <div class="flex mb-1">
                            <span>付款方式：</span>
                            <span>{{ orderInfo?.paymentMethod === 'onlinePayment' ? 'LINE PAY' : '超商取付' }}</span>
                        </div>
                        <div class="flex">
                            <span>付款狀態：</span>
                            <span>{{ orderInfo?.orderStatus ==='paid' ? '已付款' : '未付款' }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 裝飾性按鈕 -->
        <TheSvg svgIcon="polygon" class="mt-auto hidden w-[160px] md:block" />
        <!-- 底部按鈕 -->
        <div class="col-start-11 col-span-2">
            <RouterLink
                class="flex items-center justify-between py-2 px-4 mt-14 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none"
                to="/">
                <p>回到首頁</p>
                <font-awesome-icon :icon="['fas', 'caret-right']" />
            </RouterLink>
        </div>
    </div>
</template>
<style scoped></style>