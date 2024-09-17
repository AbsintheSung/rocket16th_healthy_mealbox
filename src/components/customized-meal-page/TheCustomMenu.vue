<script setup>
import { ref, computed } from 'vue'
const selectMenu = defineModel('selectMenu')
defineProps({
  title: {
    type: String,
    default: '選單菜單'
  },
  accordionCode: {
    type: String,
    default: '0'
  },
  menuList: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <el-collapse-item :title="title" :name="accordionCode">
    <el-checkbox-group v-model="selectMenu" :min="0" :max="1" class="flex flex-col">
      <!-- <el-checkbox v-for="item in menuList" :key="item.id" :label="item.name" :value="item" /> -->
      <el-checkbox v-for="item in menuList" :key="item.id" :label="item.name" :value="item">
        <div class="flex flex-nowrap items-center justify-between">
          <p>{{ item.name }}</p>
          <p>${{ item.price }}</p>
        </div>
      </el-checkbox>
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style lang="scss" scoped>
:deep(.el-checkbox__label) {
  width: 100%;
}
:deep(.el-checkbox) {
  margin-right: 30px;
  margin-left: 16px;
}
</style>
