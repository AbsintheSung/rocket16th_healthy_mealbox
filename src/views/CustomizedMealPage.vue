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
</script>
<template>
  <main>
    <h2 class="bg-primary-400 py-2 text-center text-2xl font-bold text-white md:text-4xl">
      自定義餐盒
    </h2>
    <div class="md:bg-custom-main bg-none">
      <div class="py-6 md:py-28">
        <h3 class="mb-3 text-center text-2xl font-bold text-black md:text-3xl md:text-white">
          從列表中選擇您最愛的自製餐點
        </h3>
        <p class="text-center text-black md:text-white">選擇符合您需求的內容，根據喜好調整餐點</p>
        <p class="text-center text-black md:text-white">一起來組合你的自定義餐盒吧！</p>
      </div>
    </div>
    <div class="container">
      <div class="flex items-center justify-between">
        <el-select v-model="value" placeholder="Select" size="small" style="width: 30%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <RouterLink to="/">返回上一頁</RouterLink>
      </div>
      <div class="flex gap-x-6">
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
    </div>
  </main>
</template>
<style scoped></style>
