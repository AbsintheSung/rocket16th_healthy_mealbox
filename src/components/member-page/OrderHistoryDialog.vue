<script setup>
import { computed, watch, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useMemberStore } from '@/stores/member'
const memberStore = useMemberStore()
const { width } = useWindowSize()
const dialogWidth = computed(() => {
  if (width.value >= 768) return '760px'
  if (width.value >= 576) return '80%'
  return '90%'
})

const props = defineProps({
  dialogShow: {
    type: Boolean,
    default: false
  },
  customList: {
    type: Array,
    default: () => []
  },
  caseType: {
    type: Number,
    default: 7
  },
  generalList: {
    type: Array,
    default: () => []
  },
  handleCloseDialog: {
    type: Function
  }
})
</script>
<template>
  <el-dialog
    :model-value="dialogShow"
    :before-close="handleCloseDialog"
    :lock-scroll="false"
    :width="dialogWidth"
    :destroy-on-close="true"
  >
    <h2 class="text-primary-600">訂餐計畫{{ caseType }}餐</h2>
    <div class="flex flex-wrap pb-6 pt-5 sm:pb-16">
      <ul class="flex flex-wrap gap-x-3">
        <li class="border-e border-black pe-2" v-for="mealItem in generalList" :key="mealItem.id">
          <RouterLink :to="`/singlemeal/${mealItem.id}`">{{ mealItem.name }}</RouterLink
          >x {{ mealItem.boxQuantity }}
        </li>
      </ul>

      <ul class="flex flex-wrap gap-x-3 ps-3">
        <li
          class="border-e border-black pe-2"
          v-for="customItem in customList"
          :key="customItem.id"
        >
          <RouterLink :to="`/customsingle/${customItem.id}`">{{ customItem.name }}</RouterLink> x
          {{ customItem.boxQuantity }}
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center">
      <button class="rounded bg-primary-400 px-4 py-2 text-black" @click="handleCloseDialog">
        確認
      </button>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
