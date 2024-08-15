<script setup></script>
<template>
  <div class="flex">
    <RouterLink
      class="flex-grow py-6 text-center"
      to="/register"
      linkExactActiveClass="link-active"
    >
      會員註冊
    </RouterLink>
    <RouterLink class="flex-grow py-6 text-center" to="/signin" linkExactActiveClass="link-active">
      會員登入
    </RouterLink>
  </div>
</template>
<style scoped>
.router-link-active {
  background-color: #e0561f;
}
</style>
