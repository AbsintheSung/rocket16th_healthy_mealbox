<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const transactionId = ref('')
const orderId = ref('')

onMounted(() => {
    transactionId.value = route.query.transactionId?.toString() || ''
    orderId.value = route.query.orderId?.toString() || ''
    handleLinePayCallback()
})

const handleLinePayCallback = () => {
    console.log('處理 LinePayment 回調', { transactionId: transactionId.value, orderId: orderId.value })
    router.push({ name: 'OrderComplete', params: { orderId: orderId.value } })
}

</script>
<template>
    <main class="container py-9">
        <img src="/initialLoad.gif" alt="loading" class="w-2/12 pb-6 mx-auto">
        <h3 class="text-primary-700 font-bold text-xl text-center">付款處理中，請勿關閉此畫面...</h3>
    </main>
</template>
<style scoped></style>