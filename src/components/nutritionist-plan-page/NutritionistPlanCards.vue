<script setup>
import { ref } from 'vue'
import { useNutritionistPlanStore } from '@/stores/nutritionistPlan'
import NutritionistPlanCard from '@/components/nutritionist-plan-page/NutritionistPlanCard.vue'

const NutritionistPlanStore = useNutritionistPlanStore()

// 分頁
const currentPage1 = ref(1)

</script>
<template>
    <div class="grid grid-cols-3 gap-6">
        <!-- <NutritionistPlanCard v-for="item in cardData" :key="item.id" :title="item.title" :src="item.imageUrl" /> -->
        <NutritionistPlanCard
        v-for="planItem in NutritionistPlanStore.getPaginatedPlans"
        :key="planItem.id"
        :planInfo="planItem"
        :src="planInfo.nutritionistImg"
      />
        <!-- 分頁 -->
        <div class="flex items-start justify-center col-start-2">
            <el-pagination style="--el-fill-color: white" layout="prev, pager, next" v-model:current-page="currentPage1"
                background :page-size="20" :pager-count="11" :total="100" :prev-text="'上一頁'" :next-text="'下一頁'" />
        </div>
    </div>
</template>
<style scoped></style>