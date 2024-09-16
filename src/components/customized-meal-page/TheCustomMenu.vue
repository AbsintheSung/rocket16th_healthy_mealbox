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
      <el-checkbox v-for="item in menuList" :key="item.id" :label="item.name" :value="item" />
    </el-checkbox-group>
  </el-collapse-item>
</template>
<style scoped></style>
