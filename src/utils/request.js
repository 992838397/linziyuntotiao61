// 引入
import axios from 'axios'
import { Toast } from 'vant'
axios.defaults.baseURL = 'http://157.122.54.189:9083'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config);
    // 在发送请求之前做些什么
    // 获取到token
    let token = localStorage.getItem('heimatotiao_token')
    // 判断是否存在token
    if (token) {
        // 为请求头添加Authorization：token
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.message == '用户信息验证失败!' || response.data.message == '用户信息验证失败') {
        Toast.fail("用户信息验证失败")
        // 页面回跳：
        // 如果用户是在关注的时候发生用户信息验证失败,跳回登入页面,登入成功后应该跳回关注页面,而不是个人中心
        // 以下实现页面跳转
        console.log("当前页面地址:", window.location.href);
        // 传递跳转前地址,登入成功后跳转回去
        window.location.href = '#/login?redirect_url=' + window.location.href
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



// 暴露
export default axios