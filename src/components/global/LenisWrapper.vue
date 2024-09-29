<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Lenis from 'lenis'

const props = defineProps({
    scrollStyle: {
        type: String,
        default: 'default',
        required: false
    }
})

const lenisRoot = ref(null)
let lenis = null

const scrollStyles = {
    default: {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    },
    smooth: {
        duration: 0.5,
        easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        smoothTouch: true,
        touchMultiplier: 1.5,
    },
    smooth2: {
        duration: 2.5,
        easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        smoothTouch: true,
        touchMultiplier: 1.5,
    }
}

const initLenis = () => {
    const style = scrollStyles[props.scrollStyle] || scrollStyles.default
    lenis = new Lenis(style)

    function raf(time) {
        lenis && lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

onMounted(() => {
    initLenis()
})

onUnmounted(() => {
    if (lenis) {
        lenis.destroy()
    }
})

watch(() => props.scrollStyle, () => {
    if (lenis) {
        lenis.destroy()
    }
    initLenis()
})
</script>
<template>
    <div ref="lenisRoot">
        <slot></slot>
    </div>
</template>
<style scoped>
.lenis {
    height: 100%;
    width: 100%;
}
</style>