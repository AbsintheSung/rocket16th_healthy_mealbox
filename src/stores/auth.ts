import { defineStore } from "pinia";
import { fetchApi } from '@/utils/api/apiUrl';
import { ref,computed } from 'vue'
export const useAuthStore = defineStore("auth", () => {
    //State
    // const userToken = ref('')

    //Getter
    const getUserToken = computed(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)tokenCode\s*\s*([^;]*).*$)|^.*$/, "$1"); //獲取存在cookie的token
        return token
    });
    //Action
    const signin = async (inputData: { account: string; password: string })=>{
        try{
            const response = await fetchApi.signin(inputData)
            if(response.status===200){
                document.cookie = `tokenCode=${response.data.token}`
                const { message, status } = response.data;
                return { message, status };
            }
            console.log(response)
        }catch(error:any){
            if(error.response.status === 401){
                const data ={
                    message: "登入失敗",
                    status: 401
                }
                error.response.data = data
                throw  error.response.data
            }
        }
    }
    const register = async (inputData:{ account: string; password: string })=>{
        try{
            const response = await fetchApi.register(inputData)
            if (response.status === 200) {
                switch (response.data.code) {
                  case 0:{
                    const { message, status } = response.data;
                    return { message, status };
                  }
                }
            }
        }catch(error: any) {
            if (error.response.status === 400) {
                throw error.response.data
            }
        }
    }
    return {
		signin,register,getUserToken
    }
})