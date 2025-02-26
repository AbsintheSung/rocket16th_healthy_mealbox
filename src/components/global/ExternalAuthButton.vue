<script setup lang="ts">
import type { PropType } from 'vue'
defineProps({
  buttonOption: {
    type: Object as PropType<{
      buttonClass: string
      buttonTitle: string
      icon: string[]
      iconSize: string
      handleButton: () => void
    }>,
    required: true
  }
})
</script>
<template>
  <button
    class="relative my-5 flex w-full items-center justify-center rounded-md px-4 py-3"
    :class="buttonOption.buttonClass"
    @click="buttonOption.handleButton"
  >
    <FontAwesomeIcon
      class="absolute left-4"
      :icon="buttonOption.icon"
      :size="buttonOption.iconSize"
    />
    <p>{{ buttonOption.buttonTitle }}</p>
  </button>
</template>
