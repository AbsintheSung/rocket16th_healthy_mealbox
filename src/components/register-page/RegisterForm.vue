<script lang="ts" setup>
import { ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const registerInput = defineModel('registerInput', { type: Object })
defineProps<{
  loading: boolean
  handleRegister: (formEl: FormInstance | undefined) => Promise<void>
}>()

//驗證 密碼
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else {
    if (registerInput.value.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value?.validateField('checkPassWord')
    }
    callback()
  }
}

//驗證 2次密碼
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else if (value !== registerInput.value.password) {
    callback(new Error('密碼與原先不符合'))
  } else {
    callback()
  }
}

//其餘驗證規則
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
    { min: 2, max: 30, message: '長度介於2到30之間', trigger: ['blur', 'change'] },
    { required: true, message: '必填', trigger: ['blur', 'change'] },
    { validator: validatePass, trigger: ['blur', 'change'] }
  ],
  checkPassWord: [
    { min: 2, max: 30, message: '長度介於2到30之間', trigger: ['blur', 'change'] },
    { required: true, message: '必填', trigger: ['blur', 'change'] },
    { validator: validatePass2, trigger: ['blur', 'change'] }
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
</script>
<template>
  <el-form
    class="el-form-font-size"
    ref="ruleFormRef"
    :rules="registerRules"
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
