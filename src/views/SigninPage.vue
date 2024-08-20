<script lang="ts" setup>
import SigninForm from '@/components/signin-page/SigninForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
import ExternalAuthButton from '@/components/global/ExternalAuthButton.vue'
import TheSvg from '@/components/global/TheSvg.vue'
const authButtonData = [
  {
    buttonClass: 'border border-[#358AF9] text-[#358AF9]',
    buttonTitle: '使用Facebook登入',
    icon: ['fab', 'facebook'],
    iconSize: 'xl',
    handleButton: () => {
      console.log('連結')
    }
  },
  {
    buttonClass: 'border border-[#58C067] text-[#58C067]',
    buttonTitle: '使用Line登入',
    icon: ['fab', 'line'],
    iconSize: 'xl',
    handleButton: () => {
      console.log('連結')
    }
  }
]
</script>
<template>
  <main class="container flex flex-col">
    <div class="grid grid-cols-12 gap-6 py-20 md:-mx-3">
      <div class="col-span-12 md:col-start-4 md:col-end-10">
        <AuthNavigation class="mb-12" />
        <SigninForm />
        <el-divider><p style="color: #9cb0c9">OR</p></el-divider>
        <ExternalAuthButton
          v-for="buttonOption in authButtonData"
          :key="buttonOption.buttonTitle"
          :buttonOption="buttonOption"
        />
        <el-divider></el-divider>
        <div>
          <p class="text-center">
            還沒帳號嗎?<RouterLink class="ps-1 text-red-700" to="/register">建立帳號</RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="mb-6 mt-auto hidden md:flex">
      <TheSvg class="ms-auto" svgIcon="decorate" />
    </div>
  </main>
</template>
<style scoped></style>
