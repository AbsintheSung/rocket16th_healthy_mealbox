<script lang="ts" setup>
import SigninForm from '@/components/signin-page/SigninForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
import ExternalAuthButton from '@/components/global/ExternalAuthButton.vue'
import TheSvg from '@/components/global/TheSvg.vue'
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
import { ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import { useRouter, type Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const ruleFormRef = ref<FormInstance>()
const isLoading = ref<boolean>(false)
type SigninInputType = {
  account: string
  password: string
}
const router: Router = useRouter()
const signinInput = ref<SigninInputType>({
  account: '',
  password: ''
})
const signinRules = ref<FormRules>({
  account: [
    {
      type: 'email',
      required: true,
      message: '信箱格式不相符',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { min: 2, max: 30, message: '長度介於2到30之間', trigger: ['blur', 'change'] },
    { required: true, message: '必填', trigger: ['blur', 'change'] }
  ]
})
const handleSignin = async (formEl: FormInstance | undefined) => {
  ruleFormRef.value = formEl
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
const message = (mes: any, mesType: any): void => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
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
          :rules="signinRules"
          :loading="isLoading"
          :handleSignin="handleSignin"
          ref="ruleFormRef"
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
