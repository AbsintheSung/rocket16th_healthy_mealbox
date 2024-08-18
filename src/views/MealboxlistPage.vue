<script setup></script>
<template>
  <main class="container">
    <section class="py-7">
      <h2 class="text-center text-[32px] font-bold">從列表中選擇您最愛的餐點</h2>
      <div class="mt-6">
        <p class="text-center">營養均衡、健康的配菜，隨手可得</p>
        <p class="text-center">從我們的精選單中選擇您最喜歡的餐點</p>
      </div>
    </section>
    <section>
      <div class="flex border-t border-black py-8 text-2xl">
        <RouterLink
          class="meal-link flex-grow text-center"
          to="/mealboxlist/mealgeneral"
          linkExactActiveClass="link-active"
        >
          一般餐盒
        </RouterLink>
        <RouterLink
          class="meal-link flex-grow text-center"
          to="/mealboxlist/mealcustomized"
          linkExactActiveClass="link-active"
        >
          自定義餐盒
        </RouterLink>
      </div>
      <RouterView></RouterView>
    </section>
  </main>
</template>
<style lang="scss" scoped>
.router-link-active {
  color: $primary-base;
}
.meal-link:nth-child(1) {
  border-right: 1px solid black;
}
</style>
