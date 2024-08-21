<script setup>
import { ref } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'

const steps = ref(['購物車', '填寫資料', '訂單確認'])
const currentStep = ref(1)

const nextStep = () => {
    if (currentStep.value < steps.value.length) {
        currentStep.value++
    }
}

</script>
<template>
    <div class="grid grid-cols-12 gap-6 md:-mx-3">
        <div class="col-start-5 col-span-4">
            <ShoppingCartProgressBar :current-step="currentStep" :steps="steps" />
        </div>
        <div class="col-span-12">
            <div class="border-2 border-black">
                <div class="bg-primary-300 py-2 pl-6 border-b border-black">
                    <p class="font-bold">購物車</p>
                </div>
                <table class="w-full table-auto border-b-2 border-black">
                    <thead>
                        <tr class="border-b-2 border-black">
                            <th class="pl-6 py-2 text-left w-1/5">商品資料</th>
                            <th class="text-left w-1/5">優惠</th>
                            <th class="text-left w-1/5">單件價格</th>
                            <th class="text-left w-1/5">數量</th>
                            <th class="text-left w-1/6">小計</th>
                            <th class="text-left w-1/6"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="pl-6 py-2 flex items-center">
                                <img src="https://s3-alpha-sig.figma.com/img/3ffe/1ae1/ff73ee555e48ab420b00cc78f9722622?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q4yB2ANCERzoSS80kOtg8EvynMBd~UPG4Kn70FGLns3OIx2YY-Nxnu5xOAe0gWf3foJq2mY7gF5-vBloNB~4XN7xvf4Fe-cIckhoZqLBvZ58ZaQf4iDo703fqrfIAJKWFzjDJ0DrP5t~hJmJ6whQ5mmIPvHO733JmerrELU21aQaPkWwHB6O56~1kvfV~vcH1V8ke1MlhG-I3GXqGFMBuSzZz57TwxWNGidxidTtZDdGC4NPPYQwSTxcW8DpXoA3co2Hj8inptO13oE2Z77thqiFzISTnAyYwvB1siSNN5HUfgMdsBYRUbyp6qRo72dP8KxkQPHhO5gx0P0DcW-ssQ__"
                                    alt="" class="w-[88px]">
                                <p class="pl-2">訂餐計畫 14餐</p>
                            </td>
                            <td></td>
                            <td>NT$1460</td>
                            <td>1</td>
                            <td>NT$5000</td>
                            <td>
                                <button>
                                    <font-awesome-icon :icon="['fas', 'xmark']" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-10 px-6">
                    <div class="flex items-center">
                        <p class="bg-primary-200 px-2 py-1 mr-1 border border-black">已享用之優惠</p>
                        <p>全店商品滿1000免運</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-8">
            選擇送貨方式及付款方式
        </div>
        <div class="col-start-9 col-span-4">
            選擇送貨方式及付款方式2
        </div>
    </div>
</template>
<style scoped></style>