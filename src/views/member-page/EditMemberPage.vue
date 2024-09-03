<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { taiwanCity } from '@/content/city' //引入城市鄉鎮
import { useMemberStore } from '@/stores/member'
const memberStore = useMemberStore()
const isLoading = ref<Boolean>(false)
// const cityName = ref('') //v-model綁定所選取得值
// const cityArea = ref('') //v-model綁定所選取得值
// const memberData = ref({
//   name: '',
//   email: '',
//   phone: '',
//   both: '',
//   gender: '',
//   address: ''
// })
console.log(memberStore.getMemberInfo)
const memberInput = ref({
  ...memberStore.getMemberInfo
})
const updatePassWord = ref({
  oldPassWord: '',
  newPassWord: '',
  checkNewPassWord: ''
})
const onSubmit = () => {
  // console.log(memberData.value)
}
const onSubmitPassword = () => {
  // console.log(updatePassWord.value)
}

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
    memberInput.value.area = ''
  }
)

const handleMemberInfo = async () => {
  isLoading.value = true
  console.log(memberInput.value.birthDate)
  try {
    const response = await memberStore.updateMemberInfo(memberInput.value)
    message(response.message, 'success')
    // console.log(message)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
const message = (mes: any, mesType: any): void => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}

onMounted(() => {
  memberInput.value = { ...memberStore.getMemberInfo }
})
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
      <el-form :model="memberInput" :label-position="'top'" v-loading="isLoading">
        <div class="flex flex-col gap-x-6 md:flex-row">
          <!-- 電子郵件 -->
          <el-form-item label="全名" class="el-flex-grow">
            <!-- <el-input v-model="memberData.name" type="text" /> -->
            <el-input v-model="memberInput.name" type="text" />
          </el-form-item>
          <el-form-item label="電子郵件" class="el-flex-grow">
            <!-- <el-input v-model="memberData.email" type="email" /> -->
            <el-input v-model="memberInput.account" type="email" />
          </el-form-item>
        </div>
        <!-- 手機號碼 & 出生日期-->
        <div class="flex flex-col gap-x-6 md:flex-row md:items-center md:justify-between">
          <el-form-item label="手機號碼" class="el-flex-grow">
            <!-- <el-input v-model="memberData.phone" type="phone" /> -->
            <el-input v-model="memberInput.phoneNumber" type="phone" />
          </el-form-item>
          <el-form-item label="出生日期" class="el-flex-grow">
            <!-- <el-date-picker v-model="memberData.both" type="date" placeholder="選擇日期" /> -->
            <el-date-picker
              v-model="memberInput.birthDate"
              type="date"
              placeholder="選擇日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </div>
        <!-- 性別 -->
        <div>
          <el-form-item label="性別">
            <el-radio-group v-model="memberInput.gender">
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
            <el-select v-model="memberInput.city" placeholder="城市">
              <el-option
                v-for="cityItem in cities"
                :key="cityItem"
                :label="cityItem"
                :value="cityItem"
              />
            </el-select>
          </div>
          <div class="flex-grow">
            <el-select v-model="memberInput.area" placeholder="地區">
              <el-option
                v-for="areaItem in areas"
                :key="areaItem"
                :label="areaItem"
                :value="areaItem"
              />
            </el-select>
          </div>
          <div class="w-full">
            <el-input v-model="memberInput.address" placeholder="地址" />
          </div>
        </div>
        <div class="flex py-5">
          <button
            class="ms-auto rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 md:py-3"
            @click.prevent="handleMemberInfo"
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
      <p class="pb-4 pt-2 font-normal">您目前的電子信箱為:{{ 'example@gmai.com' }}</p>
    </div>
    <div class="px-5 py-8">
      <el-form :model="updatePassWord" :label-position="'top'">
        <el-form-item label="當前密碼">
          <el-input v-model="updatePassWord.oldPassWord" type="password" />
        </el-form-item>
        <el-form-item label="輸入新密碼">
          <el-input v-model="updatePassWord.newPassWord" type="password" />
        </el-form-item>
        <el-form-item label="確認新密碼">
          <el-input v-model="updatePassWord.checkNewPassWord" type="password" />
        </el-form-item>
        <div class="flex">
          <button
            class="ms-auto rounded border border-secondary-900 px-14 py-2 font-bold text-secondary-900 md:py-3"
          >
            更改密碼
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
