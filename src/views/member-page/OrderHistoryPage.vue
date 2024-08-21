<script setup>
import { ref } from 'vue'
const activeNames = ref('1')
const handleChange = (val) => {
  console.log(val)
}
</script>
<template>
  <h2 class="mb-20 w-fit rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base">
    歷史訂單
  </h2>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="`訂單日期 ${'2024 / 08 / 07'} | 訂單金額：${'＄1460'}`" name="1">
        <section class="flex flex-col gap-y-4 p-4">
          <div>
            <h4>訂餐計畫{{ 14 }}餐</h4>
            <ul class="flex w-2/3 flex-wrap gap-x-2 gap-y-1">
              <li v-for="item in 14" :key="item">餐點123{{ item }}</li>
            </ul>
          </div>
          <div class="flex items-center">
            <table class="order-status-table w-2/3 border-collapse">
              <thead>
                <tr class="border-b p-2 text-center">
                  <th>訂單成立</th>
                  <th>付款成功</th>
                  <th>備貨中</th>
                  <th>已出貨</th>
                  <th>貨到門市</th>
                  <th>訂單完成</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td>2024/08/20</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✗</td>
                </tr>
              </tbody>
            </table>
            <div class="flex flex-grow">
              <button class="ms-auto rounded bg-primary-base p-2">再次加入購物車</button>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
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
    </el-collapse>
  </div>
</template>
<style lang="scss" scoped></style>
