<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import axios from '@/utils/apis/axiosInterceptors'
import { useRouter, type Router } from 'vue-router'
import { signinApi } from '@/utils/apis/apiUrl'
const ruleFormRef = ref<FormInstance>()
const isLoading = ref<Boolean>(false)
type SigninInputType = {
  account: string
  password: string
}
const router: Router = useRouter()
const signinInput = ref<SigninInputType>({
  account: '',
  password: ''
})
const registerRules = ref({
  account: [
    {
      type: 'email',
      required: true,
      message: '信箱格式不相符',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'blur' },
    { required: true, message: '必填', trigger: 'blur' }
  ]
})
const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      fetchSignin(signinInput.value)
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
    const response = await axios.post(signinApi, data)
    if (response.status === 200) {
      document.cookie = `tokenCode=${response.data.jwtToken}`
      switch (response.data.code) {
        case 0:
          message(response.data.message, 'success')
          router.push('/')
        // console.log(response.data.message)
      }
    }
  } catch (error: any) {
    // console.log(error)
    if (error.response.status === 401) {
      message('登入失敗', 'error')
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <el-form ref="ruleFormRef" :rules="registerRules" :model="signinInput">
    <el-form-item label="登入電子信箱帳號:" label-position="top" prop="account">
      <el-input v-model="signinInput.account" />
    </el-form-item>
    <div class="relative">
      <el-link type="danger" :underline="false" class="forget-link ms-2">忘記密碼?</el-link>
      <el-form-item label="密碼:" label-position="top" prop="password">
        <el-input v-model="signinInput.password" type="password" />
      </el-form-item>
    </div>
    <button
      class="w-full rounded-md bg-primary-base px-4 py-3 text-center font-bold"
      @click.prevent="handleRegister(ruleFormRef)"
    >
      登入
    </button>
  </el-form>
</template>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  margin-bottom: 16px;
}
:deep(.el-input__wrapper) {
  padding: 10px 12px;
}
.el-form-item {
  margin-bottom: 24px;
}
.forget-link {
  position: absolute;
  right: 0;
}
</style>
