<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'
import { ElMessage } from 'element-plus'
import { taiwanCity } from '@/content/city' //引入城市鄉鎮

const cartStore = useCartStore()
const router = useRouter()
const formRef = ref(null)

const twCityArea = ref({ city: [], area: [] }) //用來存放城市鄉鎮的資料，select使用

const shippingMethod = ref('')
const paymentMethod = ref('')

//獲取購物車資訊
const cartInfo = computed(() => cartStore.getCartInfo)
const totalPrice = computed(() => cartInfo.value.prize || 0)

//購物車狀態列函式
const steps = ref(['購物車', '填寫資料', '訂單確認'])
const activeStep = ref(2)

// 表單資料
const form = reactive({
    customer: {
        name: '',
        email: '',
        phone: '',
    },
    recipient: {
        name: '',
        phone: '',
        address: '',
        cityName: '',
        cityArea: '',
    },
    UseCustomerInfo: false,
    saveShippingAddress: false,
    setAsDefaultAddress: false,
    orderNotes: '',
    agreeTermsPrivacy: false
})

// 表單驗證
const rules = {
    'customer.name': [{ required: true, message: '請輸入顧客姓名', trigger: 'blur' }],
    'customer.email': [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' },
        { type: 'email', message: '請輸入有效的電子信箱地址', trigger: ['blur', 'change'] },
        {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: '請輸入有效的電子信箱格式',
            trigger: ['blur', 'change']
        }
    ],
    'customer.phone': [
        { required: true, message: '請輸入顧客電話號碼', trigger: 'blur' },
        {
            pattern: /^(09\d{8}|0[1-8]\d{7,8}|0800\d{6})$/,
            message: '請輸入有效的台灣電話號碼格式',
            trigger: ['blur', 'change']
        }
    ],
    'recipient.name': [{ required: true, message: '請輸入收件人姓名', trigger: 'blur' }],
    'recipient.phone': [
        { required: true, message: '請輸入收件人電話號碼', trigger: 'blur' },
        {
            pattern: /^(09\d{8}|0[1-8]\d{7,8}|0800\d{6})$/,
            message: '請輸入有效的台灣電話號碼格式',
            trigger: ['blur', 'change']
        }
    ],
    'recipient.address': [{ required: true, message: '請輸入詳細地址', trigger: 'blur' }],
    'recipient.cityName': [{ required: true, message: '請選擇城市', trigger: 'change' }],
    'recipient.cityArea': [{ required: true, message: '請選擇地區', trigger: 'change' }],
    agreeTermsPrivacy: [{
        validator: (rule, value, callback) => {
            if (value === false) {
                callback(new Error('請同意網站服務條款及隱私權政策'))
            } else {
                callback()
            }
        },
        trigger: 'change'
    }]
}

//將引入的城鄉鎮資料，作處理後assign到 twCityArea.city
const getTwCityArea = () => {
    twCityArea.value.city = taiwanCity.map((item) => item.name)
}

// 送出表單
const onSubmit = async () => {

    if (!formRef.value) return

    try {
        await formRef.value.validate()
        if (!shippingMethod.value) {
            throw new Error('請選擇送貨方式')
        }
        if (!paymentMethod.value) {
            throw new Error('請選擇付款方式')
        }

        const orderData = {
            shippingRegion: "台灣",
            shippingMethod: shippingMethod.value,
            paymentMethod: paymentMethod.value === 'LINE PAY' ? 'onlinePayment' : 'cashOnDelivery',
            senderName: form.customer.name,
            senderEmail: form.customer.email,
            senderPhoneNumber: form.customer.phone,
            senderBirthday: null, // 未出現在表單中，非必填
            orderNotes: form.orderNotes,
            recipientName: form.recipient.name,
            recipientPhoneNumber: form.recipient.phone,
            recipientCity: form.recipient.cityName,
            recipientArea: form.recipient.cityArea,
            recipientAddress: form.recipient.address,
            creditCardNumber: "", // 非必填
            creditCardCVC: "", // 非必填
            creditCardExp: "" // 非必填
        }
        console.log('準備提交到後端的數據:', orderData)

        //提交到後端
        const response = await cartStore.submitOrder(orderData)

        if (response.status === 200 && response.code === 0) {
            ElMessage.success(response.message || '訂單提交成功')
            router.push('/order-complete')
            router.push({ name: 'OrderConfirmation', params: { orderId: response.id } })
        } else {
            throw new Error(response.message || '訂單提交失敗')
        }

    } catch (error) {
        console.error('表單驗證失敗:', error)
        ElMessage.error(error.message || '請填寫所有必要資訊')
    }
}

// 透過監聽選取城市的變化，將 地區值作處理後assign到twCityArea.value.area
watch(
    () => form.recipient.cityName,
    (newCity) => {
        const filterArea = taiwanCity.filter((item) => item.name === newCity)
        twCityArea.value.area = filterArea[0]?.districts.map((item) => item.name) || []
        form.recipient.cityArea = '' // 重置地區選擇
    }
)

// 監聽 useCustomerInfo 的變化
watch(() => form.UseCustomerInfo, (newValue) => {
    if (newValue) {
        form.recipient.name = form.customer.name
        form.recipient.phone = form.customer.phone
    } else {
        // 如果取消勾選，清空收件人資料
        form.recipient.name = ''
        form.recipient.phone = ''
    }
})

onMounted(async () => {
    // 從 localStorage 獲取前一頁資料
    const savedForm = localStorage.getItem('shippingPaymentForm')
    if (savedForm) {
        const parsedForm = JSON.parse(savedForm)
        shippingMethod.value = parsedForm.shippingMethod
        paymentMethod.value = parsedForm.paymentMethod
    }
    await cartStore.fetchMemberCartInfo()
    getTwCityArea()
})

