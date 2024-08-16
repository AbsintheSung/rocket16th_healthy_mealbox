<script setup>
</script>
<template>
    <div>我是header</div>
    <!-- 方案天數選擇區塊 -->
    <div class="bg-el-primary flex justify-evenly text-4xl font-bold py-2">
        <button>7餐</button>
        <button>14餐</button>
        <button>21餐</button>
    </div>
    <!-- 方案選擇區塊 -->
    <div class="container py-20">
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-4 col-start-2">
                <div class="flex justify-center">
                    <img src="https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
                        alt="營養師方案" class="card-img">
                </div>
                <h3 class="py-8 text-3xl font-medium text-center">營養師方案</h3>
                <p class="text-center mb-4">由專業營養師依照成人一日所需搭配餐盒</p>
                <div class="flex flex-row flex-nowrap justify-center pb-28">
                    <ul class="space-y-2">
                        <li>
                            <p><span>✔️</span>想要快快決定吃什麼的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>不想花時間思考餐盒搭配的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>有選擇困難症的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>口頭禪是「都可以，你決定就好～」的P人</p>
                        </li>
                    </ul>
                    <button class="flex justify-center border-2 text-center py-7 w-9/12">直接訂購</button>
                </div>
            </div>
            <div class="col-span-4 col-start-8">
                <div class="flex justify-center">
                    <img src="https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHhc4Q0WYH0I5cy4bml2i3ZUOxEhUp0XqvXKQerXRHWtsZTZZrizj63EZIeDpC8LKVhd8WyzmBDqMVjzPVtoBCnbJGAp9sasZQlfGnAtsuRLIHLc~heWKMBAtuTsfmYvX436gGnNNau2RXOQfKxh3qFXkAWoI-HLmi8ygOfYtx0Zmrl9pizTccAazXJt4GFBByKkQLgmSp2-zCAGG6PdvbOx8zh-OIBHbYUrDYMeWk-Zr1syEaCnEqSDPI1fdFZG59Zrp-srnhLuPGQfD~3Fi7yVR1r-5QB1alp4zPdVjn~Bfo5I5bk9VJQtOumEmMeP56lQHFuqvop41IDdAeNM4Q__"
                        alt="自定義方案" class="card-img">
                </div>
                <h3 class="py-8 text-3xl font-medium text-center">自定義方案</h3>
                <p class="text-center mb-4">由您挑選喜歡的餐盒，不喜歡還能自定義餐盒！</p>
                <div class="flex flex-row flex-nowrap justify-center pb-28">
                    <ul class="space-y-2">
                        <li>
                            <p><span>✔️</span>有點小挑食，會精挑細選的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>想要慢慢決定吃什麼的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>沒有選擇困難症的人</p>
                        </li>
                        <li>
                            <p><span>✔️</span>口頭禪是「就這麼決定了！」的J人</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div>我是footer</div>

</template>
<style scoped>
.card-img {
    height: 96px;
    width: 445px;
    object-fit: cover;
}
</style>