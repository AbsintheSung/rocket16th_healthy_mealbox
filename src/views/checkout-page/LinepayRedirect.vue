<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const transactionId = ref('')
const orderId = ref('')

onMounted(() => {
    transactionId.value = route.query.transactionId?.toString() || ''
    orderId.value = route.query.orderId?.toString() || ''
    handleLinePayCallback()
})

const handleLinePayCallback = async () => {
    console.log('處理 LinePayment 回調', { transactionId: transactionId.value, orderId: orderId.value })
    try {
        if (!transactionId.value || !orderId.value) {
            throw new Error('缺少必要的參數')
        }

        // 獲取訂單詳情
        const orderDetails = await cartStore.fetchOrderById(orderId.value)
        
        const confirmData = {
            transactionId: transactionId.value,
            amount:orderDetails.orderPrice,
            orderId: orderId.value,
        }

        await cartStore.confirmLinePay(confirmData)
        
        console.log('LINE PAY 付款確認成功')
        ElMessage.success('付款確認成功')

        // 付款成功，轉跳頁面
        await router.push({
            path: '/checkout/order-complete',
            query: { orderId: orderId.value }
        })
    } catch (error) {
        console.error('LINE PAY 確認失敗:', error)
        ElMessage.error(error.message || '付款失敗，請聯繫客服')
    }
}

</script>
<template>
    <main class="container py-9">
        <img src="/initialLoad.gif" alt="loading" class="w-2/12 pb-6 mx-auto">
        <h3 class="text-primary-700 font-bold text-xl text-center">付款處理中，請勿關閉此畫面...</h3>
    </main>
</template>
<style scoped></style>