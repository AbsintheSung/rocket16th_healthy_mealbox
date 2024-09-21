<script setup>
defineProps({
  isCardLoaning: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="flex flex-col gap-y-4 rounded border p-4">
    <el-skeleton :loading="isCardLoaning" animated>
      <template #template>
        <div class="flex flex-col gap-y-4">
          <div class="relative w-full" style="padding-bottom: 75%">
            <el-skeleton-item variant="image" class="absolute left-0 top-0 h-full w-full" />
          </div>
          <el-skeleton-item variant="text" style="width: 100px" />
          <ul class="flex flex-row gap-y-4 text-[10px] sm:text-[14px]">
            <el-skeleton-item variant="text" style="width: 50px" />
            <el-skeleton-item variant="text" style="width: 70px" />
            <el-skeleton-item variant="text" style="width: 60px" />
          </ul>
          <div class="mt-auto flex gap-x-3">
            <el-skeleton-item variant="button" class="w-1/2" />
            <el-skeleton-item variant="button" class="w-1/2" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<style scoped></style>
