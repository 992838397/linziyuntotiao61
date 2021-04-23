// 这是获取新闻文章 API接口
import axios from '@/utils/request.js'
export const getNewslist = (category) => {
    return axios({
        url: `/post?category=${category}`
    })
}