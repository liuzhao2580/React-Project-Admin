import React from 'react'
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons'
import Dashboard from '@/views/dashboard'
import Document from '@/views/document'
/**
 * @param {Boolean} hidden 设置为 true 说明不在侧边栏显示
 */
export const constRoutes = [
    {
        path: '/dashboard',
        icon: <HomeOutlined />,
        title: '首页',
        component: Dashboard
    },
    {
        path: '/document',
        icon: <FileTextOutlined />,
        title: '文档',
        component: Document
    }
]
