import axios from 'axios';


// 新增請求攔截器
axios.interceptors.request.use(function (config) {
    const tokenCode = document.cookie.replace(/(?:(?:^|.*;\s*)tokenCode\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (tokenCode) {
        config.headers.Authorization = tokenCode
    }
    
    //在發送請求前做啥?
    return config;
}, function (error) {
    //對請求錯誤做啥
    return Promise.reject(error);
});

// 新增回應攔截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 超出2xx範圍的狀態馬都會觸發該函數 
    // 對回應錯誤做?
 
    // console.log(error.response.status)
    // console.log('cookie可能過期或是失效，導回login')

    return Promise.reject(error);
});

export default axios;