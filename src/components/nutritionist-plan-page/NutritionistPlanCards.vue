<script setup>
import { watch } from 'vue'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanCard from '@/components/nutritionist-plan-page/NutritionistPlanCard.vue'
import ThePagination from '@/components/global/ThePagination.vue'

const nutritionistPlanStore = useNutritionistPlanStore()

// 監聽頁碼變化
watch(() => nutritionistPlanStore.currentPage, (newPage) => {
  nutritionistPlanStore.changePage(newPage)
})

</script>
<template>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <NutritionistPlanCard v-for="planItem in nutritionistPlanStore.getPaginatedPlans" :key="planItem.id" :planInfo="planItem" />
        <!-- 分頁 -->
        <div class="flex items-start justify-center md:col-start-2 pt-6">
            <ThePagination v-model:currentPageNum="nutritionistPlanStore.currentPage" :pagerCount="5"
                :pageSize="nutritionistPlanStore.getPageSize" :pageTotal="nutritionistPlanStore.getDataTotal"
                :changePage="nutritionistPlanStore.changePage" />
        </div>
    </div>
</template>
<style scoped></style>