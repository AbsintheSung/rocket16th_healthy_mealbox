<script setup>
//非常醜- 找時間優化
import { onMounted, ref, computed, watch, reactive } from 'vue'
import axiosInstance from '@/utils/api/axios'
import html2canvas from 'html2canvas'
import StarchDishes from '@/components/customized-meal-page/StarchDishes.vue'
import MainDishes from '@/components/customized-meal-page/MainDishes.vue'
import SideDishes from '@/components/customized-meal-page/SideDishes.vue'
const urlName = import.meta.env.VITE_APP_API_NAME

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
const selectedCase = ref('case1')
const getSelectCase = computed(() => selectedCase.value)
const currentCase = computed(() => caseOption[selectedCase.value])

const getDishesApi = `/${urlName}/dishes`
// const minMainMealDishes = ref(1)
// const maxMainMealDishes = ref(2) //主食選取最大值
// const minSideDishes = ref(1)
// const maxSideDishes = ref(3) //配菜選取最大值
// const minStarchDishes = ref(1)
// const maxStarchDishes = ref(1) //澱粉選取最大值
// const mainMealList = ref([]) //選取主食存放陣列
// const sideDishesList = ref([]) //選取配菜存放陣列
// const starchDishesList = ref([]) //選取澱粉存放陣列

