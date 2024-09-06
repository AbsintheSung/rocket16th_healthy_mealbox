import axiosInstance from '@/utils/api/axios'
const urlName = import.meta.env.VITE_APP_API_NAME

//添加api路徑
const registerApi = `/${urlName}/auth/register` //註冊API路徑
const signinApi = `/${urlName}/auth/login` //登入API路徑
const userInfoApi = `/${urlName}/auth/getUserInfo` //取得會員資料API路徑
const updateMemberInfoApi = `/${urlName}/auth/setUserInfo` //修改會員資料API路徑
const generalMealApi = `/${urlName}/generalBoxes` //取得一般餐盒 API路徑
const generalMealOneApi = `/${urlName}/generalBoxes` //取得單一的一般餐盒API路徑
const nutritionistPlanApi = `/${urlName}/nutritionistCases` //取得營養師方案 API
const nutritionistPlanOneApi = `/${urlName}/nutritionistCases`
const updateMemberPasswordApi = `/${urlName}/auth/changePassword` //修改會員密碼 路徑
const getCartApi = `/${urlName}/cart` //取得個人購物車資訊
const updateCartApi = `/${urlName}/cart` //編輯個人購物車資訊

//匯出要使用的 api method
export const fetchApi = {
  register: (data: any) => axiosInstance.post(registerApi, data), //註冊 method
  signin: (data: any) => axiosInstance.post(signinApi, data), //登入 method
  getUserInfo: () => axiosInstance.get(userInfoApi), //取得會員資料 method
  getGeneralmeal: () => axiosInstance.get(generalMealApi), //取得一般餐盒 method
  getGeneralmealOne: (id: any) => axiosInstance.get(`${generalMealOneApi}/${id}`), //取得一般餐盒(單個) method
  getNutritionistPlan: () => axiosInstance.get(nutritionistPlanApi),
  getNutritionistPlanOne: (id: any) => axiosInstance.get(`${nutritionistPlanOneApi}/${id}`),
  updateMemberInfo: (data: any) => axiosInstance.post(updateMemberInfoApi, data), // 修改會員資料
  updateMemberPasswor: (data: any) => axiosInstance.post(updateMemberPasswordApi, data), //修改會員密碼
  getCartApi: () => axiosInstance.get(getCartApi), //取得會員購物車資訊
  updateCart: (data: any) => axiosInstance.patch(updateCartApi, data)
  //要添加其他 API 服務(照上面的方式往下寫)
}
