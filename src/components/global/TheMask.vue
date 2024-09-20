<script setup lang="ts">
type Props = {
  isExpanded: Boolean
  toggleExpand: () => void
}
const props = defineProps<Props>()
</script>
<template>
  <!-- 遮罩 -->
  <Teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isExpanded"
        class="fixed inset-0 z-[5] bg-black bg-opacity-50"
        @click="toggleExpand"
      ></div>
    </transition>
  </Teleport>
</template>
<style scoped lang="scss"></style>
