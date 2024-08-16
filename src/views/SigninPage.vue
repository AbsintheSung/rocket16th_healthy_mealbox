<script lang="ts" setup>
import SigninForm from '@/components/signin-page/SigninForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
import ExternalAuthButton from '@/components/global/ExternalAuthButton.vue'
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
  <main class="container">
    <div class="mx-auto mt-20 w-full md:w-1/2">
      <AuthNavigation class="mb-12" />
      <SigninForm />
      <ExternalAuthButton
        v-for="buttonOption in authButtonData"
        :key="buttonOption.buttonTitle"
        :buttonOption="buttonOption"
      />
    </div>
  </main>
</template>
<style scoped></style>
