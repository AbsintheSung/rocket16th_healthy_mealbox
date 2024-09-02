import axiosInstance from '@/utils/api/axios'
const urlName = import.meta.env.VITE_APP_API_NAME

//添加api路徑
const registerApi = `/${urlName}/auth/register` //註冊API路徑
const signinApi = `/${urlName}/auth/login` //登入API路徑
const userInfoApi = `/${urlName}/auth/getUserInfo` //取得會員資料API路徑
const generalMealApi = `/${urlName}/generalBoxes` //取得一般餐盒 API路徑 
const generalMealOneApi = `/${urlName}/generalBoxes` //取得單一的一般餐盒API路徑

//匯出要使用的 api method
export const fetchApi = {
  register: (data: any) => axiosInstance.post(registerApi, data),//註冊 method
  signin: (data: any) => axiosInstance.post(signinApi, data),//登入 method
  userinfo: () => axiosInstance.get(userInfoApi),//取得會員資料 method 
  generalmeal: () => axiosInstance.get(generalMealApi), //取得一般餐盒 method 
  generalmealOne: (id: any) => axiosInstance.get(`${generalMealOneApi}/${id}`), //取得一般餐盒(單個) method 
  //要添加其他 API 服務(照上面的方式往下寫)
}
