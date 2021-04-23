// 这个文件专门助理用户相关的api


// 引入
import axios from '@/utils/request.js'

// 用户登录
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
//用户注册
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}
// 获取个人用户信息
export const getuserInfo = (id) => {
    return axios({
        url: `/user/${id}`,
        // `headers` 是即将被发送的自定义请求头
        // 使用拦截器替代
        // headers: { Authorization: localStorage.getItem('heimatotiao_token') },
    })
}

// 更新用户信息
export const updateUserDetail = (id, data) => {
    return axios({
        method: "post",
        url: `/user_update/${id}`,
        data
    })
}