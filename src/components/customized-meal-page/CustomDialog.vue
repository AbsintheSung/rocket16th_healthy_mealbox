<script setup>
import { type } from 'os'
import { watch } from 'vue'

defineProps({
  dialogShow: {
    type: Boolean,
    default: false
  },
  totalCompositionChinese: {
    type: Object
    // default:{}
  },
  currentCase: {
    type: Object
  }
  // totalPrice: {
  //   // type: Number
  //   // default: 0
  // }
})
const emits = defineEmits(['closeDialog'])
const handleClose = () => {
  emits('closeDialog')
}
</script>
<template>
  <el-dialog
    :model-value="dialogShow"
    :width="`75%`"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <h1>談窗測試</h1>
    <div class="flex">
      <div class="w-1/2"></div>
      <div class="w-1/2">
        <ul>
          <li v-for="(item, index) in currentCase.starchDishesList" :key="item">
            <p>{{ `澱粉${Number(index) + 1} : ${item[0]?.name || '未選填'}` }}</p>
          </li>
          <li v-for="(item, index) in currentCase.mainMealList" :key="item">
            <p>{{ `主食${Number(index) + 1} : ${item[0]?.name || '未選填'}` }}</p>
          </li>
          <li v-for="(item, index) in currentCase.sideDishesList" :key="item">
            <p>{{ `配菜${Number(index) + 1} : ${item[0]?.name || '未選填'}` }}</p>
          </li>
          <li>
            <!-- <p>價格 : {{ totalPrice }}</p> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button @click="handleClose" class="del-dialog-cancel-btn">Cancel</el-button>
      <el-button type="primary" class="del-dialog-btn"> 確認 </el-button>
    </div>
    <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
      <li
        v-for="(item, index) in totalCompositionChinese"
        :key="item.name"
        class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
        :class="[
          index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
          index % 3 === 0 ? 'md:border-l' : 'border-l',
          (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
          'md:border-x',
          { 'md:first:border-l-0': index === 0 },
          { 'md:last:border-r-0': index === totalCompositionChinese.length - 1 }
        ]"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.value }}</p>
      </li>
    </ul>
  </el-dialog>
</template>
<style></style>
