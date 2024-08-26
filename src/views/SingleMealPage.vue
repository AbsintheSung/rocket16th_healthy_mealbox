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
    <section class="container py-4">
      <div class="grid grid-cols-4 gap-6 sm:grid-cols-12">
        <div class="col-span-3 col-start-1 -me-3 sm:col-span-3 sm:me-0">
          <img src="https://picsum.photos/536/536?random=1" />
          <div class="hidden pt-8 sm:block">走馬燈</div>
        </div>
        <div class="col-span-1 col-start-4 flex items-start sm:hidden">
          <button class="ms-auto">
            <FontAwesomeIcon :icon="['far', 'circle-xmark']" size="xl" />
          </button>
        </div>
        <div class="col-span-full col-start-1 sm:col-span-9 sm:col-start-4">
          <div class="flex items-center">
            <h2
              class="mb-6 w-fit rounded bg-primary-300 p-4 text-2xl shadow-base md:mb-4 md:px-7 md:py-6"
            >
              雞胸蛋白沙拉碗
            </h2>
            <button class="ms-auto hidden sm:block">
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
            <li>
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
            <li class="flex text-secondary-500">
              <p>*</p>
              <p>{{ '營養資訊標籤的數值會根據原食材的購買狀況而變化 請檢查您收到的產品內容' }}</p>
            </li>
          </ul>
        </div>
        <div class="col-span-full col-start-1">
          <ul class="flex w-full flex-wrap items-center py-6 md:flex-nowrap">
            <li
              v-for="(item, index) in nutritionItems"
              :key="item.name"
              class="flex w-1/3 flex-col items-center justify-center gap-y-4 border-black py-2 md:py-0"
              :class="[
                index < 3 ? 'border-b md:border-b-0' : 'border-t md:border-t-0',
                index % 3 === 0 ? 'md:border-l' : 'border-l',
                (index + 1) % 3 === 0 ? 'border-r-0' : 'border-r',
                'md:border-x',
                { 'md:first:border-l-0': index === 0 },
                { 'md:last:border-r-0': index === nutritionItems.length - 1 }
              ]"
            >
              <h3>{{ item.name }}</h3>
              <p>{{ item.value }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped></style>
