<script setup>
import { ref } from 'vue'
import NutritionistPlanCard from '@/components/nutritionist-plan-page/NutritionistPlanCard.vue'
// 分頁
const currentPage1 = ref(1)

// 測試用ㄉ假資料
const cardData = ref([
    {
        id: 1,
        title: "金牌營養師推薦 減脂 7餐方案",
        imageUrl: "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
    },
    {
        id: 2,
        title: "金牌營養師推薦 增肌 7餐方案",
        imageUrl: "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
    },
    {
        id: 3,
        title: "金牌營養師推薦 減脂 14餐方案",
        imageUrl: "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
    },
    {
        id: 4,
        title: "金牌營養師推薦 增肌 14餐方案",
        imageUrl: "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
    },
    {
        id: 5,
        title: "金牌營養師推薦 減脂 21餐方案",
        imageUrl: "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
    },
    {
        id: 6,
        title: "金牌營養師推薦 增肌 21餐方案",
        imageUrl: "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
    },
])
</script>
<template>
    <div class="grid grid-cols-3 gap-6">
        <NutritionistPlanCard v-for="item in cardData" :key="item.id" :title="item.title" :src="item.imageUrl" />
        <!-- 分頁 -->
        <div class="flex items-start justify-center col-start-2">
            <el-pagination style="--el-fill-color: white" layout="prev, pager, next" v-model:current-page="currentPage1"
                background :page-size="20" :pager-count="11" :total="100" :prev-text="'上一頁'" :next-text="'下一頁'" />
        </div>
    </div>
</template>
<style scoped></style>