const mainMealDishes = ref([
  {
    id: 6,
    dishesType: 'mainMeal', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '嫩煎雞腿',
    price: 20,
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/雞肉.png', // 菜色去背後的圖片
    // 營養素組成
    composition: {
      calories: 470, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 55, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 100 // 庫存
  },
  {
    id: 7,
    dishesType: 'mainMeal', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '嫩煎雞腿2',
    price: 20,
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/雞肉.png', // 菜色去背後的圖片
    // 營養素組成
    composition: {
      calories: 470, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 55, // 碳水化合物
      fiber: 6, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 100 // 庫存
  }
])
const sideDishes = ref([
  {
    id: 4,
    dishesType: 'sideDishes', // 配菜 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '青花椰',
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/青花耶.png', // 菜色去背後的圖片
    price: 30,
    // 營養素組成
    composition: {
      calories: 200, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 15, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 200 // 庫存
  },
  {
    id: 5,
    dishesType: 'sideDishes', // 配菜 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '小黃瓜',
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/小黃瓜.png', // 菜色去背後的圖片
    price: 30,
    // 營養素組成
    composition: {
      calories: 200, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 15, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 200 // 庫存
  }
])
const starchDishes = ref([
  {
    id: 2,
    dishesType: 'starch', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '半碗米飯',
    price: 20,
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/白飯.png', // 菜色去背後的圖片
    // 營養素組成
    composition: {
      calories: 470, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 55, // 碳水化合物
      fiber: 5, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 100 // 庫存
  },
  {
    id: 3,
    dishesType: 'starch', // 澱粉 // 菜色類型: mainMeal 主餐、 sideDishes 配菜、starch 澱粉
    name: '一碗米飯',
    price: 20,
    grams: 100, // 公克
    img: '/src/assets/image/餐盤測試/白飯.png', // 菜色去背後的圖片
    // 營養素組成
    composition: {
      calories: 470, // 卡路里
      protein: 25, // 蛋白質
      adipose: 5, // 脂肪
      carbohydrate: 55, // 碳水化合物
      fiber: 6, // 纖維
      sodium: 0 // 鈉含量
    },
    allergens: '蛋、麩質', // 過敏原
    quantity: 100 // 庫存
  }
])
//渲染列表用
const getMainMealDishes = computed(() => {
  return mainMealDishes.value.map((item) => ({
    ...item,
    composition: { ...item.composition }
  }))
})
const getSideDishes = computed(() => {
  return sideDishes.value.map((item) => ({
    ...item,
    composition: { ...item.composition }
  }))
})
const getstarchDishes = computed(() => {
  return starchDishes.value.map((item) => ({
    ...item,
    composition: { ...item.composition }
  }))
})

// //顯示圖片操作
// const hasImages = computed(() => mainMealListImg.value.length > 0) //判斷是否有圖片
// const mainMealListImg = computed(() =>
//   mainMealList.value.filter((dish) => dish && dish.img).map((dish) => dish.img)
// ) //取出選取的主食圖片

// const hasImages2 = computed(() => sideDishesListImg.value.length > 0) //判斷是否有圖片
// const sideDishesListImg = computed(() =>
//   sideDishesList.value.filter((dish) => dish && dish.img).map((dish) => dish.img)
// ) //取出選取的主食圖片
const hasImages = computed(() => {
  // 合併選取的 case 中的所有 mainMealList 陣列
  const allMainMeals = Object.values(currentCase.value.mainMealList).flat()
  return allMainMeals.some((dish) => dish && dish.img)
})

const mainMealListImg = computed(() => {
  // 合併選取的 case 中的所有 mainMealList 陣列，並取出 img 屬性
  const allMainMeals = Object.values(currentCase.value.mainMealList).flat()
  return allMainMeals.filter((dish) => dish && dish.img).map((dish) => dish.img)
})

const hasImages2 = computed(() => {
  // 合併選取的 case 中的所有 sideDishesList 陣列
  const allSideDishes = Object.values(currentCase.value.sideDishesList).flat()
  return allSideDishes.some((dish) => dish && dish.img)
})

const sideDishesListImg = computed(() => {
  // 合併選取的 case 中的所有 sideDishesList 陣列，並取出 img 屬性
  const allSideDishes = Object.values(currentCase.value.sideDishesList).flat()
  return allSideDishes.filter((dish) => dish && dish.img).map((dish) => dish.img)
})

const hasImages3 = computed(() => {
  // 合併選取的 case 中的所有 sideDishesList 陣列
  const allStarchDishes = Object.values(currentCase.value.starchDishesList).flat()
  return allStarchDishes.some((dish) => dish && dish.img)
})

const starchDishesListImg = computed(() => {
  // 合併選取的 case 中的所有 sideDishesList 陣列，並取出 img 屬性
  const allStarchDishes = Object.values(currentCase.value.starchDishesList).flat()
  return allStarchDishes.filter((dish) => dish && dish.img).map((dish) => dish.img)
})

const getDishes = async () => {
  try {
    const response = await axiosInstance.get(getDishesApi)
    // mainMealDishes.value = response.data.data.filter((dish) => dish.dishesType === 'mainMeal')
    // sideDishes.value = response.data.data.filter((dish) => dish.dishesType === 'sideDishes')
    // starchDishes.value = response.data.data.filter((dish) => dish.dishesType === 'starch')
    console.log(response.data.data)
  } catch (error) {
    console.log(error)
  }
}

const activeNames = ref(['1', '2', '3'])
const handleChange = (val) => {
  // console.log(val)
}
const value = ref('case1')
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
const changeSelect = (val) => {
  if (val === 'case1') {
    selectedCase.value = 'case1'
  } else if (val === 'case2') {
    selectedCase.value = 'case2'
  } else if (val === 'case3') {
    selectedCase.value = 'case3'
  } else if (val === 'case4') {
    selectedCase.value = 'case4'
  } else if (val === 'case5') {
    selectedCase.value = 'case5'
  }
  resetCaseOption()
}
const nutrientNameMap = {
  calories: '卡路里',
  protein: '蛋白質',
  adipose: '脂肪',
  carbohydrate: '碳水化合物',
  fiber: '纖維',
  sodium: '鈉含量'
}
const test = (val) => {
  console.log(val)
}
onMounted(async () => {
  await getDishes()
  console.log(mainMealDishes.value)
  console.log(sideDishes.value)
  console.log(starchDishes.value)
})
const plateComposition = ref(null)
const generatedImage = ref('')
const generateImage = async () => {
  if (plateComposition.value) {
    try {
      const canvas = await html2canvas(plateComposition.value)
      generatedImage.value = canvas.toDataURL('image/png')
      const a = base64ToBlob(generatedImage.value)
      const b = await blobToBase64(a)
      console.log(b)
      console.log('圖片生成成功')
    } catch (error) {
      console.error('生成圖片時出錯：', error)
    }
  }
}

// Base64 轉 Blob
const base64ToBlob = (base64) => {
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

// Blob 轉 Base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

//下載圖片
const downloadImage = () => {
  if (generatedImage.value) {
    const link = document.createElement('a')
    link.href = generatedImage.value
    link.download = 'plate-composition.png' // 設置下載的文件名
    link.click()
  } else {
    console.error('未找到生成的圖片')
  }
}

// 定義所有營養成分的預設值
const defaultComposition = {
  calories: 0,
  protein: 0,
  adipose: 0,
  carbohydrate: 0,
  fiber: 0,
  sodium: 0
}
//根據選取的資料，做營養成分相加
// const totalComposition = computed(() => {
//   const allDishes = [
//     ...mainMealList.value,
//     ...sideDishesList.value,
//     ...starchDishesList.value
//   ].filter((dish) => dish && dish.composition)
//   return allDishes.reduce(
//     (total, dish) => {
//       Object.keys(dish.composition).forEach((key) => {
//         if (typeof total[key] === 'undefined') {
//           total[key] = 0
//         }
//         total[key] += dish.composition[key]
//       })
//       return total
//     },
//     { ...defaultComposition }
//   )
// })
const totalComposition = computed(() => {
  // 將三個菜品列表中的所有菜品合併成一個列表
  const allDishes = [
    ...Object.values(currentCase.value.mainMealList).flat(),
    ...Object.values(currentCase.value.sideDishesList).flat(),
    ...Object.values(currentCase.value.starchDishesList).flat()
  ].filter((dish) => dish.composition) //將有 composition 的篩選出來

  // 對所有菜品的營養成分進行累加
  return allDishes.reduce(
    (total, dish) => {
      Object.keys(dish.composition).forEach((key) => {
        if (typeof total[key] === 'undefined') {
          total[key] = 0
        }
        total[key] += dish.composition[key]
      })
      return total
    },
    { ...defaultComposition }
  )
})

//將上面轉成中文，並以 [ {name:卡路里,value:450kcal},... ]方式輸出
const totalCompositionChinese = computed(() => {
  return Object.entries(totalComposition.value).map(([key, value]) => ({
    name: nutrientNameMap[key] || key,
    value: `${value}${key === 'calories' ? 'kcal' : 'g'}`
  }))
})

//以下組件測試
const handleUpdateStarchDisheSelected = (index, ischecked, checkItem) => {
  currentCase.value.starchDishesList[index] = checkItem
  // console.log(index, ischecked, checkItem)
  // if (ischecked) {
  //   starchDishesList.value[index] = checkItem
  //   // starchDishesList.value.push(checkItem)
  // } else {
  //   starchDishesList.value[index] = null
  //   // starchDishesList.value.pop()
  // }
}
const handleupdateMealSelected = (index, ischecked, checkItem) => {
  // console.log(index, ischecked, checkItem)
  currentCase.value.mainMealList[index] = checkItem
  // caseOption[getSelectCase.value].mainMealList[index] = checkItem

  // console.log(caseOption.case2.mainMealList)
  // console.log(caseOption.case1.mainMealList)
  // if (ischecked) {
  //   mainMealList.value[index] = checkItem
  // } else {
  //   mainMealList.value[index] = null
  // }
}
const handleupdateSideDishesSelected = (index, ischecked, checkItem) => {
  // console.log(index, ischecked, checkItem)
  currentCase.value.sideDishesList[index] = checkItem
  // caseOption[getSelectCase.value].sideDishesList[index] = checkItem
}
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
const handleData = () => {
  console.log(currentCase.value)
}
</script>
<template>
  <main>
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
          v-model="value"
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
          <div
            v-if="['case1', 'case2', 'case4'].includes(getSelectCase)"
            class="test w-full"
            ref="plateComposition"
          >
            <div class="flex">
              <div class="relative">
                <img src="../assets/image/餐盤測試/左.png" />
                <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div v-if="sideDishesListImg.length >= 1" class="flex">
                    <img :src="sideDishesListImg[0]" alt="Main meal" />
                  </div>
                </div>
              </div>
              <div class="relative">
                <img src="../assets/image/餐盤測試/中.png" />
                <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div v-if="sideDishesListImg.length >= 2" class="flex">
                    <img :src="sideDishesListImg[1]" alt="Main meal" />
                  </div>
                </div>
              </div>
              <div class="relative">
                <img src="../assets/image/餐盤測試/右.png" />
                <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div v-if="sideDishesListImg.length >= 3" class="flex">
                    <img :src="sideDishesListImg[2]" alt="Main meal" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="relative">
                <img src="../assets/image/餐盤測試/底餐盤-2.png" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div class="flex items-center justify-center">
                    <img
                      :src="item"
                      alt="Main meal"
                      class="w-1/2"
                      v-for="item in mainMealListImg"
                      :key="item"
                    />
                    <img
                      :src="item"
                      alt="starchDishes-img"
                      class="w-1/2"
                      v-for="item in starchDishesListImg"
                      :key="item"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 另一個餐盤模組 -->
          <div v-else class="test w-full" ref="plateComposition">
            <div class="flex">
              <div class="relative">
                <img src="../assets/image/餐盤測試2/左上.png" />
                <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div v-if="sideDishesListImg.length >= 1" class="flex">
                    <img :src="sideDishesListImg[0]" alt="Main meal" />
                  </div>
                </div>
              </div>
              <div class="relative">
                <img src="../assets/image/餐盤測試2/中上.png" />
                <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div v-if="sideDishesListImg.length >= 2" class="flex">
                    <img :src="sideDishesListImg[1]" alt="Main meal" />
                  </div>
                </div>
              </div>
              <div class="relative">
                <img src="../assets/image/餐盤測試2/右上.png" />
                <div class="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div v-if="sideDishesListImg.length >= 3" class="flex">
                    <img :src="sideDishesListImg[2]" alt="Main meal" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="relative">
                <img src="../assets/image/餐盤測試2/左下.png" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div class="flex items-center justify-center">
                    <img
                      :src="item"
                      alt="Main meal"
                      class="w-2/3"
                      v-for="item in mainMealListImg"
                      :key="item"
                    />
                    <img
                      :src="item"
                      alt="starchDishes-img"
                      class="w-2/3"
                      v-for="item in starchDishesListImg"
                      :key="item"
                    />
                  </div>
                </div>
              </div>
              <div class="relative">
                <img src="../assets/image/餐盤測試2/右下.png" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    v-if="sideDishesListImg.length >= 4"
                    class="flex items-center justify-center"
                  >
                    <img :src="sideDishesListImg[3]" alt="Main meal" class="w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img :src="generatedImage" />
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <el-collapse v-model="activeNames" @change="handleChange">
            <StarchDishes
              v-for="(item, index) in currentCase.starchDishesList"
              :starchDishesList="item"
              :key="item"
              @updateStarchDisheSelected="
                (ischecked, checkItem) =>
                  handleUpdateStarchDisheSelected(index, ischecked, checkItem)
              "
            />
            <MainDishes
              v-for="(item, index) in currentCase.mainMealList"
              :mainMealList="item"
              :key="item"
              @updateMainSelected="
                (ischecked, checkItem) => handleupdateMealSelected(index, ischecked, checkItem)
              "
            />

            <SideDishes
              v-for="(item, index) in currentCase.sideDishesList"
              :sideDishesList="item"
              :key="item"
              @updateSideDishesSelected="
                (ischecked, checkItem) =>
                  handleupdateSideDishesSelected(index, ischecked, checkItem)
              "
            />

            <!-- <el-collapse-item
              :title="`澱粉-${starchDishesList.length}/${maxStarchDishes}`"
              name="1"
            >
              <el-checkbox-group
                v-model="starchDishesList"
                :min="0"
                :max="maxStarchDishes"
                class="flex flex-col"
              >
                <el-checkbox
                  v-for="item in getstarchDishes"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-checkbox-group>
            </el-collapse-item> -->

            <!-- <el-collapse-item :title="`主食-${mainMealList.length}/${maxMainMealDishes}`" name="2">
              <el-checkbox-group
                v-model="mainMealList"
                :min="0"
                :max="maxMainMealDishes"
                @change="test"
                class="flex flex-col"
              >
                <el-checkbox
                  v-for="item in getMainMealDishes"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-checkbox-group>
            </el-collapse-item> -->

            <!-- <el-collapse-item :title="`配菜-${sideDishesList.length}/${maxSideDishes}`" name="3">
              <el-checkbox-group
                v-model="sideDishesList"
                :min="0"
                :max="maxSideDishes"
                class="flex flex-col"
              >
                <el-checkbox
                  v-for="item in getSideDishes"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-checkbox-group>
            </el-collapse-item> -->
          </el-collapse>
        </div>
      </div>
      <div class="container">
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-full col-start-1 lg:col-span-8">
            <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
              <li
                v-for="(item, index) in totalCompositionChinese"
                :key="item.name"
                class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
                :class="[
                  index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
                  index % 3 === 0 ? 'md:border-l' : 'border-l',
                  (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
                  'md:border-x',
                  { 'md:first:border-l-0': index === 0 },
                  { 'md:last:border-r-0': index === totalCompositionChinese.length - 1 }
                ]"
              >
                <h3>{{ item.name }}</h3>
                <p>{{ item.value }}</p>
              </li>
            </ul>
          </div>
          <div class="col-span-full col-start-1 lg:col-span-4 lg:col-start-9">
            <div class="grid h-full grid-cols-4 items-center gap-x-6">
              <button
                class="col-span-2 col-start-1 rounded bg-[#DCDCDC] py-4 hover:cursor-pointer"
                @click="handleData"
              >
                重新編輯
              </button>
              <button
                class="col-span-2 rounded bg-secondary-400 py-4 hover:cursor-pointer hover:shadow-base"
                @click="generateImage"
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
.test {
  background-image: url('../assets/image/餐盤測試/底圖.jpg');
}
</style>
