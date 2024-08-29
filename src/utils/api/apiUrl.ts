import axiosInstance from '@/utils/api/axios'
const urlName = import.meta.env.VITE_APP_API_NAME

//添加api路徑
const registerApi = `/${urlName}/auth/register`
const signinApi = `/${urlName}/auth/login`
const userInfoApi = `/${urlName}/auth/getUserInfo`
const generalMealApi = `/${urlName}/generalBoxes` //取得一般餐盒 API
const generalMealOneApi = `/${urlName}/generalBoxes`

//匯出要使用的 api method
export const fetchApi = {
  register: (data: any) => axiosInstance.post(registerApi, data),
  signin: (data: any) => axiosInstance.post(signinApi, data),
  userinfo: () => axiosInstance.get(userInfoApi),
  generalmeal: () => axiosInstance.get(generalMealApi),
  generalmealOne: (id: any) => axiosInstance.get(`${generalMealOneApi}/${id}`),
  //要添加其他 API 服務(照上面的方式往下寫)
}
