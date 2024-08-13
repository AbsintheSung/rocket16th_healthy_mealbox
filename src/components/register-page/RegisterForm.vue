<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const registerInput = ref({
  userEmail: '',
  userPassWord: '',
  checkPassWord: '',
  privacy: []
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else {
    if (registerInput.value.userPassWord !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPassWord')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else if (value !== registerInput.value.userPassWord) {
    callback(new Error('密碼與原先不符合'))
  } else {
    callback()
  }
}

const registerRules = ref({
  userEmail: [
    {
      type: 'email',
      required: true,
      message: '信箱格式不相符',
      trigger: ['blur', 'change']
    }
  ],
  userPassWord: [
    { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'blur' },
    { required: true, message: '必填', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  checkPassWord: [
    { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'blur' },
    { required: true, message: '不能為空', trigger: 'blur' },
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
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('發送註冊API')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <h2>會員註冊</h2>
  <el-form ref="ruleFormRef" :rules="registerRules" :model="registerInput">
    <el-form-item label="登入電子信箱帳號:" label-position="top" prop="userEmail">
      <el-input v-model="registerInput.userEmail" />
    </el-form-item>
    <el-form-item label="密碼:" label-position="top" prop="userPassWord">
      <el-input v-model="registerInput.userPassWord" />
    </el-form-item>
    <el-form-item label="請再輸入註冊密碼:" label-position="top" prop="checkPassWord">
      <el-input v-model="registerInput.checkPassWord" />
    </el-form-item>
    <el-form-item prop="privacy">
      <el-checkbox-group v-model="registerInput.privacy">
        <el-checkbox value="agree_privacy" name="privacy"> 已詳細閱讀 </el-checkbox>
        <!-- <span class="text-el-danger">隱私條款</span> -->
      </el-checkbox-group>
      <el-link type="success" :underline="false" class="ms-2">隱私條款</el-link>
    </el-form-item>

    <el-button type="primary" @click="handleRegister(ruleFormRef)">測試</el-button>
  </el-form>
</template>
<style scoped></style>
