<script lang="ts" setup>
import SigninForm from '@/components/signin-page/SigninForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
</script>
<template>
  <main class="container">
    <div class="mx-auto mt-20 w-full md:w-1/2">
      <AuthNavigation class="mb-12" />
      <SigninForm />
    </div>
  </main>
</template>
<style scoped></style>
