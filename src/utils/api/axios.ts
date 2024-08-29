import axios from 'axios'
// const baseURL = import.meta.env.VITE_APP_API_URL
// const axiosInstance = axios.create({
//   baseURL: baseURL,
// });

axios.interceptors.request.use(
  (config) => {
    const tokenCode = document.cookie.replace(
      /(?:(?:^|.*;\s*)tokenCode\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (tokenCode) {
      config.headers.Authorization = `Bearer ${tokenCode}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 處理未授權錯誤，例如重定向到登入頁面
    }
    return Promise.reject(error)
  }
)

export default axios
