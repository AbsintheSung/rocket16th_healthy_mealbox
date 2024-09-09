<script setup lang="ts">
import sprite from '@/assets/image/sprite.svg'
const props = defineProps({
  svgIcon: {
    type: String,
    default: '', // 預設值
    required: true // 必要屬性
  },
  svgClassStyle: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <svg :class="`${props.svgClassStyle}`">
    <use :href="`${sprite}#${props.svgIcon}`"></use>
  </svg>
</template>
<style scoped></style>
