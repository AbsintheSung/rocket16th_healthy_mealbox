<script setup>
import { ref, computed, watch } from 'vue'
const selectMenu = defineModel('selectMenu')
const emit = defineEmits(['selectionChanged'])
const props = defineProps({
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

watch(
  () => selectMenu.value,
  (newValue) => {
    // console.log(newValue)
    // console.log(props.accordionCode)
    // console.log(newValue.length)
    if (newValue && newValue.length > 0) {
      emit('selectionChanged', props.accordionCode)
    }
  },
  { immediate: true }
)
</script>
<template>
  <el-collapse-item :name="accordionCode">
    <template #title>
      <div class="flex w-full items-center justify-between">
        <h3>
          {{ title }}
        </h3>
        <p class="pe-4">{{ `${selectMenu.length} / 1` }}</p>
      </div>
    </template>
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
