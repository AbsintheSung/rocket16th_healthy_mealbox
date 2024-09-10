<script setup lang="ts">
import TheSvg from '@/components/global/TheSvg.vue'
import TheNewsTicker from '@/components/global/TheNewsTicker.vue'
import ThePlaidAdorn from '@/components/global/ThePlaidAdorn.vue'
import TheContact from '@/components/global/TheContact.vue'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const message = (mes: any, mesType: any): void => {
  //@ts-ignore
  ElMessage({
    message: mes,
    type: mesType,
    duration: 1500
  })
}
const handleSelectPlan = async (planNumber: number) => {
  try {
    await cartStore.fetchChangeSelectPlan(planNumber)
  } catch (error: any) {
    message(error.message, 'error')
  }
}
// import { watch, computed } from 'vue'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Mousewheel, Pagination } from 'swiper/modules'
// import { useWindowSize } from '@vueuse/core'
// const { width } = useWindowSize()
// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/mousewheel'
// const swiperOptions = computed(() => ({
//   modules: [Mousewheel, Pagination],
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true, // 使分頁指示器可點擊
//     dynamicBullets: true // 開啟動態分頁
//   },
//   slidesPerView: 1, // 滾動時候 只切換一張
//   mousewheel: true, // 設置滾輪滾動
//   loop: width.value >= 576, //大於 裝置576px 開啟loop ，否則會有警告(雖然警告不影響運作)
//   spaceBetween: 15, // 滑動速度
//   breakpoints: {
//     // 當視窗寬度大於等於 1024px
//     992: {
//       slidesPerView: 4
//     },
//     // 當視窗寬度介於 768px 到 1023px 之間
//     768: {
//       slidesPerView: 3
//     },
//     576: {
//       slidesPerView: 2
//     }
//   }
// }))
</script>

