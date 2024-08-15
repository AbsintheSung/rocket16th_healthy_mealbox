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
  <el-form ref="ruleFormRef" :rules="registerRules" :model="loginInput">
    <el-form-item label="登入電子信箱帳號:" label-position="top" prop="userEmail">
      <el-input v-model="loginInput.userEmail" />
    </el-form-item>
    <div class="relative">
      <el-link type="danger" :underline="false" class="forget-link ms-2">忘記密碼?</el-link>
      <el-form-item label="密碼:" label-position="top" prop="userPassWord">
        <el-input v-model="loginInput.userPassWord" />
      </el-form-item>
    </div>
    <button class="w-full rounded-md bg-el-primary px-4 py-3 text-center font-bold">登入</button>
    <!-- <el-button
      style="padding: 12px"
      type="primary"
      class="siginBtn w-full"
      @click="handleRegister(ruleFormRef)"
    >
    </el-button> -->
  </el-form>
  <el-divider><p style="color: #9cb0c9">OR</p></el-divider>
  <div>
    <button
      class="relative my-5 flex w-full items-center justify-center rounded-md border px-4 py-3"
    >
      <span class="absolute left-4">Icon</span>
      <p>使用FB登入</p>
    </button>
    <button
      class="relative my-5 flex w-full items-center justify-center rounded-md border px-4 py-3"
    >
      <span class="absolute left-4">Icon</span>
      <p>使用Line登入</p>
    </button>
  </div>
  <el-divider></el-divider>
  <div>
    <p class="text-center">
      還沒帳號嗎?<RouterLink class="ps-1 text-red-700" to="/register">建立帳號</RouterLink>
    </p>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  margin-bottom: 16px;
}
.el-form-item {
  margin-bottom: 24px;
}
.forget-link {
  position: absolute;
  right: 0;
}
// .siginBtn {
//   padding: 16px !important;
// }
</style>
