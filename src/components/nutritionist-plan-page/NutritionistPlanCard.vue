<script setup>
defineProps({
  planInfo: {
    type: Object,
    default: () => ({
      nutritionistName: '',
      nutritionistImg: '',
      nutritionistSeniority: '',
      caseType: null,
      caseName: '商品準備中',
      caseThumbnail: '',
      caseDescription: '',
      boxes: []
    })
  }
})
</script>
<template>
  <div class="flex flex-col">
    <div class="w-full">
      <div class="border-2 border-black rounded-t"><img :src="planInfo.caseThumbnail" :alt="planInfo.caseName"
          class="w-full h-[200px] object-cover">
      </div>
      <div class="flex flex-col items-start border-2 border-black rounded-b p-3">
        <RouterLink :to="`/nutritionist-plan/${planInfo.id}`">
          <h3 class="text-xl">{{ planInfo.nutritionistName }}營養師推薦 <span class="text-xl text-primary-600">{{ planInfo.caseName }}</span></h3>
        </RouterLink>
        <div class="py-2">
          <p class="text-sm text-gray-400">{{ planInfo.caseDescription }}</p>
        </div>
        <div class="pr-4">
          <button
            class="py-1 px-4 border-2 border-secondary-900 rounded hover:border-2 hover:bg-secondary-400 hover:border-black hover:shadow-base hover:transition active:shadow-none">
            <p class="text-secondary-900 hover:text-black">加入購物車</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>