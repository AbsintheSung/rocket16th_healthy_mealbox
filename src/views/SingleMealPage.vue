<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const nutritionItems = [
  { name: '卡路里', value: '300kcal' },
  { name: '蛋白質', value: '20g' },
  { name: '脂肪', value: '12g' },
  { name: '碳水化合物', value: '300kcal' },
  { name: '糖', value: '15g' },
  { name: '纖維', value: '3.1g' }
]
</script>
<template>
  <main>
    <section class="container flex gap-x-6">
      <div class="w-5/12">
        <img src="https://picsum.photos/536/536?random=1" />
        <div class="pt-8">swiper輪播套件</div>
      </div>

      <div class="w-7/12">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">吃了就會很健康的麥當勞</h2>
          <button class="">
            <FontAwesomeIcon :icon="['far', 'circle-xmark']" size="xl" />
          </button>
        </div>
        <ul class="flex flex-col gap-y-4">
          <li class="lg:w-1/3">
            <h3>【原物料】</h3>
            <p>
              一種特殊的漢堡牛排，上面溢出了肉汁， 最後是濃郁的番茄醬，散發著鹹味蔬菜的香味。
              它具有濃郁的味道和柔和的牛至香味
            </p>
          </li>
          <li class="lg:w-2/5">
            <h3>【菜單說明】</h3>
            <p>豪華漢堡牛排配濃郁的番茄醬和乳酪、捲心菜配芥末醬、花椰菜 再搭配脆脆的薯條！完美</p>
          </li>
          <li class="lg:w-1/2">
            <h3>【過敏原】</h3>
            <p>
              漢堡牛排（日本製造）、烤西葫蘆、醂花、西蘭花、番茄泥、
              捲心菜、加工乳酪、黃甜椒、番茄醬、胡蘿蔔、白葡萄酒、植物油、
              番茄醬、半固體調味料、磨碎的大蒜、雞肉提取物、豬肉提取物、
              穀物醋、味醂、醬油、糖、阿拉伯芥末、清湯粉、鹽、香料、
              蔬菜提取物、芥末/增稠劑（改性澱粉、增稠多糖）、膠水（改性澱粉）
              、纖維素、改性澱粉、乳化劑、穩定劑（多糖增稠劑）、pH調節劑、
              調味料（氨基酸等）、薑黃色素、香料提取物、（包括小麥、雞蛋、
              牛奶成分、大豆、牛肉、豬肉、雞肉、蘋果、明膠）
            </p>
          </li>
          <li class="flex text-secondary-500 lg:w-2/5">
            <p>*</p>
            <p>{{ '營養資訊標籤的數值會根據原食材的購買狀況而變化 請檢查您收到的產品內容' }}</p>
          </li>
        </ul>
      </div>
    </section>
    <section class="container">
      <ul class="flex items-center justify-center py-6">
        <li
          v-for="item in nutritionItems"
          :key="item.name"
          class="flex flex-grow flex-col items-center justify-center border-black first:border-l-0 last:border-r-0 [&:not(:first-child)]:border-l [&:not(:last-child)]:border-r"
        >
          <h3>{{ item.name }}</h3>
          <p>{{ item.value }}</p>
        </li>
      </ul>
      <!-- <ul class="flex items-center justify-center">
        <li class="flex flex-grow flex-col items-center justify-center">
          <h3>卡路里</h3>
          <p>300kcal</p>
        </li>
        <li class="flex flex-grow flex-col items-center justify-center">
          <h3>蛋白質</h3>
          <p>20g</p>
        </li>
        <li class="flex flex-grow flex-col items-center justify-center">
          <h3>脂肪</h3>
          <p>12g</p>
        </li>
        <li class="flex flex-grow flex-col items-center justify-center">
          <h3>碳水化合物</h3>
          <p>300kcal</p>
        </li>
        <li class="flex flex-grow flex-col items-center justify-center">
          <h3>糖</h3>
          <p>15g</p>
        </li>
        <li class="flex flex-grow flex-col items-center justify-center">
          <h3>纖維</h3>
          <p>3.1g</p>
        </li>
      </ul> -->
    </section>
    <section class="bg-primary-50">
      <div class="container">
        <div class="flex items-center justify-center gap-x-6 py-10">
          <button class="w-1/4 rounded border-2 border-black py-3" @click="drawer = true">
            刪除
          </button>
          <button class="w-1/4 rounded border-2 border-black bg-secondary-base py-3">加入</button>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped></style>
