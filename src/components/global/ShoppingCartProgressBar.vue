<script setup>
defineProps({
  activeStep: {
    type: Number,
    required: true
  },
  steps: {
    type: Array,
    required: true
  }
})

</script>
<template>
  <div class="text-center">
    <el-steps :active="activeStep"  align-center>
      <el-step v-for="(step, index) in steps" :key="index" :title="step">
      </el-step>
    </el-steps>
  </div>
</template>
<style scoped>
:deep(.el-step__icon) {
  width: 30px;
  height: 30px;
}

:deep(.el-step__icon-inner) {
  font-weight: 400;
}

:deep(.el-step__title) {
  font-weight: 400;
}
</style>