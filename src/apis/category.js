// 这是处理栏目数据的API
import axios from '@/utils/request.js'
// 1.获取栏目列表
export const getCatelist = () => {
    return axios({
        url: '/category'

    })

}