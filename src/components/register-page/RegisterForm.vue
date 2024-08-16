<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const registerInput = ref({
  userEmail: '',
  userPassWord: '',
  checkPassWord: '',
  privacy: [],
  newSletter: []
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
  console.log(registerInput.value)
}
</script>
<template>
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
      </el-checkbox-group>
      <el-link type="success" :underline="false" class="ms-1">隱私條款</el-link>
    </el-form-item>
    <el-form-item prop="newSletter">
      <el-checkbox-group v-model="registerInput.newSletter">
        <el-checkbox :value="true" name="newSletter">訂閱電子報</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <button
      class="w-full rounded-md bg-el-primary px-4 py-3 text-center font-bold"
      @click.prevent="handleRegister(ruleFormRef)"
    >
      註冊
    </button>
    <!-- <el-button type="primary" @click="handleRegister(ruleFormRef)">測試</el-button> -->
  </el-form>
  <el-divider><p style="color: #9cb0c9">OR</p></el-divider>
  <div>
    <button
      class="relative my-5 flex w-full items-center justify-center rounded-md border border-[#358AF9] px-4 py-3 text-[#358AF9]"
    >
      <FontAwesomeIcon class="absolute left-4" :icon="['fab', 'facebook']" size="xl" />
      <p>使用Facebook註冊</p>
    </button>
    <button
      class="relative my-5 flex w-full items-center justify-center rounded-md border border-[#58C067] px-4 py-3 text-[#58C067]"
    >
      <FontAwesomeIcon class="absolute left-4" :icon="['fab', 'line']" size="xl" />
      <p>使用Line註冊</p>
    </button>
  </div>
</template>
<style scoped lang="scss">
:deep(.el-form-item) {
  margin-bottom: 16px;
}
:deep(.el-form-item:nth-child(4)) {
  margin-bottom: 12px;
}

.el-form-item {
  margin-bottom: 24px;
}
</style>
