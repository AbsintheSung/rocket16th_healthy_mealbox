<script setup>
import { computed, watch, onMounted } from 'vue'

const props = defineProps({
    onePlanInfo: {
        type: Object,
        default: () => ({})
    },
    mealBoxesData: {
        type: Array,
        default: () => []
    }
})

const safeMealBoxesData = computed(() => props.mealBoxesData || [])
watch(() => props.mealBoxesData, (newValue) => {
    console.log('mealBoxesData updated in NutritionistPlanDetailCard:', newValue)
}, { immediate: true, deep: true })

onMounted(() => {
    console.log('Initial mealBoxesData in NutritionistPlanDetailCard:', props.mealBoxesData)
})

</script>
<template>
    <div v-if="safeMealBoxesData.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <el-card v-for="meal in safeMealBoxesData" :key="meal?.id" style="max-width: 310px" shadow="never">
            <pre>{{ JSON.stringify(meal, null, 2) }}</pre>
            <img v-if="meal?.imgArr && meal.imgArr.length" :src="meal.imgArr[0]" style="width: 100%" class="card-img" />
            <p class="text-base font-bold py-4">{{ meal?.name || '未命名餐盒' }}</p>
            <div class="pb-16" v-if="meal?.composition">
                <span>{{ meal.composition.calories || 0 }}Kcal | </span>
                <span>碳水化合物{{ meal.composition.carbohydrate || 0 }}g | </span>
                <span>蛋白質{{ meal.composition.protein || 0 }}g</span>
            </div>
        </el-card>
    </div>
    <div v-else>
        <p>暫無餐盒數據</p>
    </div>
</template>
<style scoped>
.card-img {
    width: 278px;
    height: 214px;
    object-fit: cover;
}
</style>