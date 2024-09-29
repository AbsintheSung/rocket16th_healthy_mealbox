<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    delay: {
        type: Number,
        default: 0
    },
    threshold: {
        type: Number,
        default: 0.75
    }
})

const revealed = ref(false)
const elementRef = ref(null)

const checkScroll = () => {
  if (!elementRef.value) return
  const rect = elementRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  
  if (rect.top <= windowHeight * props.threshold) {
    revealed.value = true
  } else {
    // 當元素離開視窗頂部時重置動畫
    revealed.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    checkScroll()
    window.addEventListener('scroll', checkScroll)
  }, props.delay)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
    <div ref="elementRef" :class="{ 'scroll-reveal': true, 'is-revealed': revealed }">
        <slot></slot>
    </div>
</template>

<style scoped>
.scroll-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    width: 100%;
}

.scroll-reveal.is-revealed {
    opacity: 1;
    transform: translateY(0);
}
</style>