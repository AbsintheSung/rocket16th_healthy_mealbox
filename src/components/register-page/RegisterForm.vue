<script lang="ts" setup>
import { ref } from 'vue'
import type { FormRules,FormInstance } from 'element-plus'
// import { useRouter, type Router } from 'vue-router'
// import { useAuthStore } from '@/stores/auth'
// const authStore = useAuthStore()
const ruleFormRef = ref<FormInstance>()
// const isLoading = ref<Boolean>(false)
// const router: Router = useRouter()
// type RegisterInputType = {
//   account: string
//   password: string
//   checkPassWord: string
//   privacy: string[]
//   newSletter: string[]
// }
// const registerInput = ref<RegisterInputType>({
//   account: '',
//   password: '',
//   checkPassWord: '',
//   privacy: [],
//   newSletter: []
// })
// const validatePass = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('請輸入密碼'))
//   } else {
//     if (registerInput.value.password !== '') {
//       if (!ruleFormRef.value) return
//       ruleFormRef.value.validateField('checkPassWord')
//     }
//     callback()
//   }
// }
// const validatePass2 = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('請輸入密碼'))
//   } else if (value !== registerInput.value.password) {
//     callback(new Error('密碼與原先不符合'))
//   } else {
//     callback()
//   }
// }

// const registerRules = ref({
//   account: [
//     {
//       type: 'email',
//       required: true,
//       message: '信箱格式不相符',
//       trigger: ['blur', 'change']
//     }
//   ],
//   password: [
//     { min: 2, max: 30, message: '長度介於6到30之間', trigger: 'blur' },
//     { required: true, message: '必填', trigger: 'blur' },
//     { validator: validatePass, trigger: 'blur' }
//   ],
//   checkPassWord: [
//     { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'blur' },
//     { required: true, message: '不能為空', trigger: 'blur' },
//     { validator: validatePass2, trigger: 'blur' }
//   ],
//   privacy: [
//     {
//       type: 'array',
//       required: true,
//       message: '請詳細閱讀隱私條款',
//       trigger: 'change'
//     }
//   ]
// })
// const handleRegister = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   await formEl.validate(async (valid, fields) => {
//     if (valid) {
//       await fetchRegister(registerInput.value)
//       // console.log('發送註冊API')
//     } else {
//       // console.log('error submit!', fields)
//     }
//   })
// }
// const message = (mes: any, mesType: any): void => {
//   //@ts-ignore
//   ElMessage({
//     message: mes,
//     type: mesType,
//     duration: 1500
//   })
// }
// const fetchRegister = async (data: RegisterInputType) => {
//   const { account, password } = data
//   const fetchData = { account, password }
//   try {
//     isLoading.value = true
//     const response: any = await authStore.register(fetchData)
//     message(response.message, 'success')
//     router.push('/signin')
//   } catch (error: any) {
//     message(error.message, 'error')
//   } finally {
//     isLoading.value = false
//   }
// }
const registerInput = defineModel('registerInput', { type: Object })
const props = defineProps<{
  rules: FormRules
  loading: boolean
  handleRegister: (formEl: FormInstance | undefined) => Promise<void>
  // formRef: FormInstance | undefined
}>()
</script>
<template>
  <el-form
    class="el-form-font-size"
    ref="ruleFormRef"
    :rules="rules"
    :model="registerInput"
    v-loading="loading"
  >
    <el-form-item label="登入電子信箱帳號:" label-position="top" prop="account">
      <el-input v-model="registerInput.account" />
    </el-form-item>
    <el-form-item label="密碼:" label-position="top" prop="password">
      <el-input v-model="registerInput.password" type="password" />
    </el-form-item>
    <el-form-item label="請再輸入註冊密碼:" label-position="top" prop="checkPassWord">
      <el-input v-model="registerInput.checkPassWord" type="password" />
    </el-form-item>
    <el-form-item prop="privacy">
      <el-checkbox-group v-model="registerInput.privacy">
        <el-checkbox value="agree_privacy" name="privacy"> 已詳細閱讀 </el-checkbox>
      </el-checkbox-group>
      <el-link type="success" :underline="false">隱私條款</el-link>
    </el-form-item>
    <el-form-item prop="newSletter">
      <el-checkbox-group v-model="registerInput.newSletter">
        <el-checkbox :value="true" name="newSletter">訂閱電子報</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <button
      class="w-full rounded-md bg-primary-300 px-4 py-3 text-center font-bold"
      @click.prevent="handleRegister(ruleFormRef)"
    >
      註冊
    </button>
  </el-form>
</template>
<style lang="scss" scoped>
.el-form-font-size {
  font-size: 16px;
}
:deep(.el-form-item__label) {
  font-size: 16px;
  margin-bottom: 8px;
}
:deep(.el-form-item:nth-child(4)) {
  margin-bottom: 12px;
}
:deep(.el-input__wrapper) {
  padding: 10px 12px;
}
.el-link {
  margin-left: 4px;
}
.el-form-item {
  margin-bottom: 24px;
}
</style>
