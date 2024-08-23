<script setup>
import { ref, reactive } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'

//購物車狀態列函式
const steps = ref(['購物車', '填寫資料', '訂單確認'])
const activeStep = ref(1)

//表單資料
const form = reactive({
    placeOfDelivery: '',
    shipment: '',
    payment: ''
})

//送出表單
const onSubmit = () => {
    console.log('submit!')
}
</script>
<template>
    <div class="grid grid-cols-12 gap-6 md:-mx-3">
        <div class="col-start-5 col-span-4">
            <ShoppingCartProgressBar :active-step="activeStep" :steps="steps" />
        </div>
        <div class="col-span-12">
            <div class="border-2 border-black">
                <div class="bg-primary-300 py-2 pl-6 border-b-2 border-black">
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
                                <button class="text-black hover:text-secondary-400 transition">
                                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-2xl" />
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
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-6 py-2 font-bold">選擇送貨及付款方式</p>
            </div>
            <div class="border-2 border-black">
                <el-form :model="form" label-width="auto" style="max-width: 100%" class="px-6 py-4">
                    <el-form-item label="送貨地點" label-position="top">
                        <el-select v-model="form.placeOfDelivery" placeholder="請選擇運送區域">
                            <el-option label="臺灣本島" value="islandTaiwan" />
                            <el-option label="臺灣離島地區" value="outlyingTaiwan" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="送貨方式" label-position="top">
                        <el-select v-model="form.shipment" placeholder="請選擇送貨方式">
                            <el-option label="新竹貨運" value="HCT" />
                            <el-option label="超商冷凍宅配" value="convenienceStore" />
                        </el-select>
                    </el-form-item>
                    <div class="pb-2">
                        <ul class="list-disc list-inside">
                            <li>如訂單量較大或是有缺貨狀況，寄出時間將有所延遲，敬請見諒</li>
                            <li>若收到商品外箱有明顯破損，可以拒收並錄影存留，當下也請聯絡我們，謝謝</li>
                            <li>一般狀況訂單將於下單後隔天寄出(不包含例假日)</li>
                            <li>寄出後２－３天會送達指定地點，【週末不配送】</li>
                            <li>若下單一週仍未收到商品，可能是送達時無人在家，貨物招領中。請聯繫我們為您查詢送貨狀態</li>
                            <li>若遇突發狀況無法收貨，請先聯繫客服</li>
                        </ul>
                    </div>
                    <el-form-item label="付款方式" label-position="top">
                        <el-select v-model="form.payment" placeholder="請選擇付款方式">
                            <el-option label="信用卡付款" value="creditCard" />
                            <el-option label="超商取付" value="InStorePickup" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="col-start-9 col-span-4">
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-6 py-2 font-bold">選擇送貨及付款方式</p>
            </div>
            <div class="border border-black">
                <div class="border border-black px-6 py-9">
                    <div class="flex justify-between text-xl pb-6 border-b border-black">
                        <p>商品金額</p>
                        <p>NT$1460</p>
                    </div>
                    <div class="flex justify-between text-xl pt-9 pb-6 border-b border-black">
                        <p>運費</p>
                        <p>免運</p>
                    </div>
                    <div class="flex justify-between text-xl pt-9 pb-6 border-b border-black">
                        <p>合計</p>
                        <p>NT$1460</p>
                    </div>
                    <div class="pt-28">
                        <RouterLink
                            class="flex items-center justify-center text-center py-2 px-4 bg-secondary-400 rounded-md border-2 border-black hover:shadow-base transition active:shadow-none"
                            type="primary" @click="onSubmit" to="/checkout/order-information">
                            <p>前往結帳購物車</p>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-form-item__label) {
    color: black;
    font-size: 16px;
}

:deep(.el-select__wrapper) {
    padding: 8px 12px;
}
</style>