<script setup>
import PlanSelectionCard from '@/components/plan-selection-page/PlanSelectionCard.vue';
import DaysSelectionButton from '@/components/global/DaysSelectionButton.vue'
</script>
<template>
    <div>
        <DaysSelectionButton />
        <main class="container py-20">
            <PlanSelectionCard />
        </main>
        <!-- 裝飾性圖片 -->
        <TheSvg svgIcon="pac-man-eat" class="w-4/5 mx-auto hidden md:block" />
    </div>
</template>
<style scoped></style>