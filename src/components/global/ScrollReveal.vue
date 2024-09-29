<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
    delay: {
        type: Number,
        default: 0
    },
    threshold: {
        type: Number,
        default: 0.75
    },
    revealStyle: {
        type: String,
        default: 'bottomToTop',
        validator: (value) => ['bottomToTop', 'topToBottom'].includes(value)
    }
})

const revealed = ref(false)
const elementRef = ref(null)

const revealStyles = {
    bottomToTop: {
        initial: 'translateY(50px)',
        revealed: 'translateY(0)'
    },
    topToBottom: {
        initial: 'translateY(-50px)',
        revealed: 'translateY(0)'
    }
}

const currentStyle = computed(() => revealStyles[props.revealStyle])

const checkScroll = () => {
  if (!elementRef.value) return
  const rect = elementRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  
  if (rect.top <= windowHeight * props.threshold) {
    revealed.value = true
  } else {
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
    <div ref="elementRef" :class="{ 'scroll-reveal': true, 'is-revealed': revealed }" :style="{ '--initial-transform': currentStyle.initial, '--revealed-transform': currentStyle.revealed }">
        <slot></slot>
    </div>
</template>

<style scoped>
.scroll-reveal {
    opacity: 0;
    transform: var(--initial-transform);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    width: 100%;
}

.scroll-reveal.is-revealed {
    opacity: 1;
    transform: var(--revealed-transform);
}
</style>