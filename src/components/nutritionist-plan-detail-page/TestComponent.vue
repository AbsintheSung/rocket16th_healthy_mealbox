<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchApi } from '@/utils/api/apiUrl'
import { useGeneralMealBoxStore } from '@/stores/generalmealbox'

const route = useRoute()
const generalMealBoxStore = useGeneralMealBoxStore()
const error = ref(null)
const lastFetchedUrl = ref('')
const oneMealData = computed(() => generalMealBoxStore.getOneGeneralMeal)

const getApiUrl = (id) => {
    return `http://4.240.57.120/api/generalBoxes/${id}`
}


const fetchData = async () => {
    try {
        console.log('開始獲取資料')
        const id = 4
        const url = getApiUrl(id)
        lastFetchedUrl.value = url
        console.log('呼叫的 URL:', url)
        // 使用 store 方法獲取資料
        // 固定id獲取資料 - 測試
        await generalMealBoxStore.fetchOneGeneralMeal(4)
        // 動態id獲取資料
        // const result = await generalMealBoxStore.fetchOneGeneralMeal(route.params.id)
        console.log('通過 store 獲取的資料:', generalMealBoxStore.getOneGeneralMeal)

        if (!generalMealBoxStore.getOneGeneralMeal) {
            throw new Error('獲取的資料為空')
        }
        error.value = null
    } catch (err) {
        console.error('獲取資料時出錯:', err)
        error.value = err.message

        // store方法失敗，直接呼叫 API
        try {
            const directResult = await fetchApi.getGeneralmealOne(4)
            console.log('直接從 API 獲取的資料:', directResult)
            oneMealData.value = directResult.data
        } catch (directErr) {
            console.error('直接呼叫 API 時出錯:', directErr)
        }
    }
}

onMounted(fetchData)
</script>
<template>
    <div>
        <h2>測試資料獲取</h2>
        <p class="text-lg font-bold">{{ oneMealData.name }}</p>
        <button @click="fetchData" class="bg-primary-base p-2">獲取資料</button>
        <pre v-if="oneMealData">{{ JSON.stringify(oneMealData, null, 2) }}</pre>
        <p v-else-if="error">錯誤: {{ error }}</p>
        <p v-else>尚未獲取資料</p>
    </div>
</template>
<style scoped></style>