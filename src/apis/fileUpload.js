// 实现文件上传
// 引入

import axios from '@/utils/request.js'



// 头像上传
export const uploadFile = (data) => {

    return axios({
        method: 'post',
        url: '/upload',
        data
    })
}