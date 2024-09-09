<script setup>
const props = defineProps({
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
    <div class="pb-6 md:pb-12">
        <div class="bg-primary-300 border-2 border-black rounded shadow-base w-full text-center py-6 md:px-12 md:w-1/3">
            <h2 class="text-2xl">{{ onePlanInfo.nutritionistName }} 營養師的 {{ onePlanInfo.caseName }}</h2>
        </div>
        <div class="flex py-6 md:py-12">
            <div class="relative">
                <img :src="onePlanInfo.nutritionistImg" :alt="onePlanInfo.nutritionistName"
                    class="w-[100px] h-[100px] rounded-full border-2 border-black md:w-[170px] md:h-[170px]">
                <TheSvg svgIcon="circle-halftone" class="w-[100px] h-[100px] md:w-[170px] md:h-[170px] absolute top-0 left-6 -z-10" />
            </div>
            <div class="px-12 flex flex-col justify-between">
                <h3 class="text-base md:text-2xl">{{ onePlanInfo.nutritionistName }} 營養師</h3>
                <div class="text-xs break-all md:text-base">
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