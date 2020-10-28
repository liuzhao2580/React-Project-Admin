import React from 'react'
import { HomeOutlined, FileTextOutlined, DatabaseOutlined, DiffOutlined, FileAddOutlined } from '@ant-design/icons'
import Dashboard from '@/views/dashboard'
import Document from '@/views/document'
import ArticleList from '@/views/article/list'
import ArticleCreate from '@/views/article/create'
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
    },
    {
        path: '/article',
        redirect: '/article/list',
        icon: <DatabaseOutlined />,
        exact: true,
        title: '文章',
        children: [
            {
                path: '/article/list',
                icon: <DiffOutlined />,
                title: '文章列表',
                component: ArticleList
            },
            {
                path: '/article/create',
                icon: <FileAddOutlined />,
                title: '文章创建',
                component: ArticleCreate
            }
        ]
    }
]
