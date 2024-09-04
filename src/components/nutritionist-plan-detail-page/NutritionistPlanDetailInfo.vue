<script setup>
defineProps({
    onePlanInfo: {
        type: Object,
        default: () => ({
            nutritionistName: '飯糰',
            nutritionistImg: 'https://imgur.com/v3U1trT.png',
            nutritionistSeniority: splitSeniority,
            caseName: '商品準備中',
            caseDescription: '飯糰營養師的餐盒準備中',
        })
    }
})


</script>
<template>
    <div class="pb-12">
        <div class="bg-primary-300 border-2 border-black rounded py-6 px-12 w-1/3 shadow-base">
            <h2 class="text-2xl">{{ onePlanInfo.nutritionistName }} 營養師的 {{ onePlanInfo.caseName }}</h2>
        </div>
        <div class="flex py-12">
            <div class="relative">
                <img :src="onePlanInfo.nutritionistImg" :alt="onePlanInfo.nutritionistName"
                    class="w-[170px] rounded-full border-2 border-black">
                <TheSvg svgIcon="circle-halftone" class="w-[170px] h-[170px] absolute top-0 left-6 -z-10" />
            </div>
            <div class="px-12 flex flex-col justify-between">
                <h3 class="text-2xl">{{ onePlanInfo.nutritionistName }} 營養師</h3>
                <div class="break-all">
                    <p>資歷：</p>
                    <p class="whitespace-pre-line">{{ onePlanInfo.nutritionistSeniority }}</p>
                </div>
            </div>
        </div>
        <div>
            <p>{{ onePlanInfo.caseDescription }}</p>
        </div>
    </div>
</template>
<style scoped></style>