<script setup></script>
<template>
  <div class="auth-border flex">
    <RouterLink
      class="flex-grow py-4 text-center text-primary-700 md:py-5"
      to="/register"
      linkExactActiveClass="link-active"
    >
      會員註冊
    </RouterLink>
    <RouterLink
      class="flex-grow py-4 text-center text-primary-700 md:py-5"
      to="/signin"
      linkExactActiveClass="link-active"
    >
      會員登入
    </RouterLink>
  </div>
</template>
<style lang="scss" scoped>
.router-link-active {
  background-color: $primary-300;
  color: black;
}
.auth-border {
  border: 1px solid $primary-300;
}
</style>
