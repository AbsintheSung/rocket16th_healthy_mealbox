<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
const nutrientNameMap = {
  calories: '卡路里',
  protein: '蛋白質',
  adipose: '脂肪',
  carbohydrate: '碳水化合物',
  fiber: '纖維',
  sodium: '鈉含量'
}
</script>
<template>
  <main>
    <div class="bg-primary-400">
      <div class="container relative flex items-center justify-center">
        <button class="absolute left-0 top-1/2 block -translate-y-1/2 p-2 md:hidden">
          <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
        </button>
        <h2 class="py-2 text-center text-2xl font-bold text-white md:text-4xl">自定義餐盒</h2>
      </div>
    </div>

    <div class="md:bg-custom-main bg-none">
      <div class="py-6 md:py-28">
        <h3 class="mb-3 text-center text-2xl font-bold text-black md:text-3xl md:text-white">
          從列表中選擇您最愛的自製餐點
        </h3>
        <p class="text-center text-black md:text-white">選擇符合您需求的內容，根據喜好調整餐點</p>
        <p class="text-center text-black md:text-white">一起來組合你的自定義餐盒吧！</p>
      </div>
    </div>
    <div class="container py-4 md:py-14">
      <div class="flex w-full items-center justify-between py-3 md:w-2/3">
        <el-select v-model="value" placeholder="Select" size="small" class="el-select-width">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <RouterLink class="hidden md:flex" to="/">返回上一頁</RouterLink>
      </div>
      <div class="flex flex-col gap-x-6 md:flex-row">
        <div class="w-full md:w-2/3">拼貼區</div>
        <div class="w-full md:w-1/3">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Consistency" name="1">
              <div>區塊1-內容一</div>
              <div>區塊2-內容二</div>
            </el-collapse-item>
            <el-collapse-item title="Feedback" name="2">
              <div>區塊1-內容一</div>
              <div>區塊2-內容二</div>
            </el-collapse-item>
            <el-collapse-item title="Efficiency" name="3">
              <div>Simplify the process: keep operating process simple and intuitive;</div>
              <div>區塊1-內容一</div>
              <div>區塊2-內容二</div>
            </el-collapse-item>
            <el-collapse-item title="Controllability" name="4">
              <div>區塊1-內容一</div>
              <div>區塊2-內容二</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="container">
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-full col-start-1 lg:col-span-8">
            <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
              <li
                v-for="(item, index) in 6"
                :key="item"
                class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
                :class="[
                  index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
                  index % 3 === 0 ? 'md:border-l' : 'border-l',
                  (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
                  'md:border-x',
                  { 'md:first:border-l-0': index === 0 },
                  { 'md:last:border-r-0': index === 6 - 1 }
                ]"
              >
                <h3>{{ '碳水化合物' }}</h3>
                <p>{{ '100g' }}</p>
              </li>
            </ul>
          </div>
          <div class="col-span-full col-start-1 lg:col-span-4 lg:col-start-9">
            <div class="grid h-full grid-cols-4 items-center gap-x-6">
              <button class="col-span-2 col-start-1 rounded bg-[#DCDCDC] py-4 hover:cursor-pointer">
                重新編輯
              </button>
              <button
                class="col-span-2 rounded bg-secondary-400 py-4 hover:cursor-pointer hover:shadow-base"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped lang="scss">
.el-select-width {
  width: 100%;
  @media (min-width: 576px) {
    width: 40%;
  }
}
</style>
