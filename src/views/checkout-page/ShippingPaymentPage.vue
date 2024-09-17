<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import ShoppingCartProgressBar from '@/components/global/ShoppingCartProgressBar.vue'

const cartStore = useCartStore()
const router = useRouter()

//餐盒數量
const generalBoxes = computed(() => cartStore.getGeneralBoxes)

//購物車狀態列函式
const steps = ref(['購物車', '填寫資料', '訂單確認'])
const activeStep = ref(1)

// 購物車資訊
const cartInfo = computed(() => cartStore.getCartInfo)
const totalQuantity = computed(() => cartStore.getMealBoxTotal)

// 計算總價
const totalPrice = computed(() => {
    const prize = cartInfo.value.prize || 0
    return cartInfo.value.freightFree ? prize : prize + 300
})

// 確認購物車內是否有商品
const hasCartItems = computed(() => generalBoxes.value.length > 0)

// 清空購物車
const handleClearCart = async () => {
    try {
        await ElMessageBox.confirm(
            '確定要清空購物車嗎？',
            '警告',
            {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        const result = await cartStore.cleanCart()
        if (result === "success") {
            ElMessage.success('購物車已清空')
            await cartStore.fetchMemberCartInfo()
        }

        // 檢查購物車是否為空
        if (generalBoxes.value.length === 0) {
            ElMessage.warning('購物車內沒有商品')
            setTimeout(() => {
                const loading = ElLoading.service({
                    lock: true,
                    text: '回到產品頁面...'
                })
                setTimeout(() => {
                    loading.close()
                    router.push('/plan-selection')
                }, 3000)
            }, 2000)
        }
    } catch (error) {
        console.error('清空購物車時發生錯誤:', error);
        if (error !== 'cancel') {
            ElMessage.error('清空購物車失敗')
        }
    }
}

//表單資料
const form = reactive({
    shippingRegion: '',
    shippingMethod: '',
    paymentMethod: ''
})

//付款方式
const paymentOptions = ref([
    { label: 'LINE Pay付款', value: 'LINE PAY', disabled: false },
    { label: '超商取付', value: 'storePickup', disabled: true }
])

// 送貨方式的邏輯判斷
watch(() => form.shippingMethod, (newShippingMethod) => {
    if (newShippingMethod === '新竹貨運') {
        paymentOptions.value = [
            { label: 'LINE Pay付款', value: 'LINE PAY', disabled: false },
            { label: '超商取付', value: 'storePickup', disabled: true }
        ]
        // 若為超取，則兩種付款方式都能使用
        if (form.paymentMethod === 'storePickup') {
            form.paymentMethod = ''
        }
    } else if (newShippingMethod === '超商冷凍宅配') {
        paymentOptions.value = [
            { label: 'LINE Pay付款', value: 'LINE PAY', disabled: false },
            { label: '超商取付', value: 'storePickup', disabled: false }
        ]
    }
})

// 讀取過去儲存的表單
// 防止客戶重整頁面或關閉瀏覽器時資料消失
onMounted(() => {
    const savedForm = localStorage.getItem('shippingPaymentForm')
    if (savedForm) {
        Object.assign(form, JSON.parse(savedForm))
    }
})

//送出表單
const onSubmit = () => {
    if (form.shippingRegion && form.shippingMethod && form.paymentMethod) {
        // 將表單數據存儲到 localStorage
        localStorage.setItem('shippingPaymentForm', JSON.stringify(form))
        router.push('/checkout/order-information')
    } else {
        ElMessage.error('請填寫所有必要資訊')
    }
}

</script>
<template>
    <div class="grid grid-cols-4 gap-3 md:grid-cols-12 md:gap-6">
        <!-- 購物車步驟 -->
        <div class="col-span-4 md:col-start-5 mb-3 md:mb-9">
            <ShoppingCartProgressBar :active-step="activeStep" :steps="steps" />
        </div>
        <!-- 購物車與優惠預覽 -->
        <div class="col-span-4 text-sm md:col-span-12 md:text-base">
            <div v-if="hasCartItems" class="border-2 border-black">
                <div class="bg-primary-300 border-b-2 py-2 pl-3 border-black md:py-2 md:pl-6">
                    <p class="font-bold">購物車</p>
                </div>
                <table class="w-full table-auto border-b-2 border-black">
                    <thead>
                        <tr class="border-b-2 border-black">
                            <th class="pl-3 py-2 text-left font-normal w-1/4 md:pl-6">商品資料</th>
                            <th class="text-left font-normal w-1/6 pl-6 md:pl-0">優惠</th>
                            <th class="text-left font-normal w-1/5">方案價格</th>
                            <th class="text-left font-normal w-1/6">數量</th>
                            <th class="text-left font-normal w-1/6">小計</th>
                            <th class="text-left font-normal w-1/6"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="pl-3 py-2 flex items-center md:pl-6">
                                <p>訂餐計畫 {{ totalQuantity }} 餐</p>
                            </td>
                            <td class="pl-6 md:pl-0">{{ cartInfo.freightFree ? '免運' : '無' }}</td>
                            <td>NT${{ cartInfo.prize }}</td>
                            <td>1</td>
                            <td>NT${{ cartInfo.prize }}</td>
                            <td>
                                <button plain @click="handleClearCart"
                                    class="text-black hover:text-secondary-400 transition">
                                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-sm md:text-2xl" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="p-3 md:py-10 md:px-6">
                    <div class="flex items-center">
                        <p class="bg-primary-200 px-2 py-1 mr-1 border border-black">已享用之優惠</p>
                        <p>{{ cartInfo.freightFree ? '全店商品滿1000免運' : '無' }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="border-2 border-black">
                <div class="bg-primary-300 border-b-2 py-2 pl-3 border-black md:py-2 md:pl-6">
                    <p class="font-bold">購物車</p>
                </div>
                <div class="p-3 border-b border-black md:p-6">
                    <div class="flex justify-center items-center flex-col">
                        <TheSvg svgIcon="pac-man-eat" class="mt-auto hidden h-[60px] w-[450px] md:block" />
                        <h4 class="py-6 text-lg font-bold text-primary-500 md:pt-6">購物車內還沒有商品，快來新增！</h4>
                    </div>
                </div>
            </div>
        </div>
        <!-- 選擇送貨與付款方式 左邊-->
        <div class="col-span-4 md:col-span-8">
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-3 py-2 font-bold md:px-6">選擇送貨及付款方式</p>
            </div>
            <div class="border-2 border-black">
                <el-form :model="form" label-width="auto" style="max-width: 100%" class="px-3 pt-4 md:px-6 md:pb-4">
                    <el-form-item label="送貨地點" label-position="top">
                        <el-select v-model="form.shippingRegion" placeholder="請選擇運送區域">
                            <el-option label="臺灣本島" value="islandTaiwan" />
                            <el-option label="臺灣離島地區" value="outlyingTaiwan" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="送貨方式" label-position="top">
                        <el-select v-model="form.shippingMethod" placeholder="請選擇送貨方式">
                            <el-option label="新竹貨運" value="新竹貨運" />
                            <el-option label="超商冷凍宅配" value="超商冷凍宅配" />
                        </el-select>
                    </el-form-item>
                    <div class="pb-2 md:pb-3">
                        <ul class="list-disc list-inside text-sm md:text-base">
                            <li>若您選擇<b> 超商宅配 + 線上支付</b>，取貨時務必出示身分證件</li>
                            <li>如訂單量較大或是有缺貨狀況，寄出時間將有所延遲，敬請見諒</li>
                            <li>若收到商品外箱有明顯破損，可以拒收且錄影存留，並盡速聯繫客服，謝謝</li>
                            <li>訂單將於下單後隔天寄出，２－３天會送達指定地點(不包含例假日)</li>
                            <li>若下單後一週仍未收到商品，可能是送達時無人簽收，貨物招領中。請聯繫客服為您查詢送貨狀態</li>
                            <li>若遇突發狀況無法收貨，請先聯繫客服</li>
                        </ul>
                    </div>
                    <el-form-item label="付款方式" label-position="top">
                        <el-select v-model="form.paymentMethod" placeholder="請選擇付款方式">
                            <el-option v-for="option in paymentOptions" :key="option.value" :label="option.label"
                                :value="option.value" :disabled="option.disabled" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 選擇送貨與付款方式 右邊 -->
        <div class="col-span-4 md:col-start-9">
            <div class="bg-primary-300 border-2 border-black">
                <p class="px-3 py-2 font-bold md:px-6">選擇送貨及付款方式</p>
            </div>
            <div class="border border-black">
                <div class="border border-black px-3 py-9 md:px-6">
                    <div class="flex justify-between text-xl pb-6 border-b border-black">
                        <p>商品金額</p>
                        <p>NT${{ cartInfo.prize }}</p>
                    </div>
                    <div class="flex justify-between text-xl pt-9 pb-6 border-b border-black">
                        <p>運費</p>
                        <p>{{ cartInfo.freightFree ? '免運' : 'NT$300' }}</p>
                    </div>
                    <div class="flex justify-between text-xl pt-9 pb-6 border-b border-black">
                        <p>合計</p>
                        <p>NT${{ totalPrice }}</p>
                    </div>
                    <div class="pt-6 md:pt-20">
                        <button
                            class="flex items-center justify-center text-center py-2 px-4 w-full bg-secondary-400 rounded border-2 border-black hover:shadow-base transition active:shadow-none"
                            type="primary" @click="onSubmit">
                            <p>前往結帳購物車</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回訂單確認按鈕 -->
        <div class="col-span-2">
            <RouterLink
                class="flex items-center py-2 px-4 mt-3 border-2 border-black rounded-sm hover:shadow-base transition active:shadow-none md:mt-10"
                to="/checkout/order-confirmation">
                <font-awesome-icon :icon="['fas', 'caret-left']" class="pr-3 text-sm" />
                <p>返回購物車</p>
            </RouterLink>
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