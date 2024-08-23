<script setup>
import { ref, reactive, watch } from 'vue'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'
import { taiwanCity } from '@/content/city' //引入城市鄉鎮
const twCityArea = ref({ city: [], area: [] }) //用來存放城市鄉鎮的資料，select使用
const cityName = ref('') //v-model綁定所選取得值
const cityArea = ref('') //v-model綁定所選取得值

//將引入的城鄉鎮資料，作處理後assign到 twCityArea.city
const getTwCityArea = () => {
    twCityArea.value.city = taiwanCity.map((item) => item.name)
}

const test = () => {
    console.log(cityName.value)
    console.log(cityArea.value)
}

//購物車狀態列函式
const steps = ref(['購物車', '填寫資料', '訂單確認'])
const activeStep = ref(2)

//表單資料
const form = reactive({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    UseCustomerInfo: 'false',
    address: '',
    saveShippingAddress: 'false',
    setAsDefaultAddress: 'false',
    orderNotes: '',
    agreeTermsPrivacy: 'false'
})

//送出表單
const onSubmit = () => {
    console.log('submit!')
}

//透過監聽選取城市的變化，將 地區值作處理後assign到twCityArea.value.area
watch(
    () => cityName.value,
    (newCity) => {
        const filterArea = taiwanCity.filter((item) => item.name === newCity)
        twCityArea.value.area = filterArea[0].districts.map((item) => item.name)
    }
)
getTwCityArea()
</script>
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- 購物車步驟 -->
        <div class="col-start-5 col-span-4 pb-4">
            <ShoppingCartProgressBar :active-step="activeStep" :steps="steps" />
        </div>
        <!-- 上方合計文字 -->
        <div class="col-start-5 col-span-4 pb-4">
            <div class="py-6 bg-primary-200 border-2 border-black rounded shadow-base">
                <h3 class="text-2xl text-center">合計：NT$ 1460</h3>
            </div>
        </div>
        <!-- 顧客資料與付款資料 -->
        <div class="col-span-6 relative">
            <!-- 顧客資料 -->
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-6 py-2 font-bold">顧客資料</p>
            </div>
            <div class="border-2 border-black px-6 py-4">
                <el-form :model="form" label-width="auto" style="max-width: 100%">
                    <el-form-item label="顧客姓名" label-position="top">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="電子信箱" label-position="top">
                        <el-input v-model="form.email" />
                    </el-form-item>
                    <el-form-item label="電話號碼" label-position="top">
                        <el-input v-model="form.phone" />
                    </el-form-item>
                </el-form>
            </div>
            <!-- 付款資料 -->
            <div class="col-span-6 absolute w-full pt-10">
                <div class="bg-primary-300 border-2 border-black">
                    <p class="px-6 py-2 font-bold">付款資料</p>
                </div>
                <div class="border-2 border-black px-6 py-4">
                    <p>已選擇的付款方式: 信用卡付款</p>
                    <p class="text-sm text-primary-300">請選擇你需要使用的支付卡</p>
                    <div class="bg-secondary-base mt-3 p-4">
                        信用卡付款資訊(待補)
                    </div>
                </div>
            </div>
        </div>
        <!-- 送貨資料 -->
        <div class="col-start-7 col-span-6">
            <div class="bg-primary-300 border-2 border-black flex justify-between">
                <p class="px-6 py-2 font-bold">送貨資料</p>
                <p class="px-6 py-2 font-bold">運費:NT$0</p>
            </div>
            <div class="border-2 border-black px-6 py-4">
                <el-form :model="form" label-width="auto" style="max-width: 100%">
                    <div>
                        <p>已選擇的送貨方式: 新竹物流宅配</p>
                        <el-checkbox v-model="form.UseCustomerInfo" label="收件人資料與顧客資料相同" size="large" />
                    </div>
                    <el-form-item label="顧客姓名" label-position="top">
                        <el-input v-model="form.name" />
                        <span class="text-primary-300">請填入收件人真實姓名，以確保順利收件</span>
                    </el-form-item>
                    <el-form-item label="電話號碼" label-position="top">
                        <el-input v-model="form.phone" />
                    </el-form-item>
                    <el-divider />
                    <el-form-item label="地址 運送地點: 台灣" label-position="top">
                        <el-select v-model="cityName" placeholder="城市">
                            <el-option v-for="cityItem in twCityArea.city" :key="cityItem" :label="cityItem"
                                :value="cityItem" />
                        </el-select>
                        <el-select v-model="cityArea" placeholder="地區" :inline="true">
                            <el-option v-for="areaItem in twCityArea.area" :key="areaItem" :label="areaItem"
                                :value="areaItem" />
                        </el-select>
                        <el-input v-model="form.address" placeholder="地址" />
                    </el-form-item>
                    <el-checkbox v-model="form.saveShippingAddress" label="儲存這個送貨地址" size="large" />
                    <el-checkbox v-model="form.setAsDefaultAddress" label="設定為預設地址" size="large" />
                </el-form>
            </div>
        </div>
        <!-- 訂單備註 -->
        <div class="col-span-12">
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-6 py-2 font-bold">訂單備註</p>
            </div>
            <div class="border-2 border-black">
                <div>
                    <el-input v-model="form.orderNotes" style="width: 100%" :rows="5" type="textarea"
                        placeholder="有什麼想告訴賣家的嗎？" />
                </div>
            </div>
        </div>
        <!-- 下面按鈕 -->
        <div class="col-span-2">
            <RouterLink
                class="flex items-center py-2 px-4 mt-14 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none"
                to="/checkout/shipping-payment">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2" />
                <p>返回購物車</p>
            </RouterLink>
        </div>
        <div class="col-start-7 col-span-6">
            <div class="flex items-center mt-12">
                <el-checkbox v-model="form.agreeTermsPrivacy" size="large" />
                <p class="pl-2">我同意<a href="#" class="text-primary-600 hover:text-primary-400">網站服務條款</a>及<a href="#"
                        class="text-primary-600 hover:text-primary-400">隱私權政策</a></p>
            </div>
            <div class="mt-6">
                <RouterLink
                    class="flex items-center justify-center text-center py-2 px-4 bg-secondary-400 rounded-md border-2 border-black hover:shadow-base transition active:shadow-none"
                    type="primary" @click="onSubmit" to="/checkout/order-complete">
                    <p>提交訂單</p>
                </RouterLink>
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