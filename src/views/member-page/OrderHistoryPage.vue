<script setup>
import { ref } from 'vue'
const activeNames = ref('1')
const handleChange = (val) => {
  console.log(val)
}
const testData = ref(['豬肉漢堡排佐馬鈴薯', '雞胸蛋白沙拉碗', '藜麥蔬果飽飽餐'])
</script>
<template>
  <h2 class="mb-7 w-fit rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base">
    歷史訂單
  </h2>
  <div class="flex h-full flex-col">
    <el-collapse v-model="activeNames" @change="handleChange">
      <template v-for="(item, index) in 3" :key="item">
        <el-collapse-item
          :title="`訂單日期 ${'2024 / 08 / 07'} | 訂單金額：${'＄1460'}`"
          :name="index"
        >
          <section class="flex flex-col gap-y-4 p-4">
            <div>
              <h4>
                商品資訊 <span class="ms-8 text-primary-600">訂餐計畫 {{ 14 }}餐</span>
              </h4>
              <ul class="flex gap-x-2 gap-y-1">
                <li v-for="item in testData" :key="item">
                  <p class="border-e px-2 first:ps-0">{{ item }}</p>
                </li>
                <li><button class="text-secondary-base underline">查看更多</button></li>
              </ul>
            </div>
            <div class="flex items-center">
              <table class="order-status-table w-2/3 border-collapse">
                <thead>
                  <tr class="border-b p-2 text-center">
                    <th :class="{ 'text-primary-base': true }">訂單成立</th>
                    <th :class="{ 'text-primary-base': true }">付款成功</th>
                    <th :class="{ 'text-primary-base': true }">備貨中</th>
                    <th :class="{ 'text-primary-base': true }">已出貨</th>
                    <th :class="{ 'text-primary-base': true }">貨到門市</th>
                    <th :class="{ 'text-primary-base': false }">訂單完成</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <td :class="{ 'text-primary-base': true }">2024/08/20</td>
                    <td :class="{ 'text-primary-base': true }">✓</td>
                    <td :class="{ 'text-primary-base': true }">✓</td>
                    <td :class="{ 'text-primary-base': true }">✓</td>
                    <td :class="{ 'text-primary-base': true }">✓</td>
                    <td :class="{ 'text-primary-base': false }">✗</td>
                  </tr>
                </tbody>
              </table>
              <div class="flex flex-grow">
                <button class="ms-auto rounded bg-primary-base p-2 shadow-base">
                  再次加入購物車
                </button>
              </div>
            </div>
            <div class="-mx-4 -mb-4 flex flex-col bg-primary-100 px-4 py-3 md:flex-row">
              <div class="flex flex-grow flex-col gap-y-2 md:border-e">
                <div>
                  <h4>訂購人 : 林本丸</h4>
                  <address>
                    <p>連絡電話 : <a :href="`tel:${'+886-910123456'}`">0910123456</a></p>
                    <p>電子郵件 : <a :href="`mailto:${'hello@gmail.com'}`">hello@gmail.com</a></p>
                  </address>
                </div>
                <div>
                  <h4>收件人 : 林本丸</h4>
                  <address>
                    <p>連絡電話 : <a :href="`tel:${'+886-910123456'}`">0910123456</a></p>
                  </address>
                </div>
              </div>
              <!-- 配送資訊和付款方式 -->
              <div class="flex flex-grow flex-col gap-y-2 md:ps-5">
                <div>
                  <h4>配送資訊 : 宅配-新竹貨運</h4>
                  <address>
                    <p>連絡電話 : <a :href="`tel:${'+886-910123456'}`">0910123456</a></p>
                  </address>
                </div>
                <div class="mt-auto">
                  <p>付款方式 : 信用卡</p>
                </div>
              </div>
            </div>
          </section>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="mt-auto flex w-full items-center justify-center py-4">
      <el-pagination
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
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-collapse-item) {
  border: 1px solid black;
  margin-bottom: 32px;
}
:deep(.el-collapse-item__header) {
  border-bottom: 2px solid black;
  padding-left: 16px;
  font-size: 24px;
  color: black;
  font-weight: 500;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0px;
}
</style>
