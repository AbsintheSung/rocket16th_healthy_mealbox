<script setup>
defineProps({
  currentStep: {
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
  <div class="flex justify-between items-center max-w-3xl mx-auto py-8">
    <div v-for="(step, index) in steps" :key="index">
      <div class="flex flex-col items-center relative flex-1">
        <div 
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2',
            currentStep >= index + 1 ? 'bg-primary-400 text-white' : 'bg-gray-300 text-white'
          ]"
        >
          {{ index + 1 }}
        </div>
        <div 
          :class="[
            'text-sm',
            currentStep >= index + 1 ? 'text-primary-400' : 'text-gray-500'
          ]"
        >
          {{ step }}
        </div>
        <!-- 線條位移待修正
        <div 
          v-if="index < steps.length - 1"
          :class="[
            'absolute top-4 start-full w-full h-0.5',
            currentStep > index + 1 ? 'bg-primary-400' : 'bg-gray-300'
          ]"
        ></div> -->
      </div>
    </div>
  </div>
</template>
<style scoped></style>