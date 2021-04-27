// 1.路由工程化
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 2.创建路由对象
const router = new VueRouter({
    // 配置路由   
    routes: [
        {
            path: '/',
            // 路由重定向
            redirect: 'index'
        },
        {
            name: 'index',
            path: '/index',
            component: () => import("@/views/index.vue")
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/user/register.vue')
        },
        {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('@/views/user/personal.vue')
        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile.vue')
        },
        {
            name: 'postDetail',
            path: '/postDetail/:id',
            component: () => import('@/views/post/postDetail.vue')
        },
        {
            name: 'myfollow',
            path: '/myfollow/:id',
            component: () => import('@/views/user/myfollow.vue')
        },
        {
            name: 'mystar',
            path: '/mystar/:id',
            component: () => import('@/views/user/mystar.vue')
        },
        {
            name: 'comment',
            path: '/comment/:id',
            component: () => import('@/views/comment.vue')
        }


    ]
})

import { Toast } from 'vant'
// 添加导航守卫
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') !== -1) {
        // 获取token
        let token = localStorage.getItem('heimatotiao_token')
        // 验证是否登录
        if (token) {
            next()
        } else {
            Toast("未登录")
            // 重定向到登陆
            next({ name: 'login' })
        }
    } else {
        next()
    }

})
// 3.暴露
export default router