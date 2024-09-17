<script setup>
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import TheIngredient from '@/components/global/TheIngredient.vue'
const { width } = useWindowSize()
const dialogWidth = computed(() => {
  if (width.value >= 768) return '760px'
  if (width.value >= 576) return '80%'
  return '90%'
})

const customName = defineModel('customName')
const customContent = defineModel('customContent')

const props = defineProps({
  dialogShow: {
    type: Boolean,
    default: false
  },
  allDishList: {
    type: Array,
    default: () => []
  },
  currentCase: {
    type: Object
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  generatedImage: {
    type: String
  },
  fetchData: {
    type: Function
  }
})
const emits = defineEmits(['closeDialog'])
const handleClose = () => {
  emits('closeDialog')
}
const handleVerify = () => {
  props.fetchData()
  console.log('確認')
}
</script>
<template>
  <el-dialog
    :model-value="dialogShow"
    :before-close="handleClose"
    :lock-scroll="false"
    :width="dialogWidth"
    :destroy-on-close="true"
  >
    <div class="flex gap-x-6">
      <div class="w-1/2">
        <img :src="generatedImage" class="h-full w-full" />
      </div>
      <div class="flex w-1/2 flex-grow flex-col gap-y-4">
        <div class="flex items-center space-x-2">
          <label class="whitespace-nowrap text-xl font-bold md:text-2xl">餐盒名稱:</label>
          <input
            type="text"
            class="font-500 min-w-0 flex-1 border-0 border-b border-black text-xl focus:outline-none md:text-2xl"
            v-model="customName"
          />
        </div>
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
            <p>價格 : {{ totalPrice }} 元</p>
          </li>
        </ul>
        <div class="hidden flex-grow md:block">
          <textarea
            v-model="customContent"
            placeholder="新增餐盒內容"
            class="h-full w-full rounded border border-black px-3 py-2"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="py-3 md:hidden">
      <textarea
        v-model="customContent"
        placeholder="新增餐盒內容"
        class="h-full w-full rounded border border-black px-3 py-2"
      ></textarea>
    </div>
    <!-- <TheIngredient :ingredientData="totalCompositionChinese" /> -->
    <TheIngredient :allDishList="allDishList" />

    <div class="flex items-center gap-x-6 md:gap-x-16">
      <button @click="handleClose" class="w-1/2 bg-[#DCDCDC] py-3">取消</button>
      <button class="w-1/2 bg-secondary-400 py-3" @click="handleVerify">確認</button>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
