<script setup>
import { computed } from 'vue'

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

</script>
<template>
    <div v-if="safeMealBoxesData.length"
        class="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
        <el-card v-for="meal in safeMealBoxesData" :key="meal?.id" shadow="never"
            class="transition-all duration-300 ease-in-out max-w-full">
            <img v-if="meal.imgArr && meal.imgArr.length" :src="meal.imgArr[0]" class="max-w-full" />
            <router-link :to="`/singlemeal/${meal?.id}`"
                class="text-xs font-bold py-3 block hover:text-primary-base transition-colors duration-300 md:text-base">
                {{ meal.name || '未命名餐盒' }}
            </router-link>
            <div class="text-xs text-pretty" v-if="meal.composition">
                <span>{{ meal.composition.calories || 0 }}Kcal | </span>
                <span>碳水化合物{{ meal.composition.carbohydrate || 0 }}g | </span>
                <span>蛋白質{{ meal.composition.protein || 0 }}g</span>
            </div>
        </el-card>
    </div>
    <div v-else class="p-10">
        <p class="text-primary-base text-center text-xl font-bold">Loading...</p>
    </div>
</template>
<style scoped>
:deep(.el-card__body) {
    padding: 16px;
}

@media (max-width: 768px) {
    :deep(.el-card__body) {
        padding: 8px 12px;
    }
}
</style>