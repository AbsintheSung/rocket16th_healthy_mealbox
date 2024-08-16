<script lang="ts" setup>
import RegisterForm from '@/components/register-page/RegisterForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
</script>
<template>
  <main class="container">
    <div class="mx-auto mt-20 w-full md:w-1/2">
      <AuthNavigation class="mb-12" />
      <RegisterForm />
    </div>
  </main>
</template>
<style scoped></style>
