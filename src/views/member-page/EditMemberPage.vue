<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { taiwanCity } from '@/content/city' //引入城市鄉鎮
import { useMemberStore } from '@/stores/member'
import type { FormInstance } from 'element-plus'
const memberStore = useMemberStore()
const isLoading = ref<Boolean>(false) //讀取狀態
const isWatchAreas = ref<Boolean>(false) //控制是否選取了城市區的select
const isEditInfo = ref<Boolean>(false) //編輯會員資料狀態
const isEditPassWord = ref<Boolean>(false) //編輯會員密碼狀態
const ruleMemberInfo = ref<FormInstance>() //綁定 會員的驗證資訊
const ruleFormRef = ref<FormInstance>() //綁定 密碼的驗證資訊
//從 會員store 取得 會員資料，並置入新的響應式
const memberInput = ref({
  ...memberStore.getMemberInfo
})

//響應式密碼資料
const updatePassWord = ref({
  oldPassWord: '',
  newPassWord: '',
  checkNewPassWord: ''
})

// 透過computed 計算城市列表
const cities = computed(() => taiwanCity.map((item) => item.name))
const areas = computed(() => {
  if (!memberInput.value.city) return []
  const selectedCity = taiwanCity.find((item) => item.name === memberInput.value.city)
  return selectedCity ? selectedCity.districts.map((item) => item.name) : []
})

//透過watch 監聽 areas值，當使用者重新選取城市，清除原先選擇的地區
watch(
  () => memberInput.value.city,
  () => {
    //因為加載時候，資料進來，可能導致 memberInput 被監聽使得地區資料被清空
    //設定一個狀態值，當使用者選取城市的select後，才可以去重製 memberInput.value.area值
    if (isWatchAreas.value) {
      memberInput.value.area = ''
    }
  }
)
//確保dom渲染後，可以獲取資料
watch(
  () => memberStore.getMemberInfo,
  (newValue) => {
    memberInput.value = { ...newValue }
  }
)
//alert訊息
const message = (mes: any, mesType: any): void => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}

//檢驗 2次密碼正確性的function
const verifyNewPassWord = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else if (value !== updatePassWord.value.newPassWord) {
    callback(new Error('密碼與原先不符合'))
  } else {
    callback()
  }
}

//驗證會員資訊規則
const memberInfoRule = ref({
  account: [
    {
      type: 'email',
      required: true,
      message: '信箱格式不相符',
      trigger: ['change']
    }
  ]
})
//驗證密碼資訊規則
const changePasswordRules = ref({
  oldPassWord: [
    // { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'change' },
    { required: true, message: '必填', trigger: 'change' }
  ],
  newPassWord: [
    // { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'change' },
    { required: true, message: '必填', trigger: 'change' }
  ],
  checkNewPassWord: [
    // { min: 6, max: 30, message: '長度介於6到30之間', trigger: 'change' },
    { required: true, message: '必填', trigger: 'change' },
    { validator: verifyNewPassWord, trigger: 'change' }
  ]
})

//驗證會員資料(信箱必填)，成功後發送api到後台
const handleMemberInfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isLoading.value = true
      try {
        const response = await memberStore.updateMemberInfo(memberInput.value)
        message(response.message, 'success')
        isEditInfo.value = false
      } catch (error: any) {
        message(error.message, 'error')
      } finally {
        isLoading.value = false
      }
    } else {
      // message('驗證失敗', 'error')
    }
  })
}

//驗證會員密碼(2次密碼須都正確且必填)，成功後發送api到後台
const handleChangePassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isLoading.value = true
      try {
        const newPassword = {
          password: updatePassWord.value.newPassWord
        }
        const response = await memberStore.updateMemberPassword(newPassword)
        formEl.resetFields()
        isEditPassWord.value = false
        message(response.message, 'success')
      } catch (error: any) {
        message(error.message, 'error')
      } finally {
        isLoading.value = false
      }
    } else {
      // console.log('驗證失敗', fields)
    }
  })
}
//選取 城市 select選單
const handleCitySelect = () => {
  isWatchAreas.value = true
}

//選取 地區 select選單
const handleAreaSelect = () => {
  isWatchAreas.value = false
}

// 開啟&關閉 會員編輯狀態
const handleEditInfo = (formEl: FormInstance | undefined) => {
  isEditInfo.value = !isEditInfo.value
  isWatchAreas.value = false //使用者點擊城市後，若沒有點擊地區 ，直接點擊取消 ，須解除鎖定才能還原地區的值
  memberInput.value = { ...memberStore.getMemberInfo } //用於使用者輸入完，點選取消還原預設
  if (!formEl) return
  formEl.clearValidate() //假設驗證失敗顯示時候，使用者點擊取消，清除驗證資訊
}

