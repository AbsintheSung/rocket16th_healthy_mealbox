<script setup>
import OrderHistoryDialog from '@/components/member-page/OrderHistoryDialog.vue'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const memberStore = useMemberStore()
const dialogShow = ref(false)
const router = useRouter()
const customDialogList = ref([])
const generalDialogList = ref([])
const caseTypeDialog = ref(7)
const activeNames = ref(0)

// 取得customDialogList
const getCustomDialogList = computed(() => {
  return customDialogList.value.map((item) => ({
    ...item,
    composition: { ...item.composition },
    starch: [...item.starch],
    mainMeal: [...item.mainMeal],
    sideDishes: [...item.sideDishes]
  }))
})

// 取得 generalDialogList
const getGeneralDialogList = computed(() => {
  return generalDialogList.value.map((item) => ({
    ...item,
    composition: { ...item.composition },
    imgArr: [...item.imgArr]
  }))
})
const getCaseTypeDialog = computed(() => caseTypeDialog.value)

const handleChange = (val) => {
  // console.log(val)
}
const handleCloseDialog = () => {
  dialogShow.value = false
}
const handleCartList = (item) => {
  dialogShow.value = true
  caseTypeDialog.value = item.caseType
  customDialogList.value = item.customizeBoxes
  generalDialogList.value = item.generalBoxes
}

