<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { SigninInputType } from '@/types/type'
import type { FormRules, FormInstance } from 'element-plus'
import SigninForm from '@/components/signin-page/SigninForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
import ExternalAuthButton from '@/components/global/ExternalAuthButton.vue'
import TheSvg from '@/components/global/TheSvg.vue'
const authStore = useAuthStore()
const isLoading = ref<boolean>(false)
const router: Router = useRouter()
const signinInput = ref<SigninInputType>({
  account: '',
  password: ''
})
const authButtonData = [
  {
    buttonClass: 'border border-[#1161B4] text-[#1161B4]',
    buttonTitle: '使用Facebook登入',
    icon: ['fab', 'facebook'],
    iconSize: 'xl',
    handleButton: () => {
      console.log('連結')
    }
  },
  {
    buttonClass: 'border border-[#286D33] text-[#286D33]',
    buttonTitle: '使用Line登入',
    icon: ['fab', 'line'],
    iconSize: 'xl',
    handleButton: () => {
      console.log('連結')
    }
  }
]
const message = (mes: any, mesType: any): void => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
const handleSignin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await fetchSignin(signinInput.value)
      // console.log('發送登入API')
    } else {
      // console.log('error submit!', fields)
    }
  })
}
const fetchSignin = async (data: SigninInputType) => {
  try {
    isLoading.value = true
    const response: any = await authStore.signin(data)
    message(response.message, 'success')
    router.push('/')
  } catch (error: any) {
    message(error.message, 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <main class="container flex flex-col">
    <div class="grid grid-cols-12 gap-6 py-20">
      <div class="col-span-12 md:col-start-4 md:col-end-10">
        <AuthNavigation class="mb-12" />
        <!-- <SigninForm /> -->
        <SigninForm
          v-model:signinInput="signinInput"
          :loading="isLoading"
          :handleSignin="handleSignin"
        />
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
