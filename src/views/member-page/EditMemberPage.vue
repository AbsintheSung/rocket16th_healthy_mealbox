<script setup>
import { ref } from 'vue'
const memberData = ref({
  name: '',
  email: '',
  phone: '',
  both: '',
  gender: '',
  address: ''
})
const updatePassWord = ref({
  oldPassWord: '',
  newPassWord: '',
  checkNewPassWord: ''
})
const onSubmit = () => {
  console.log(memberData.value)
}
const onSubmitPassword = () => {
  console.log(updatePassWord.value)
}
</script>
<template>
  <h2 class="text-6xl font-normal">我的個人帳戶</h2>
  <div class="mt-16 rounded border">
    <h3 class="border-b p-5 text-3xl font-bold">個人資訊</h3>
    <div class="px-5 py-8">
      <el-form :model="memberData" :label-position="'top'">
        <div class="flex gap-x-6">
          <el-form-item label="全名" class="el-flex-grow">
            <el-input v-model="memberData.name" />
          </el-form-item>
          <el-form-item label="電子郵件" class="el-flex-grow">
            <el-input v-model="memberData.email" />
          </el-form-item>
        </div>
        <div class="flex items-center justify-between gap-x-6">
          <el-form-item label="手機號碼" class="el-flex-grow">
            <el-input v-model="memberData.phone" />
          </el-form-item>
          <el-form-item label="出生日期" class="el-flex-grow">
            <el-date-picker v-model="memberData.both" type="date" placeholder="選擇日期" />
          </el-form-item>
        </div>
        <el-form-item label="性別">
          <el-radio-group v-model="memberData.gender">
            <el-radio value="male">男性</el-radio>
            <el-radio value="female">女性</el-radio>
            <el-radio value="other">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="memberData.address" />
        </el-form-item>
        <div class="flex">
          <button class="ms-auto rounded bg-primary-base px-14 py-2">儲存資料</button>
        </div>
      </el-form>
    </div>
  </div>

  <div class="mt-6 rounded border">
    <div class="border-b p-5">
      <h3 class="text-3xl font-bold">更新密碼</h3>
      <p class="pb-4 ps-3 pt-2 font-normal">您目前的電子信箱為:{{ 'example@gmai.com' }}</p>
    </div>
    <div class="px-5 py-8">
      <el-form :model="updatePassWord" :label-position="'top'">
        <el-form-item label="當前密碼">
          <el-input v-model="updatePassWord.oldPassWord" />
        </el-form-item>
        <el-form-item label="輸入新密碼">
          <el-input v-model="updatePassWord.newPassWord" />
        </el-form-item>
        <el-form-item label="確認新密碼">
          <el-input v-model="updatePassWord.checkNewPassWord" />
        </el-form-item>
        <div class="flex">
          <button class="ms-auto rounded bg-primary-base px-14 py-2">更改密碼</button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.el-flex-grow {
  flex-grow: 1;
}
:deep(.el-date-editor) {
  width: 100%;
}
:deep(.el-input__prefix-inner) {
  display: none;
}
</style>
