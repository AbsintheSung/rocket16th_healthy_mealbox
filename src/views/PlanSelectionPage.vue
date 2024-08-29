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
    </div>
</template>
<style scoped></style>