<script setup>
//非常醜- 找時間優化
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMakeCustomMealStore } from '@/stores/makecustommeal'
import html2canvas from 'html2canvas'
import TheCustomMenu from '@/components/customized-meal-page/TheCustomMenu.vue'
import CustomDialog from '@/components/customized-meal-page/CustomDialog.vue'
import TheIngredient from '@/components/global/TheIngredient.vue'
import TheDinnerPlate from '@/components/customized-meal-page/TheDinnerPlate.vue'
import TheDinnerPlate2 from '@/components/customized-meal-page/TheDinnerPlate2.vue'
const makeCustomMealStore = useMakeCustomMealStore()
const router = useRouter()
const dialogShow = ref(false) //控制彈窗開關
const activeNames = ref([]) // 手風琴選取到的，會放入陣列
const selectValue = ref('case1') //目前選擇的類型 case1 => 1澱粉、1主食、3配菜
const customName = ref('') // 使用者輸入 的 餐盒名稱
const customContent = ref('') // 使用者輸入 的 餐宏內容
const options = [
  {
    value: 'case1',
    label: '1澱粉、1主食、3配菜'
  },
  {
    value: 'case2',
    label: '1澱粉、2主食、2配菜'
  },
  {
    value: 'case3',
    label: '1澱粉、0主食、4配菜'
  },
  {
    value: 'case4',
    label: '0澱粉、2主食、3配菜'
  },
  {
    value: 'case5',
    label: '0澱粉、1主食、4配菜'
  }
]
//傳遞給 後端的 資料格式
const setCustomData = ref({
  name: '', // 使用者自定義餐盒名稱
  template: '', // 選擇的title
  starch: [], // 澱粉的 ID 列表
  mainMeal: [], // 主餐的 ID 列表
  sideDishes: [], // 配菜的 ID 列表
  remark: '', // 備註
  imgSrc: '' // 自定義圖片的路徑
})
const caseOption = reactive({
  case1: {
    title: '1澱粉、1主食、3配菜',
    starchDishesList: {
      0: []
    },
    mainMealList: {
      0: []
    },
    sideDishesList: {
      0: [],
      1: [],
      2: []
    }
  },
  case2: {
    title: '1澱粉、2主食、2配菜',
    starchDishesList: {
      0: []
    },
    mainMealList: {
      0: [],
      1: []
    },
    sideDishesList: {
      0: [],
      1: []
    }
  },
  case3: {
    title: '1澱粉、0主食、4配菜',
    starchDishesList: {
      0: []
    },
    mainMealList: {},
    sideDishesList: {
      0: [],
      1: [],
      2: [],
      3: []
    }
  },
  case4: {
    title: '0澱粉、2主食、3配菜',
    starchDishesList: {},
    mainMealList: {
      0: [],
      1: []
    },
    sideDishesList: {
      0: [],
      1: [],
      2: []
    }
  },
  case5: {
    title: '0澱粉、1主食、4配菜',
    starchDishesList: {},
    mainMealList: {
      0: []
    },
    sideDishesList: {
      0: [],
      1: [],
      2: [],
      3: []
    }
  }
})

const getSelectCase = computed(() => selectValue.value)
const getCaseOption = computed(() => caseOption[selectValue.value])
//將 caseOpen 的 各個陣列合成同一個陣列
const allDishList = computed(() => {
  return [
    ...Object.values(getCaseOption.value.mainMealList).flat(),
    ...Object.values(getCaseOption.value.sideDishesList).flat(),
    ...Object.values(getCaseOption.value.starchDishesList).flat()
  ]
})
// 前台 計算價格總和
const totalPrice = computed(() => {
  return allDishList.value.reduce((sum, dish) => {
    return sum + dish.price
  }, 0)
})

//選取的資料 取出圖片路徑
const mainMealListImg = computed(() => {
  // 合併選取的 case 中的所有 mainMealList 陣列，並取出 img 屬性
  const allMainMeals = Object.values(getCaseOption.value.mainMealList).flat()
  return allMainMeals.filter((dish) => dish && dish.img).map((dish) => dish.img)
})
//選取的資料 取出圖片路徑
const sideDishesListImg = computed(() => {
  // 合併選取的 case 中的所有 sideDishesList 陣列，並取出 img 屬性
  const allSideDishes = Object.values(getCaseOption.value.sideDishesList).flat()
  return allSideDishes.filter((dish) => dish && dish.img).map((dish) => dish.img)
})
//選取的資料 取出圖片路徑
const starchDishesListImg = computed(() => {
  // 合併選取的 case 中的所有 sideDishesList 陣列，並取出 img 屬性
  const allStarchDishes = Object.values(getCaseOption.value.starchDishesList).flat()
  return allStarchDishes.filter((dish) => dish && dish.img).map((dish) => dish.img)
})