</script>
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- 購物車步驟 -->
        <div class="col-start-5 col-span-4 mb-10">
            <ShoppingCartProgressBar :active-step="activeStep" :steps="steps" />
        </div>
        <!-- 上方合計文字 -->
        <div class="col-start-5 col-span-4 pb-10">
            <div class="py-6 bg-primary-200 border-2 border-black rounded shadow-base">
                <h3 class="text-2xl text-center">合計：NT$ {{ totalPrice }}</h3>
            </div>
        </div>
        <!-- 顧客資料與付款資料 -->
        <div class="col-span-6 relative">
            <!-- 顧客資料 -->
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-6 py-2 font-bold">顧客資料</p>
            </div>
            <div class="border-2 border-black px-6 py-9 ">
                <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="max-width: 100%">
                    <el-form-item label="訂購人姓名" prop="customer.name" label-position="top">
                        <el-input v-model="form.customer.name" placeholder="林飯糰" />
                    </el-form-item>
                    <el-form-item label="電子信箱" prop="customer.email" label-position="top">
                        <el-input v-model="form.customer.email" placeholder="hello@xxx.com" />
                    </el-form-item>
                    <el-form-item label="電話號碼" prop="customer.phone" label-position="top">
                        <el-input v-model="form.customer.phone" placeholder="0987654321" />
                    </el-form-item>
                </el-form>
            </div>
            <!-- 付款資料 -->
            <div class="col-span-6 absolute w-full pt-7">
                <div class="bg-primary-300 border-2 border-black">
                    <p class="px-6 py-2 font-bold">付款資料</p>
                </div>
                <div class="border-2 border-black px-6 py-9 -mt-[2px]">
                    <p>已選擇的付款方式: </p>
                    <p class="text-2xl">{{ paymentMethod === 'LINE PAY' ? 'LINE PAY' : '超商取付' }}</p>
                </div>
            </div>
        </div>
        <!-- 送貨資料 -->
        <div class="col-start-7 col-span-6">
            <div class="bg-primary-300 border-2 border-black flex justify-between">
                <p class="px-6 py-2 font-bold">送貨資料</p>
                <p class="px-6 py-2 font-bold">運費: {{ cartInfo.freightFree ? '免運' : 'NT$100' }}</p>
            </div>
            <div class="border-2 border-black px-6 py-4">
                <el-form :model="form" :rules="rules" label-width="auto" style="max-width: 100%">
                    <div>
                        <p>已選擇的送貨方式: {{ shippingMethod }}</p>
                        <el-checkbox v-model="form.UseCustomerInfo" label="收件人資料與顧客資料相同" size="large" />
                    </div>
                    <el-form-item label="收件人姓名" prop="recipient.name" label-position="top">
                        <el-input v-model="form.recipient.name" />
                        <span class="text-gray-400">請填入收件人真實姓名，以確保順利收件</span>
                    </el-form-item>
                    <el-form-item label="電話號碼" prop="recipient.phone" label-position="top">
                        <el-input v-model="form.recipient.phone" />
                    </el-form-item>
                    <el-divider />
                    <el-form-item label="地址 運送地點: 台灣" label-position="top">
                        <div class="w-full flex justify-between pb-2">
                            <el-form-item prop="recipient.cityName" class="w-[49%]">
                                <el-select v-model="form.recipient.cityName" placeholder="城市">
                                    <el-option v-for="cityItem in twCityArea.city" :key="cityItem" :label="cityItem"
                                        :value="cityItem" />
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="recipient.cityArea" class="w-[49%]">
                                <el-select v-model="form.recipient.cityArea" placeholder="地區" :inline="true">
                                    <el-option v-for="areaItem in twCityArea.area" :key="areaItem" :label="areaItem"
                                        :value="areaItem" />
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-form-item prop="recipient.address" class="w-full">
                            <el-input v-model="form.recipient.address" placeholder="地址" />
                        </el-form-item>
                    </el-form-item>
                    <div class="flex flex-col text-base">
                        <el-checkbox v-model="form.saveShippingAddress" label="儲存這個送貨地址" size="large" />
                        <el-checkbox v-model="form.setAsDefaultAddress" label="設定為預設地址" size="large" />
                    </div>
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
        <!-- 返回購物車按鈕 -->
        <div class="col-span-2">
            <RouterLink
                class="flex items-center py-2 px-4 mt-14 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none"
                to="/checkout/shipping-payment">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-2" />
                <p>返回購物車</p>
            </RouterLink>
        </div>
        <!-- 隱私權與提交訂單 -->
        <div class="col-start-7 col-span-6">
            <el-form ref="formRef" :model="form" :rules="rules">
                <el-form-item prop="agreeTermsPrivacy">
                    <div class="flex items-center mt-10">
                        <el-checkbox v-model="form.agreeTermsPrivacy" size="large" />
                        <p class="pl-2">我同意<a href="#" class="text-primary-600 hover:text-primary-400">網站服務條款</a>及<a
                                href="#" class="text-primary-600 hover:text-primary-400">隱私權政策</a></p>
                    </div>
                </el-form-item>
            </el-form>
            <div class="mt-6">
                <button
                    class="w-full flex items-center justify-center text-center py-2 px-4 bg-secondary-400 rounded border-2 border-black hover:shadow-base transition active:shadow-none"
                    type="primary" @click="onSubmit">
                    <p>提交訂單</p>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-form-item__label) {
    color: black;
    font-size: 16px;
}

/* :deep(.el-form-item) {
    margin-bottom: 24px;
} */

:deep(.el-select__wrapper) {
    padding: 8px 12px;
}

:deep(.el-textarea__inner) {
    padding: 12px 24px;
}
</style>