// 这是获取新闻文章 API接口
import axios from '@/utils/request.js'
export const getNewslist = (params) => {
    return axios({
        url: `/post`,
        params
    })
}
export const geteditList = (id) => {
    return axios({
        url: '/post/' + id
    })
}