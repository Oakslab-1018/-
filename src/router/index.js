import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        name: '登录',
        path: '/login',
        component: () => import('../views/login.vue'),
    },
    {
        name: '首页',
        path: '/home',
        component: () => import('../views/home.vue'),
    },
    {
        path:'/',
        redirect: '/login'//重定向~~
    }
];

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
    routes,
    history: createWebHistory(),
})

//暴露出router
export default router