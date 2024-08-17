<script setup></script>
<template>
  <div class="auth-border flex">
    <RouterLink
      class="flex-grow py-6 text-center text-primary-base"
      to="/register"
      linkExactActiveClass="link-active"
    >
      會員註冊
    </RouterLink>
    <RouterLink
      class="flex-grow py-6 text-center text-primary-base"
      to="/signin"
      linkExactActiveClass="link-active"
    >
      會員登入
    </RouterLink>
  </div>
</template>
<style lang="scss" scoped>
.router-link-active {
  background-color: $primary-base;
  color: black;
}
.auth-border {
  border: 1px solid $primary-base;
}
</style>
