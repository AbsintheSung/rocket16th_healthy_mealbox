<script setup></script>
<template>
  <div>
    <h1>會員認證</h1>
    <RouterLink :to="{ name: 'Register' }">會員註冊</RouterLink>
    <RouterLink :to="{ name: 'Login' }">會員登入</RouterLink>
    <RouterView />
  </div>
</template>
<style scoped></style>
