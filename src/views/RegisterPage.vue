<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { FormInstance, FormRules } from 'element-plus'
import RegisterForm from '@/components/register-page/RegisterForm.vue'
import AuthNavigation from '@/components/global/AuthNavigation.vue'
import ExternalAuthButton from '@/components/global/ExternalAuthButton.vue'
import TheSvg from '@/components/global/TheSvg.vue'
const authStore = useAuthStore()
const isLoading = ref<boolean>(false)
const router: Router = useRouter()
const ruleFormRef = ref<FormInstance>()
type RegisterInputType = {
  account: string
  password: string
  checkPassWord: string
  privacy: string[]
  newSletter: string[]
}
const registerInput = ref<RegisterInputType>({
  account: '',
  password: '',
  checkPassWord: '',
  privacy: [],
  newSletter: []
})
const authButtonData = [
  {
    buttonClass: 'border border-[#1161B4] text-[#1161B4]',
    buttonTitle: '使用Facebook註冊',
    icon: ['fab', 'facebook'],
    iconSize: 'xl',
    handleButton: () => {
      console.log('連結')
    }
  },
  {
    buttonClass: 'border border-[#286D33] text-[#286D33]',
    buttonTitle: '使用Line註冊',
    icon: ['fab', 'line'],
    iconSize: 'xl',
    handleButton: () => {
      console.log('連結')
    }
  }
]
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else {
    if (registerInput.value.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPassWord')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else if (value !== registerInput.value.password) {
    callback(new Error('密碼與原先不符合'))
  } else {
    callback()
  }
}

const registerRules = ref<FormRules>({
  account: [
    {
      type: 'email',
      required: true,
      message: '信箱格式不相符',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { min: 2, max: 30, message: '長度介於2到30之間', trigger: 'blur' },
    { required: true, message: '必填', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  checkPassWord: [
    { min: 6, max: 30, message: '長度介於2到30之間', trigger: 'blur' },
    { required: true, message: '必填', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ],
  privacy: [
    {
      type: 'array',
      required: true,
      message: '請詳細閱讀隱私條款',
      trigger: 'change'
    }
  ]
})
const handleRegister = async (formEl: FormInstance | undefined) => {
  ruleFormRef.value = formEl
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await fetchRegister(registerInput.value)
      // console.log('發送註冊API')
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
const fetchRegister = async (data: RegisterInputType) => {
  const { account, password } = data
  const fetchData = { account, password }
  try {
    isLoading.value = true
    const response: any = await authStore.register(fetchData)
    message(response.message, 'success')
    router.push('/signin')
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
        <!-- <RegisterForm /> -->
        <RegisterForm
          v-model:registerInput="registerInput"
          :rules="registerRules"
          :loading="isLoading"
          :handleRegister="handleRegister"
          ref="ruleFormRef"
        />
        <el-divider><p style="color: #9cb0c9">OR</p></el-divider>
        <ExternalAuthButton
          v-for="buttonOption in authButtonData"
          :key="buttonOption.buttonTitle"
          :buttonOption="buttonOption"
        />
      </div>
    </div>
    <div class="mb-6 mt-auto hidden md:flex">
      <TheSvg class="ms-auto" svgIcon="decorate" />
    </div>
  </main>
</template>
<style scoped></style>
