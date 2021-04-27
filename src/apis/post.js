// 这是获取新闻文章 API接口
import axios from '@/utils/request.js'


// 获取文章列表
export const getNewslist = (params) => {
    return axios({
        url: `/post`,
        params
    })
}
// 文章详情
export const geteditList = (id) => {
    return axios({
        url: '/post/' + id
    })
}
// 获取点赞接口
export const getGood = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}
//收藏文章
export const starPost = (id) => {
    return axios({
        url: '/post_star/' + id
    })
}


// 发布+回复评论
export const postCommentList = (id, data) => {
    return axios({
        method: 'post',
        url: '/post_comment/' + id,
        data

    })
}