//下拉選單，選完後重製設定
const changeSelect = () => {
  // selectedCase.value = val
  resetCaseOption()
}

onMounted(async () => {
  // await fetchDishesMenu()
  await makeCustomMealStore.fetchCustomMenu()
})
const plateComposition = ref(null)
const generatedImage = ref('')
const generateImage = async () => {
  if (plateComposition.value) {
    try {
      const canvas = await html2canvas(plateComposition.value)
      generatedImage.value = canvas.toDataURL('image/png')
      // const a = base64ToBlob(generatedImage.value)
      // const b = await blobToBase64(a)
      // console.log(b)
      console.log('圖片生成成功')
    } catch (error) {
      console.error('生成圖片時出錯：', error)
    }
  }
}

// Base64 轉 Blob
const base64ToBlob = (base64, contentType = 'image/png') => {
  const byteString = atob(base64.split(',')[1])
  const byteArray = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([byteArray], { type: contentType })
}

// // Blob 轉 Base64
// const blobToBase64 = (blob) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result)
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   })
// }

// //下載圖片
// const downloadImage = () => {
//   if (generatedImage.value) {
//     const link = document.createElement('a')
//     link.href = generatedImage.value
//     link.download = 'plate-composition.png' // 設置下載的文件名
//     link.click()
//   } else {
//     console.error('未找到生成的圖片')
//   }
// }

// 定義重置函數，用於清空所有列表
const resetCaseOption = () => {
  Object.values(caseOption).forEach((caseData) => {
    // 清空 starchDishesList
    Object.keys(caseData.starchDishesList).forEach((key) => {
      caseData.starchDishesList[key] = []
    })

    // 清空 mainMealList
    Object.keys(caseData.mainMealList).forEach((key) => {
      caseData.mainMealList[key] = []
    })

    // 清空 sideDishesList
    Object.keys(caseData.sideDishesList).forEach((key) => {
      caseData.sideDishesList[key] = []
    })
  })
}
const handleData = async () => {
  await generateImage()
  dialogShow.value = true
  console.log(getCaseOption.value)
}
const handleEdit = () => {
  console.log(getCaseOption.value)
}
const handleCloseDialog = () => {
  dialogShow.value = false
}

//發送api
const test = async () => {
  const blob = base64ToBlob(generatedImage.value, 'image/png')
  const formData = new FormData()
  formData.append('image', blob, 'canvas_image.png')
  // console.log(formData)
  try {
    // const imgurl = await makeCustomMealStore.updateCustomImg(formData)
    const imgurl = '/Images/Uploads/CustomizeBoxes/29a75a80-7b1b-47df-bba2-ed6d48630d72.png' //測試用 之後要刪除
    collectMealBoxData(imgurl)
    const response = await makeCustomMealStore.featCustomMealData(setCustomData.value)
    message(response.message, 'success')
    dialogShow.value = false
    router.push('/mealboxlist/mealcustomized')
  } catch (error) {
    message(error.message, 'error')
    // console.log(error)
  }
  // collectMealBoxData()
  // console.log(setCustomData.value)
}

