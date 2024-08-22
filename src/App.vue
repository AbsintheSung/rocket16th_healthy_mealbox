<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLayout from '@/components/global/HeaderLayout.vue'
import FooterLayout from '@/components/global/FooterLayout.vue'
import HeaderAdorn from '@/components/global/HeaderAdorn.vue'
</script>

<template>
  <HeaderLayout />
  <HeaderAdorn />
  <RouterView />
  <FooterLayout />
</template>

<style scoped></style>
