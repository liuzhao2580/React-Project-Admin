import React from 'react'
import {HomeOutlined, FileTextOutlined} from '@ant-design/icons'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import Document from '@/views/document'
import Login from '@/views/login'
/**
 * @param {Boolean} hidden 设置为 true 说明不在侧边栏显示
 */
export const constRoutes = [
    {
        path:'/login',
        hidden: true,
        component:Login,
    },
    {
        path:'/',
        component: Layout,
        routes: [
            {
                path:'/dashboard',
                icon: <HomeOutlined />,
                title: '首页',
                component: Dashboard
            },
            {
                path:'/document',
                icon: <FileTextOutlined />,
                title: '文档',
                component: Document
            }
        ]
    }
]