//整合資料後 傳遞給後端
const collectMealBoxData = (imgdata) => {
  setCustomData.value.name = customName.value
  setCustomData.value.remark = customContent.value
  setCustomData.value.template = getCaseOption.value.title
  setCustomData.value.imgSrc = imgdata
  setCustomData.value.starch = Object.values(getCaseOption.value.starchDishesList)
    .flat()
    .map((dish) => dish.id)
  setCustomData.value.mainMeal = Object.values(getCaseOption.value.mainMealList)
    .flat()
    .map((dish) => dish.id)
  setCustomData.value.sideDishes = Object.values(getCaseOption.value.sideDishesList)
    .flat()
    .map((dish) => dish.id)
}
const message = (mes, mesType) => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
</script>
<template>
  <main>
    <CustomDialog
      :dialogShow="dialogShow"
      :allDishList="allDishList"
      :currentCase="getCaseOption"
      :totalPrice="totalPrice"
      :generatedImage="generatedImage"
      v-model:customName="customName"
      v-model:customContent="customContent"
      :fetchData="test"
      @closeDialog="handleCloseDialog"
    />
    <div class="bg-primary-400">
      <div class="container relative flex items-center justify-center">
        <button class="absolute left-0 top-1/2 block -translate-y-1/2 p-2 md:hidden">
          <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
        </button>
        <h2 class="py-2 text-center text-2xl font-bold text-white md:text-4xl">自定義餐盒</h2>
      </div>
    </div>
    <div class="bg-none md:bg-custom-main">
      <div class="py-6 md:py-28">
        <h3 class="mb-3 text-center text-2xl font-bold text-black md:text-3xl md:text-white">
          從列表中選擇您最愛的自製餐點
        </h3>
        <p class="text-center text-black md:text-white">選擇符合您需求的內容，根據喜好調整餐點</p>
        <p class="text-center text-black md:text-white">一起來組合你的自定義餐盒吧！</p>
      </div>
    </div>
    <div class="container py-4 md:py-14">
      <div class="flex w-full items-center justify-between py-3 md:w-2/3">
        <el-select
          v-model="selectValue"
          placeholder="Select"
          size="small"
          class="el-select-width"
          @change="changeSelect"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <RouterLink class="hidden md:flex" to="/">返回上一頁</RouterLink>
      </div>
      <div class="flex flex-col gap-x-6 md:flex-row">
        <div class="w-full md:w-2/3">
          <div v-if="['case1', 'case2', 'case4'].includes(getSelectCase)" class="meal-bg w-full">
            <div class="flex w-fit flex-col" ref="plateComposition">
              <TheDinnerPlate
                :sideDishesListImg="sideDishesListImg"
                :mainMealListImg="mainMealListImg"
                :starchDishesListImg="starchDishesListImg"
              />
            </div>
          </div>
          <!-- 另一個餐盤模組 -->
          <div v-else class="meal-bg w-full">
            <div class="flex w-fit flex-col" ref="plateComposition">
              <TheDinnerPlate2
                :sideDishesListImg="sideDishesListImg"
                :mainMealListImg="mainMealListImg"
                :starchDishesListImg="starchDishesListImg"
              />
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <el-collapse v-model="activeNames">
            <TheCustomMenu
              v-for="(item, index) in getCaseOption.starchDishesList"
              :key="item"
              :menuList="makeCustomMealStore.getstarchDishes"
              :accordionCode="`1${index}`"
              title="澱粉"
              v-model:selectMenu="caseOption[getSelectCase].starchDishesList[index]"
            />
            <TheCustomMenu
              v-for="(item, index) in getCaseOption.mainMealList"
              :key="item"
              :menuList="makeCustomMealStore.getMainMealDishes"
              :accordionCode="`2${index}`"
              title="主食"
              v-model:selectMenu="caseOption[getSelectCase].mainMealList[index]"
            />
            <TheCustomMenu
              v-for="(item, index) in getCaseOption.sideDishesList"
              :key="item"
              :menuList="makeCustomMealStore.getSideDishes"
              :accordionCode="`3${index}`"
              title="配菜"
              v-model:selectMenu="caseOption[getSelectCase].sideDishesList[index]"
            />
          </el-collapse>
        </div>
      </div>
      <div class="container">
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-full col-start-1 lg:col-span-8">
            <!-- <TheIngredient :ingredientData="totalCompositionChinese" /> -->
            <TheIngredient :allDishList="allDishList" />
          </div>
          <div class="col-span-full col-start-1 lg:col-span-4 lg:col-start-9">
            <div class="grid h-full grid-cols-4 items-center gap-x-6">
              <button
                class="col-span-2 col-start-1 rounded bg-[#DCDCDC] py-4 hover:cursor-pointer"
                @click="handleEdit"
              >
                重新編輯
              </button>
              <button
                class="col-span-2 rounded bg-secondary-400 py-4 hover:cursor-pointer hover:shadow-base"
                @click="handleData"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped lang="scss">
.el-select-width {
  width: 100%;
  @media (min-width: 576px) {
    width: 40%;
  }
}
.meal-bg {
  background-image: url('../assets/image/餐盤測試/底圖.jpg');
}
</style>