<template>
  <main>
    <!-- 首頁大圖 -->
    <section class="bg-home-main bg-cover bg-center bg-no-repeat">
      <div class="container flex flex-col items-center justify-between sm:flex-row">
        <div class="w-full py-48 sm:w-1/2">
          <TheSvg svgIcon="main-logo" class="h-[90px]" svgClassStyle="w-full md:w-fit" />
          <p class="text-2xl text-white">
            無論您的生活多麼忙碌都能吃得營養均衡，輕鬆快速訂購，<br />
            盒食提供您日常飲食更多元的選擇，健康美味輕鬆上桌!
          </p>
        </div>
        <div class="flex w-full justify-end self-end sm:w-1/2">
          <TheSvg svgIcon="rhombus-full" class="h-[50px] w-[45px] md:h-[100px] md:w-[80px]" />
          <TheSvg svgIcon="rhombus" class="h-[50px] w-[45px] md:h-[100px] md:w-[80px]" />
          <TheSvg svgIcon="rhombus-full" class="h-[50px] w-[45px] md:h-[100px] md:w-[80px]" />
          <TheSvg svgIcon="rhombus" class="h-[50px] w-[45px] md:h-[100px] md:w-[80px]" />
        </div>
      </div>
    </section>

    <!-- 首頁裝飾區塊-1 -->
    <section>
      <TheNewsTicker />
      <ThePlaidAdorn v-for="item in 2" :key="item" />
    </section>

    <!-- 首頁-營養師懶人包組合 -->
    <section class="bg-background-style-1">
      <div class="container py-12">
        <p class="text-center font-bold">選擇困難嗎？</p>
        <div class="relative flex items-center justify-center py-4">
          <h2 class="text-4xl font-bold text-primary-700">金牌營養師推薦套餐</h2>
          <RouterLink
            to="/"
            class="absolute bottom-0 right-0 hidden items-center text-secondary-700 md:flex"
          >
            查看所有餐點<fontAwesomeIcon class="ms-2" :icon="['fas', 'chevron-right']" />
          </RouterLink>
        </div>
        <!-- <div class="hidden sm:block">
          <swiper v-bind="swiperOptions" class="mt-16">
            <swiper-slide v-for="cardItem in 10" :key="cardItem">
              <div class="flex flex-col">
                <div>
                  <img
                    class="w-full object-fill"
                    alt="營養師懶人包圖"
                    src="../assets//image/mealpic.png"
                  />
                </div>
                <div class="flex flex-col gap-y-1">
                  <p>14餐</p>
                  <p>増肌簡單吃</p>
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="self-end rounded border border-secondary-900 px-3 py-1 text-secondary-900"
                  >
                    加入購物車
                  </button>
                  <RouterLink to="/" class="text-primary-700">
                    <p>查看此方案</p>
                    <p>詳細資訊</p>
                  </RouterLink>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination home-swiper-page"></div>
          </swiper>
        </div> -->
        <ul class="grid grid-cols-4 gap-6 py-6 md:grid-cols-12 md:py-16">
          <li
            class="col-span-2 rounded border-2 border-black md:col-span-3"
            v-for="item in 4"
            :key="item"
          >
            <div class="flex flex-col gap-y-2">
              <div>
                <img
                  class="w-full object-fill"
                  alt="營養師懶人包圖"
                  src="../assets//image/mealpic.png"
                />
              </div>
              <div class="px-3 font-bold">
                <h3>簡單吃！</h3>
                <p>忙碌生活的救世主</p>
              </div>
              <div class="flex items-center justify-between p-3">
                <button
                  class="rounded border border-primary-700 px-2 py-1 text-[10px] text-primary-700"
                >
                  加入購物車
                </button>
                <RouterLink to="/" class="flex items-center gap-x-1 text-[10px] text-secondary-700">
                  <p>查看更多</p>
                  <FontAwesomeIcon :icon="['fas', 'arrow-right']" size="sm" />
                </RouterLink>
              </div>
            </div>
          </li>
        </ul>
        <div class="flex items-center justify-end py-14 md:hidden">
          <RouterLink
            to="/"
            class="rounded border-2 border-secondary-900 px-12 py-2 text-secondary-900"
          >
            查看更多方案
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 首頁-網站介紹-1 -->
    <section class="bg-background-style-2">
      <!-- 桌機板 -->
      <div class="container hidden py-14 md:block">
        <h2 class="py-8 text-center text-5xl font-bold text-primary-700">
          「想要健康，就要吃得均衡。」
        </h2>
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-3 flex flex-col">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-full">
                <img src="../assets/image/測試沙拉1.png" alt="網站介紹食物圖片" />
              </div>
              <div class="col-span-full flex items-center gap-x-5">
                <p class="flex h-full flex-col justify-around text-2xl">
                  <span>澱</span><span>粉</span>
                </p>
                <h3 class="text-7xl font-medium">15g</h3>
              </div>
              <div class="col-span-full">
                <p class="text-base font-medium">
                  澱粉是推動卡路里的重要能源<br />
                  不是極端的澱粉限制,而是適當的攝取量，<br />
                  選擇盒食，可以讓您精確的澱粉控制<br />
                  在澱粉控制中，從食材調配的苦惱中解放出來，度過悠閒的用餐時光
                </p>
              </div>
            </div>
            <div class="mt-auto flex">
              <TheSvg svgIcon="rhombus-full" class="h-[80px] w-[60px]" />
              <TheSvg svgIcon="rhombus" class="h-[80px] w-[60px]" />
              <TheSvg svgIcon="rhombus-full" class="h-[80px] w-[60px]" />
            </div>
          </div>
          <div class="col-span-6">
            <div class="relative grid grid-cols-6 gap-6">
              <div class="absolute hidden lg:flex">
                <TheSvg svgIcon="rhombus-full" class="h-[80px] w-[60px]" />
                <TheSvg svgIcon="rhombus" class="h-[80px] w-[60px]" />
                <TheSvg svgIcon="rhombus-full" class="h-[80px] w-[60px]" />
              </div>
              <div class="col-span-5 col-start-2">
                <img src="../assets/image/測試沙拉2.png" />
              </div>
              <div class="col-span-5 col-start-2 flex items-center gap-x-5">
                <p class="flex h-full flex-col justify-around text-2xl">
                  <span>熱</span><span>量</span>
                </p>
                <h3 class="text-7xl font-medium">350Kcal</h3>
              </div>
              <div class="col-span-5 col-start-2">
                <p class="font-medium">
                  以平均成年人一天的適當熱量爲基準,由營養管理師監督所有食譜<br />
                  不要盲目地減少卡路里，重要的是要攝取多種食材，營養均衡的飲食<br />
                  用正確的知識面對卡路里對於維持健康、愉快、美味的健康生活非常重要！
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-3">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-2 col-start-2">
                <img src="../assets/image/測試沙拉3.png" />
              </div>
              <div class="col-span-full flex items-center gap-x-5">
                <p class="flex h-full flex-col justify-around text-2xl">
                  <span>蛋</span><span>白</span><span>質</span>
                </p>
                <h3 class="text-7xl font-medium">20g</h3>
              </div>
              <div class="col-span-full">
                <p class="text-base font-medium">
                  人體組成除了水分和脂質之外，<br />
                  大部分都是蛋白質構成的<br />
                  以平均成人攝取1餐推薦的蛋白質爲標準,<br />
                  肉、海鮮、雞蛋、豆類等食材爲蛋白質來源
                </p>
              </div>
              <div class="col-span-full">
                <img src="../assets/image/測試義大利麵.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- rwd版 -->
      <div class="container py-12 md:hidden">
        <h2 class="py-3 text-center text-2xl font-bold text-primary-700">
          「想要健康，就要吃得均衡。」
        </h2>
        <div class="grid grid-cols-4 gap-x-6">
          <div class="col-span-full">
            <div class="flex justify-between">
              <div class="flex items-end">
                <img src="../assets//image/測試沙拉1.png" alt="沙拉圖片" class="mt-5 w-1/2" />
              </div>
              <div class="flex flex-col">
                <img src="../assets//image/測試沙拉3.png" alt="沙拉圖片" class="ms-auto w-1/2" />
                <div class="mt-auto flex">
                  <TheSvg svgIcon="rhombus-full" class="h-[40px] w-[30px]" />
                  <TheSvg svgIcon="rhombus" class="h-[40px] w-[30px]" />
                  <TheSvg svgIcon="rhombus-full" class="h-[40px] w-[30px]" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-full flex flex-col gap-y-2">
            <div class="flex items-center gap-x-5">
              <p class="flex h-full flex-col justify-around text-xl">
                <span>澱</span><span>粉</span>
              </p>
              <h3 class="text-3xl font-medium">15g</h3>
            </div>
            <p>
              澱粉是推動卡路里的重要能源 不是極端的澱粉限制,而是適當的攝取量，選擇盒食，
              可以讓您精確的澱粉控制，在澱粉控制中，從食材調配的苦惱中 解放出來，度過悠閒的用餐時光
            </p>
          </div>
          <div class="col-span-full grid grid-cols-4 gap-x-6">
            <div class="col-span-2 mt-10">
              <div class="flex flex-col gap-y-2">
                <img src="../assets//image/測試沙拉2.png" alt="沙拉圖片" />
                <div class="flex">
                  <TheSvg svgIcon="rhombus-full" class="h-[40px] w-[30px]" />
                  <TheSvg svgIcon="rhombus" class="h-[40px] w-[30px]" />
                  <TheSvg svgIcon="rhombus-full" class="h-[40px] w-[30px]" />
                </div>
                <div class="col-span-5 col-start-2 flex items-center gap-x-5">
                  <p class="flex h-full flex-col justify-around text-xl">
                    <span>熱</span><span>量</span>
                  </p>
                  <h3 class="text-3xl font-medium">350Kcal</h3>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div class="flex flex-col gap-y-2">
                <img
                  src="../assets//image/測試義大利麵.png"
                  alt="義大利麵圖片"
                  class="ms-auto w-1/2"
                />
                <div class="col-span-full flex items-center gap-x-5">
                  <p class="flex h-full flex-col justify-around text-xl">
                    <span>蛋</span><span>白</span><span>質</span>
                  </p>
                  <h3 class="text-3xl font-medium">20g</h3>
                </div>
                <p>
                  人體組成除了水分和脂質之外， 大部分都是蛋白質構成的以平均 成人攝取1餐推薦的蛋白質
                  爲標準,肉、海鮮、雞蛋、豆類 等食材爲蛋白質來源
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-full">
            <p class="py-2">
              以平均成年人一天的適當熱量爲基準,由營養管理師監督所有食譜
              不要盲目地減少卡路里，重要的是要攝取多種食材，
              營養均衡的飲食用正確的知識面對卡路里對於維持健康、愉快、 美味的健康生活非常重要！
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="../assets/image/home-other-adorn.png"
          class="max-h-[120px] w-full"
          alt="裝飾圖片"
        />
      </div>
    </section>

    <!-- 首頁-介紹操作區塊 -->
    <section class="bg-background-style-1">
      <div class="container py-20">
        <h2 class="text-center text-2xl font-bold text-primary-700 sm:text-5xl">
          簡單下訂，一鍵送到家
        </h2>
        <ul class="grid grid-cols-4 gap-6 py-9 sm:grid-cols-12">
          <li
            class="col-span-2 flex flex-col gap-y-2 sm:col-span-6 sm:items-center xl:col-span-3 xl:items-start"
          >
            <div class="flex flex-col gap-x-6 gap-y-2 font-bold">
              <div class="flex items-center gap-x-2">
                <h3 class="text-4xl sm:text-6xl">1</h3>
                <div class="flex flex-col gap-y-1">
                  <p class="text-xl md:text-2xl xl:text-3xl">選擇套餐方案</p>
                  <p class="text-[10px] sm:text-base">選擇適合你的數量</p>
                </div>
              </div>
              <div>
                <img class="object-fill" src="../assets/image/步驟1.png" alt="步驟1圖片" />
              </div>
            </div>
          </li>
          <li
            class="col-span-2 flex flex-col gap-y-2 sm:col-span-6 sm:items-center xl:col-span-3 xl:items-start"
          >
            <div class="flex flex-col gap-x-6 gap-y-2 font-bold">
              <div class="flex items-center gap-x-2">
                <h3 class="text-4xl sm:text-6xl">2</h3>
                <div class="flex flex-col gap-y-1">
                  <p class="text-xl md:text-2xl xl:text-3xl">套餐內容選擇</p>
                  <p class="text-[10px] sm:text-base">選配好的套餐，或是親自挑選</p>
                </div>
              </div>
              <div>
                <img class="object-fill" src="../assets/image/步驟3.png" alt="步驟3圖片" />
              </div>
            </div>
          </li>
          <li
            class="col-span-2 flex flex-col gap-y-2 sm:col-span-6 sm:items-center xl:col-span-3 xl:items-start"
          >
            <div class="flex flex-col gap-x-6 gap-y-2 font-bold">
              <div class="flex items-center gap-x-2">
                <h3 class="text-4xl sm:text-6xl">3</h3>
                <div class="flex flex-col gap-y-1">
                  <p class="text-xl md:text-2xl xl:text-3xl">餐盒冷凍保存</p>
                  <p class="text-[10px] sm:text-base">餐點放置冷凍庫急凍保存</p>
                </div>
              </div>
              <div>
                <img class="object-fill" src="../assets/image/步驟3.png" alt="步驟3圖片" />
              </div>
            </div>
          </li>
          <li
            class="col-span-2 flex flex-col gap-y-2 sm:col-span-6 sm:items-center xl:col-span-3 xl:items-start"
          >
            <div class="flex flex-col gap-x-6 gap-y-2 font-bold">
              <div class="flex items-center gap-x-2">
                <h3 class="text-4xl sm:text-6xl">4</h3>
                <div class="flex flex-col gap-y-1">
                  <p class="text-xl md:text-2xl xl:text-3xl">加熱享用</p>
                  <p class="text-[10px] sm:text-base">使用微波或電鍋加熱輕鬆上桌</p>
                </div>
              </div>
              <div>
                <img class="object-fill" src="../assets/image/步驟4.png" alt="步驟4圖片" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 首頁-方案選擇區塊 -->
    <section class="bg-background-style-2 bg-no-repeat">
      <div class="container py-20">
        <p class="mb-2 text-center text-base font-bold md:text-2xl">餐餐自由配</p>
        <h3 class="mb-8 text-center text-2xl font-bold text-primary-700 md:text-3xl">
          適合您的生活方式的3種方案
        </h3>
        <p class="mb-8 text-center font-medium md:hidden">
          您可以根據自身狀況選擇套餐方案，產品一律採用冷凍配送， 我們也歡迎您與親朋好友一起訂購。
        </p>
        <ul class="flex flex-col items-center justify-around gap-y-7 md:flex-row">
          <li class="rounded border-2 border-black bg-white">
            <h3 class="bg-secondary-950 py-2 text-center text-3xl font-bold text-white">7餐</h3>
            <div class="flex flex-col items-center justify-center px-20 py-6 md:px-14">
              <p class="text-center text-2xl font-bold">平均一餐</p>
              <h4 class="text-4xl font-bold">NT.70</h4>
              <span>總價700元起</span>
            </div>
            <div class="flex items-center justify-center pb-9">
              <button
                class="rounded border border-secondary-950 px-14 py-1"
                @click="handleSelectPlan(7)"
              >
                選擇方案
              </button>
            </div>
          </li>
          <li class="rounded border-2 border-black bg-white">
            <h3 class="bg-primary-600 py-2 text-center text-3xl font-bold text-white">14餐</h3>
            <div class="flex flex-col items-center justify-center px-20 py-6 md:px-14">
              <p class="text-center text-2xl font-bold">平均一餐</p>
              <h4 class="text-4xl font-bold">NT.70</h4>
              <span>總價700元起</span>
            </div>
            <div class="flex items-center justify-center pb-9">
              <button
                class="rounded border border-secondary-950 px-14 py-1"
                @click="handleSelectPlan(14)"
              >
                選擇方案
              </button>
            </div>
          </li>
          <li class="rounded border-2 border-black bg-white">
            <h3 class="bg-secondary-400 py-2 text-center text-3xl font-bold text-white">21餐</h3>
            <div class="flex flex-col items-center justify-center px-20 py-6 md:px-14">
              <p class="text-center text-2xl font-bold">平均一餐</p>
              <h4 class="text-4xl font-bold">NT.70</h4>
              <span>總價700元起</span>
            </div>
            <div class="flex items-center justify-center pb-9">
              <button
                class="rounded border border-secondary-950 px-14 py-1"
                @click="handleSelectPlan(21)"
              >
                選擇方案
              </button>
            </div>
          </li>
        </ul>
        <div class="mt-12 hidden md:block">
          <p class="text-center text-2xl font-medium">
            您可以根據自身狀況選擇套餐方案，產品一律採用冷凍配送，<br />
            我們也歡迎您與親朋好友一起訂購。
          </p>
        </div>
      </div>
    </section>

    <!-- 首頁-介紹區塊-2 -->
    <section>
      <ThePlaidAdorn />

      <div class="container py-14 md:py-20">
        <div class="flex flex-col items-center justify-center">
          <TheSvg svgIcon="main-logo" class="h-[50px] w-[340px]" />
          <h2 class="my-5 text-3xl font-bold text-primary-700">「又懶又健康」</h2>
          <div class="hidden md:block">
            <p>這是 盒食 的宗旨，健康是財富之本，我們希望無論您的生活多麼忙碌都能吃得營養均衡。</p>
            <p>
              無論您是忙碌的上班族、辛苦的全職媽媽，或者您與我們一樣，是個又懶又想吃的健康的人，
            </p>
            <p class="text-center">盒食提供您日常飲食更多元的選擇，健康美味輕鬆上桌。</p>
          </div>
          <div class="flex flex-col items-center justify-center gap-y-1 md:hidden">
            <p>這是 盒食 的宗旨，健康是財富之本，</p>
            <p>我們希望無論您的生活多麼忙碌都能吃得營養均衡。</p>
            <p>無論您是忙碌的上班族、辛苦的全職媽媽，</p>
            <p>或者您與我們一樣，是個又懶又想吃的健康的人，</p>
            <p>盒食提供您日常飲食更多元的選擇，健康美味輕鬆上桌。</p>
          </div>
        </div>
      </div>
      <ThePlaidAdorn />
    </section>

    <!-- 跑馬燈 -->
    <section>
      <TheNewsTicker />
    </section>

    <!-- 聯絡-訂閱區塊 -->
    <section>
      <TheContact />
    </section>
  </main>
</template>
<style lang="scss" scoped>
:deep(.swiper-wrapper) {
  display: flex;
  gap: 24px !important;
}
:deep(.swiper-slide) {
  margin: 0px !important;
}
:deep(.swiper-pagination) {
  position: relative; /* 將 position 設為 relative，讓它在文檔流中處於正常位置 */
  text-align: center; /* 將分頁指示器居中 */
  margin: 48px 0px 0px 0px;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: $primary-700;
}
</style>
