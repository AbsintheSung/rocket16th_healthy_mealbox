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
  <div>
    <h3>個人資訊</h3>
    <el-form :model="memberData" :label-position="'top'">
      <div class="flex gap-x-6">
        <el-form-item label="全名" class="flex-grow">
          <el-input v-model="memberData.name" />
        </el-form-item>
        <el-form-item label="電子郵件" class="flex-grow">
          <el-input v-model="memberData.email" />
        </el-form-item>
      </div>
      <div class="flex items-center justify-between gap-x-6">
        <el-form-item label="手機號碼" class="flex-grow">
          <el-input v-model="memberData.phone" />
        </el-form-item>
        <el-form-item label="出生日期" class="flex-grow">
          <el-date-picker
            v-model="memberData.both"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
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
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">儲存資料</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <h3>更新密碼</h3>
    <p>您目前的電子信箱為:{{ 'example@gmai.com' }}</p>
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
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmitPassword">更換密碼</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped></style>
