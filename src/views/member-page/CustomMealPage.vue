<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { useCustomMealBoxStore } from '@/stores/custommealbox'
import ThePagination from '@/components/global/ThePagination.vue'
import CustomCard from '@/components/global/CustomCard.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/button.scss'
const fullscreenLoading = ref(false)
const memberStore = useMemberStore()
const customMealBoxStore = useCustomMealBoxStore()
const router = useRouter()
// import MealCard from '@/components/global/MealCard.vue'

// const currentPage1 = ref(1)

// const handleCurrentChange = (val) => {
//   console.log(`current page: ${val}`)
// }
const message = (mes, mesType) => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
const handleEdit = (id) => {
  router.push(`/editcustommeal/${id}`)
}
const handleDelete = async (id, name) => {
  try {
    await ElMessageBox.confirm(`是否刪除 ${name}`, 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
    try {
      fullscreenLoading.value = true
      await memberStore.deleteCustom(id)
      message('刪除成功', 'success')
    } catch (error) {
      message('刪除失敗', 'error')
    } finally {
      fullscreenLoading.value = false
    }
  } catch (error) {
    return null
  }
  // try {
  //   fullscreenLoading.value = true
  //   const response = await memberStore.deleteCustom(id)
  //   message('刪除成功', 'success')
  // } catch (error) {
  //   message('刪除失敗', 'error')
  // } finally {
  //   fullscreenLoading.value = false
  // }
}
</script>
<template>
  <div class="flex h-full flex-col" v-loading.fullscreen.lock="fullscreenLoading">
    <h2
      class="mb-7 hidden rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base md:block md:w-fit"
    >
      自定義餐盒
    </h2>
    <ul class="grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-3 lg:gap-y-6">
      <CustomCard
        v-for="custItem in customMealBoxStore.getCustomMeal"
        :key="custItem.id"
        class="text-[12px] md:text-base"
        :mealInfo="custItem"
        :editData="handleEdit"
        :deleteData="handleDelete"
      />
      <!-- <MealCard v-for="item in 9" :key="item" class="text-[12px] md:text-base" /> -->
    </ul>
    <div class="mt-auto flex items-center justify-center py-6">
      <ThePagination
        v-model:currentPageNum="memberStore.customCurrentPage"
        :pagerCount="5"
        :pageSize="memberStore.getCustomPageSize"
        :pageTotal="memberStore.getCustomTotal"
        :changePage="memberStore.changeCustomPage"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