// 開啟&關閉 密碼編輯狀態
const handleEditPassWord = (formEl: FormInstance | undefined) => {
  isEditPassWord.value = !isEditPassWord.value
  if (!formEl) return
  formEl.resetFields() //密碼不需要紀錄 ，取消直接全部重置就好
}
</script>
<template>
  <h2
    class="mb-7 hidden rounded bg-primary-300 px-4 py-3 text-4xl font-normal shadow-base md:block md:w-fit"
  >
    我的個人帳戶
  </h2>
  <div class="rounded border">
    <h3 class="border-b p-5 text-3xl font-bold">個人資訊</h3>
    <div class="px-5 py-8">
      <el-form
        :model="memberInput"
        :label-position="'top'"
        v-loading="isLoading"
        ref="ruleMemberInfo"
        :rules="memberInfoRule"
      >
        <div class="flex flex-col gap-x-6 md:flex-row">
          <!-- 電子郵件 -->
          <el-form-item label="全名" class="el-flex-grow">
            <!-- <el-input v-model="memberData.name" type="text" /> -->
            <el-input v-model="memberInput.name" type="text" :disabled="!isEditInfo" />
          </el-form-item>
          <el-form-item label="電子郵件" class="el-flex-grow" prop="account">
            <!-- <el-input v-model="memberData.email" type="email" /> -->
            <el-input v-model="memberInput.account" type="email" :disabled="!isEditInfo" />
          </el-form-item>
        </div>
        <!-- 手機號碼 & 出生日期-->
        <div class="flex flex-col gap-x-6 md:flex-row md:items-center md:justify-between">
          <el-form-item label="手機號碼" class="el-flex-grow">
            <!-- <el-input v-model="memberData.phone" type="phone" /> -->
            <el-input v-model="memberInput.phoneNumber" type="phone" :disabled="!isEditInfo" />
          </el-form-item>
          <el-form-item label="出生日期" class="el-flex-grow">
            <!-- <el-date-picker v-model="memberData.both" type="date" placeholder="選擇日期" /> -->
            <el-date-picker
              v-model="memberInput.birthDate"
              type="date"
              placeholder="選擇日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :disabled="!isEditInfo"
            />
          </el-form-item>
        </div>
        <!-- 性別 -->
        <div>
          <el-form-item label="性別">
            <el-radio-group v-model="memberInput.gender" :disabled="!isEditInfo">
              <el-radio :value="0">男性</el-radio>
              <el-radio :value="1">女性</el-radio>
              <el-radio :value="2">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 地址 -->
        <div
          class="flex flex-col gap-x-6 gap-y-2 md:flex-row md:flex-wrap md:items-center md:justify-between"
        >
          <p class="w-full">地址</p>
          <div class="flex-grow">
            <el-select
              v-model="memberInput.city"
              placeholder="城市"
              @change="handleCitySelect"
              :disabled="!isEditInfo"
            >
              <el-option
                v-for="cityItem in cities"
                :key="cityItem"
                :label="cityItem"
                :value="cityItem"
              />
            </el-select>
          </div>
          <div class="flex-grow">
            <el-select
              v-model="memberInput.area"
              placeholder="地區"
              @change="handleAreaSelect"
              :disabled="!isEditInfo"
            >
              <el-option
                v-for="areaItem in areas"
                :key="areaItem"
                :label="areaItem"
                :value="areaItem"
              />
            </el-select>
          </div>
          <div class="w-full">
            <el-input v-model="memberInput.address" placeholder="地址" :disabled="!isEditInfo" />
          </div>
        </div>
        <div class="flex items-center justify-end py-5" v-if="!isEditInfo">
          <button
            class="rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 hover:border-black hover:bg-secondary-400 hover:text-black hover:shadow-base hover:transition md:py-3"
            @click.prevent="handleEditInfo(ruleMemberInfo)"
          >
            更改資訊
          </button>
        </div>
        <div class="flex items-center justify-end gap-x-4 py-5" v-else>
          <button
            class="rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 hover:border-black hover:bg-secondary-400 hover:text-black hover:shadow-base hover:transition md:py-3"
            @click.prevent="handleEditInfo(ruleMemberInfo)"
          >
            取消
          </button>
          <button
            class="rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 hover:border-black hover:bg-secondary-400 hover:text-black hover:shadow-base hover:transition md:py-3"
            @click.prevent="handleMemberInfo(ruleMemberInfo)"
          >
            儲存資料
          </button>
        </div>
      </el-form>
    </div>
  </div>

  <div class="mt-6 rounded border">
    <div class="border-b p-5">
      <h3 class="text-3xl font-bold">更新密碼</h3>
      <p class="pb-4 pt-2 font-normal">您目前的電子信箱為:{{ memberStore.getMemberAccount }}</p>
    </div>
    <div class="px-5 py-8">
      <el-form
        ref="ruleFormRef"
        :model="updatePassWord"
        :label-position="'top'"
        :rules="changePasswordRules"
        v-loading="isLoading"
      >
        <el-form-item label="當前密碼" prop="oldPassWord">
          <el-input
            v-model="updatePassWord.oldPassWord"
            type="password"
            :disabled="!isEditPassWord"
          />
        </el-form-item>
        <el-form-item label="輸入新密碼" prop="newPassWord">
          <el-input
            v-model="updatePassWord.newPassWord"
            type="password"
            :disabled="!isEditPassWord"
          />
        </el-form-item>
        <el-form-item label="確認新密碼" prop="checkNewPassWord">
          <el-input
            v-model="updatePassWord.checkNewPassWord"
            type="password"
            :disabled="!isEditPassWord"
          />
        </el-form-item>
        <div class="flex items-center justify-end py-5" v-if="!isEditPassWord">
          <button
            class="rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 hover:border-black hover:bg-secondary-400 hover:text-black hover:shadow-base hover:transition md:py-3"
            @click.prevent="handleEditPassWord(ruleFormRef)"
          >
            更改密碼
          </button>
        </div>
        <div class="flex items-center justify-end gap-x-4 py-5" v-else>
          <button
            class="rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 hover:border-black hover:bg-secondary-400 hover:text-black hover:shadow-base hover:transition md:py-3"
            @click.prevent="handleEditPassWord(ruleFormRef)"
          >
            取消
          </button>
          <button
            class="rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 hover:border-black hover:bg-secondary-400 hover:text-black hover:shadow-base hover:transition md:py-3"
            @click.prevent="handleChangePassword(ruleFormRef)"
          >
            確認
          </button>
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
