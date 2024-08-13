<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const loginInput = ref({
  userEmail: '',
  userPassWord: ''
})

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
    { required: true, message: '必填', trigger: 'blur' }
  ]
})
const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('發送登入API')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <h2>會員登入</h2>
  <el-form ref="ruleFormRef" :rules="registerRules" :model="loginInput">
    <el-form-item label="登入電子信箱帳號:" label-position="top" prop="userEmail">
      <el-input v-model="loginInput.userEmail" />
    </el-form-item>
    <el-form-item label="密碼:" label-position="top" prop="userPassWord">
      <el-input v-model="loginInput.userPassWord" />
    </el-form-item>
    <el-button type="primary" @click="handleRegister(ruleFormRef)">測試</el-button>
  </el-form>
</template>
<style scoped></style>
