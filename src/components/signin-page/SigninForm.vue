<script lang="ts" setup>
import { ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const signinInput = defineModel('signinInput', { type: Object })
defineProps<{
  loading: boolean
  handleSignin: (formEl: FormInstance | undefined) => Promise<void>
}>()

//登入 驗證規則
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
</script>
<template>
  <el-form
    class="el-form-font-size"
    ref="ruleFormRef"
    :rules="signinRules"
    :model="signinInput"
    v-loading="loading"
  >
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
      class="w-full rounded-md bg-primary-300 px-4 py-3 text-center font-bold"
      @click.prevent="handleSignin(ruleFormRef)"
    >
      登入
    </button>
  </el-form>
</template>
<style lang="scss" scoped>
.el-form-font-size {
  font-size: 16px;
}
:deep(.el-form-item__label) {
  margin-bottom: 8px;
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
