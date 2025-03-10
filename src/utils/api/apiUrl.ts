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
const updateCaseTypeApi = `/${urlName}/cart/caseType`
const submitOrder = `/${urlName}/orders` //新增購物車訂單並送出
const cleanCart = `/${urlName}/cart/clean` //清空購物車
const customUpdateImgApi = `/${urlName}/image/customizeBoxes/upload` //自定義圖片上傳
const getMemberOrderApi = `/${urlName}/orders` //取得會員的歷史訂單
const getCustomMenuApi = `/${urlName}/dishes` //取得所有自定義配菜菜單
const featCustomMealApi = `/${urlName}/customizeBoxes` //建立自定義餐盒
const getCusomMealApi = `/${urlName}/customizeBoxes` //取得會員自定義餐盒列表
const updateCusomMealApi = `/${urlName}/customizeBoxes` //編輯自定義
const deleteCustomApi = `/${urlName}/customizeBoxes` //刪除自定義
const linepayConfirmApi = `/${urlName}/linePay/confirm` //確認line pay付款成功
const filterGenerMealApi = `/${urlName}/generalBoxes/sorted` //篩選一般餐盒營養素 api

//匯出要使用的 api method
export const fetchApi = {
  register: (data: any) => axiosInstance.post(registerApi, data), //註冊 method
  signin: (data: any) => axiosInstance.post(signinApi, data), //登入 method
  getUserInfo: () => axiosInstance.get(userInfoApi), //取得會員資料 method
  getGeneralmeal: () => axiosInstance.get(generalMealApi), //取得一般餐盒 method
  getGeneralmealOne: (id: any) => axiosInstance.get(`${generalMealOneApi}/${id}`), //取得一般餐盒(單個) method
  getNutritionistPlan: () => axiosInstance.get(nutritionistPlanApi), // 取得全部營養師方案
  getNutritionistPlanOne: (id: any) => axiosInstance.get(`${nutritionistPlanOneApi}/${id}`), // 取得單筆營養師方案
  updateMemberInfo: (data: any) => axiosInstance.post(updateMemberInfoApi, data), // 修改會員資料
  updateMemberPasswor: (data: any) => axiosInstance.post(updateMemberPasswordApi, data), //修改會員密碼
  getCartApi: () => axiosInstance.get(getCartApi), //取得會員購物車資訊
  updateCart: (data: any) => axiosInstance.patch(updateCartApi, data),
  updateCaseType: (data: any) => axiosInstance.patch(updateCaseTypeApi, data),
  submitOrder: (data: any) => axiosInstance.post(submitOrder, data), //送出購物車訂單
  cleanCart: () => axiosInstance.delete(cleanCart), //清空購物車
  customUpdateImg: (data: any) => axiosInstance.post(customUpdateImgApi, data), //自定義圖片上傳
  getMemberOrder: () => axiosInstance.get(getMemberOrderApi),  //取得會員的歷史訂單
  getCustomMenu: () => axiosInstance.get(getCustomMenuApi), //取得所有自定義配菜菜單
  featCustomMeal: (data: any) => axiosInstance.post(featCustomMealApi, data), //建立自定義餐盒
  getCusomMeal: () => axiosInstance.get(getCusomMealApi), //建立自定義餐盒
  updateCusomMeal: (id: any, data: any) => axiosInstance.patch(`${updateCusomMealApi}/${id}`, data), //編輯自定義餐盒
  deleteCustom: (id: any,) => axiosInstance.delete(`${deleteCustomApi}/${id}`), //編輯自定義餐盒
  Checklinepay: (data: any) => axiosInstance.post(linepayConfirmApi, data), //檢查line pay付款狀態
  filterGenerMealApi: (nutrients: string) => axiosInstance.get(`${filterGenerMealApi}/${nutrients}`) //篩選一般餐盒營養素 
  //要添加其他 API 服務(照上面的方式往下寫)
}