const handleHistoryOrderToCart = async (historyOrder) => {
  // console.log('安安')
  try {
    const response = await cartStore.fetchHistoryOrderToCart(historyOrder)
    message(response.message, 'success')
    router.push('/checkout/order-confirmation')
    // if (result === 'success') {
    //   // 顯示成功消息
    //   console.log('歷史訂單已成功添加到購物車')
    // } else if (result === 'endOrder') {
    //   // 顯示點餐已結束的消息
    //   console.log('點餐已結束，無法添加商品')
    // }
  } catch (error) {
    // 處理錯誤
    message(error.message, 'error')
    // console.error('添加歷史訂單到購物車時出錯:', error)
  }
}
const message = (mes, mesType) => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
// const testData = ref(['豬肉漢堡排佐馬鈴薯', '雞胸蛋白沙拉碗'])
</script>
<template>
  <OrderHistoryDialog
    :dialogShow="dialogShow"
    :handleCloseDialog="handleCloseDialog"
    :caseType="getCaseTypeDialog"
    :customList="getCustomDialogList"
    :generalList="getGeneralDialogList"
  />
  <div class="flex h-full flex-col">
    <h2
      class="mb-7 hidden rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base md:block md:w-fit"
    >
      歷史訂單
    </h2>
    <el-collapse class="el-flex-grow" v-model="activeNames" @change="handleChange" accordion>
      <template v-for="(item, index) in memberStore.getPaginatedOrder" :key="item">
        <el-collapse-item
          :title="`訂單日期 ${item.createTime} | 訂單金額：$${item.orderPrice}元`"
          :name="index"
        >
          <section class="flex flex-col gap-y-2 p-4 md:gap-y-8">
            <div class="flex flex-col gap-y-2 md:gap-y-8">
              <h4 class="flex flex-col md:block">
                商品資訊
                <span class="text-primary-600 md:ms-5"
                  >訂餐計畫 {{ item.cartOrder.caseType }}餐</span
                >
              </h4>
              <ul class="flex gap-x-2 gap-y-1">
                <li v-for="mealItem in item.combinedBoxes" :key="mealItem.id">
                  <p class="border-e px-2 first:ps-0">{{ mealItem.name }}</p>
                </li>
                <li>
                  <button
                    class="text-secondary-base underline"
                    @click="handleCartList(item.cartOrder)"
                  >
                    ...查看更多
                  </button>
                </li>
              </ul>
            </div>
            <div class="flex items-center">
              <table
                class="order-status-table w-full border-collapse text-[10px] sm:text-[12px] lg:w-2/3"
              >
                <thead>
                  <tr class="border-b p-2 text-center">
                    <th :class="{ 'text-primary-base': false }">訂單成立</th>
                    <th :class="{ 'text-primary-base': false }">付款成功</th>
                    <th :class="{ 'text-primary-base': false }">備貨中</th>
                    <th :class="{ 'text-primary-base': false }">已出貨</th>
                    <th :class="{ 'text-primary-base': false }">貨到門市</th>
                    <th :class="{ 'text-primary-base': false }">訂單完成</th>
                    <!-- <th :class="{ 'text-primary-base': item.createTime !== null, 'text-black': item.createTime === null }">訂單成立</th>
                    <th :class="{ 'text-primary-base': item.paymentSuccessTime !== null, 'text-black': item.paymentSuccessTime === null }">付款成功</th>
                    <th :class="{ 'text-primary-base': item.preparingGoodsTime !== null, 'text-black': item.preparingGoodsTime === null }">備貨中</th>
                    <th :class="{ 'text-primary-base': item.shippedTime !== null, 'text-black': item.shippedTime === null }">已出貨</th>
                    <th :class="{ 'text-primary-base': item.arrivedAtStoreTime !== null, 'text-black': item.arrivedAtStoreTime === null }">貨到門市</th>
                    <th :class="{ 'text-primary-base': item.orderCompletedTime !== null, 'text-black': item.orderCompletedTime === null }">訂單完成</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <td :class="{ 'text-primary-base': true }">{{ item.createTime }}</td>
                    <td
                      v-if="item.paymentSuccessTime != null"
                      :class="{ 'text-primary-base': true }"
                    >
                      {{ item.paymentSuccessTime }}
                    </td>
                    <td v-else :class="{ 'text-danger-base': true }">未付款</td>
                    <td
                      v-if="item.preparingGoodsTime != null"
                      :class="{ 'text-primary-base': true }"
                    >
                      {{ item.preparingGoodsTime }}
                    </td>
                    <td v-else :class="{ 'text-danger-base': true }">準備中</td>
                    <td v-if="item.shippedTime != null" :class="{ 'text-primary-base': true }">
                      {{ item.shippedTime }}
                    </td>
                    <td v-else :class="{ 'text-danger-base': true }">運送中</td>
                    <td
                      v-if="item.arrivedAtStoreTime != null"
                      :class="{ 'text-primary-base': true }"
                    >
                      {{ item.arrivedAtStoreTime }}
                    </td>
                    <td v-else :class="{ 'text-danger-base': true }">運送中</td>
                    <td
                      v-if="item.orderCompletedTime != null"
                      :class="{ 'text-primary-base': true }"
                    >
                      {{ item.orderCompletedTime }}
                    </td>
                    <td v-else :class="{ 'text-danger-base': true }">訂單未完成</td>

                    <!-- <td :class="{ 'text-primary-base': true }">{{ item.shippedTime }}</td> -->
                    <!-- <td :class="{ 'text-primary-base': true }">{{ item.arrivedAtStoreTime }}</td> -->
                    <!-- <td :class="{ 'text-primary-base': false }">{{ item.orderCompletedTime }}</td> -->
                  </tr>
                </tbody>
              </table>
              <div class="hidden flex-grow lg:flex">
                <button
                  class="ms-auto rounded border-2 border-secondary-900 bg-secondary-400 p-2 font-bold text-black hover:border-black hover:bg-secondary-400 hover:shadow-base hover:transition"
                  @click="handleHistoryOrderToCart(item.cartOrder)"
                >
                  再次加入購物車
                </button>
              </div>
            </div>
            <div class="-mx-4 -mb-4 flex flex-col bg-primary-100 px-4 py-3 lg:flex-row">
              <div class="flex flex-grow flex-col gap-y-2 pb-3 lg:border-e lg:pb-0">
                <div>
                  <h4>訂購人 : {{ item.senderName }}</h4>
                  <address>
                    <p>
                      連絡電話 :
                      <a :href="`tel:${item.senderPhoneNumber}`">{{ item.senderPhoneNumber }}</a>
                    </p>
                    <p>
                      電子郵件 : <a :href="`mailto:${item.senderEmail}`">{{ item.senderEmail }}</a>
                    </p>
                  </address>
                </div>
                <div>
                  <h4>收件人 : {{ item.recipientName }}</h4>
                  <address>
                    <p>
                      連絡電話 :
                      <a :href="`tel:${item.recipientPhoneNumber}`">{{
                        item.recipientPhoneNumber
                      }}</a>
                    </p>
                  </address>
                </div>
              </div>
              <!-- 配送資訊和付款方式 -->
              <div class="flex flex-grow flex-col gap-y-2 pt-3 lg:ps-5 lg:pt-0">
                <div>
                  <h4>配送資訊 :{{ item.shippingMethod }}</h4>
                  <address>
                    <!-- <p>
                      連絡電話 :
                      <a :href="`tel:${item.senderPhoneNumber}`">{{ item.senderPhoneNumber }}</a>
                    </p> -->
                  </address>
                </div>
                <div class="mt-auto flex items-center">
                  <p v-if="item.paymentMethod === 'onlinePayment'">付款方式 : 線上支付</p>
                  <p v-else-if="item.paymentMethod === 'cashOnDelivery '">付款方式 : 貨到付款</p>
                  <div class="flex flex-grow lg:hidden">
                    <button
                      class="ms-auto rounded border-2 border-secondary-900 bg-secondary-400 px-6 py-2 font-bold text-black hover:border-black hover:bg-secondary-400 hover:shadow-base hover:transition"
                      @click="handleHistoryOrderToCart(item.cartOrder)"
                    >
                      再次加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="mt-auto flex w-full items-center justify-center py-4">
      <ThePagination
        v-model:currentPageNum="memberStore.orderCurrentPage"
        :pagerCount="5"
        :pageSize="memberStore.getOrderPageSize"
        :pageTotal="memberStore.getOrderTotal"
        :changePage="memberStore.changeOrderPage"
      />
      <!-- <el-pagination
        style="--el-fill-color: white"
        layout="prev, pager, next"
        v-model:current-page="currentPage1"
        background
        :page-size="10"
        :pager-count="11"
        :total="50"
        :prev-text="'上一頁'"
        :next-text="'下一頁'"
        @current-change="handleCurrentChange"
      /> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.el-flex-grow {
  flex-grow: 1;
}
:deep(.el-collapse-item) {
  border: 1px solid black;
  margin-bottom: 32px;
}
:deep(.el-collapse-item__header) {
  border-bottom: 2px solid black;
  padding-left: 16px;
  font-size: 10px;
  color: black;
  font-weight: 500;

  @media (min-width: 430px) {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 992px) {
    font-size: 20px;
  }
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0px;
}
</style>
