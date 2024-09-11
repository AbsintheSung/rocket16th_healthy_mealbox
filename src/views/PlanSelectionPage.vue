<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
import PlanSelectionCard from '@/components/plan-selection-page/PlanSelectionCard.vue'

const router = useRouter()
const cartStore = useCartStore()
const isLoggedIn = ref(false)

const handlePlanSelection = async (route) => {
    isLoggedIn.value = false // 初始化為 false
    try {
        await cartStore.fetchMemberCartInfo()
        isLoggedIn.value = true

        ElMessage({
            message: '驗證成功，正在跳轉...',
            type: 'success',
            duration: 1500
        })

        setTimeout(() => {
            router.push(route)
        }, 1500)
    } catch (error) {
        console.error('獲取購物車資料時發生錯誤:', error)
        isLoggedIn.value = false

        if (error.response && error.response.status === 401) {
            ElMessage({
                message: '請先登入會員',
                type: 'warning',
                duration: 2000
            })
            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } else {
            console.log('發生其他錯誤:', error.message)
            ElMessage({
                message: '發生錯誤，請稍後再試',
                type: 'error',
                duration: 2000
            })
        }
    }
}


const handleNutritionistPlan = (route) => {
    handlePlanSelection(route)
}

const handleCustomPlan = (route) => {
    handlePlanSelection(route)
}

</script>
<template>
    <div>
        <main class="container py-12 md:py-20">
            <PlanSelectionCard @select-nutritionist-plan="handleNutritionistPlan"
                @select-custom-plan="handleCustomPlan" />
        </main>
        <!-- 裝飾性圖片 -->
        <TheSvg svgIcon="pac-man-eat" class="w-4/5 mx-auto hidden md:block" />
    </div>
</template>
<style scoped></style>