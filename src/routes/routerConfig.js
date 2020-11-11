import React from 'react'
import {
    HomeOutlined,
    FileTextOutlined,
    DatabaseOutlined,
    DiffOutlined,
    FileAddOutlined
} from '@ant-design/icons'
import Dashboard from '@/views/dashboard'
import Document from '@/views/document'
import ArticleList from '@/views/article/list'
import ArticleCreate from '@/views/article/create'
/**
 * @param {Boolean} hidden 设置为 true 说明不在侧边栏显示
 * @param {Boolean} breadcrumbShowFlag 是否显示在面包屑中 默认true 显示 false 隐藏
 * @param {Boolean} breadcrumbClickFlag 面包屑是否可被点击 默认true 可以被点击 false 不可被点击
 */
export const constRoutes = [
    {
        path: '/dashboard',
        meta: { icon: <HomeOutlined />, title: '首页' },
        component: Dashboard
    },
    {
        path: '/document',
        meta: { icon: <FileTextOutlined />, title: '文档' },
        component: Document
    },
    {
        path: '/article',
        redirect: '/article/list',
        meta: { icon: <DatabaseOutlined />, exact: true, title: '文章' },
        children: [
            {
                path: '/article/list',
                meta: { icon: <DiffOutlined />, title: '文章列表' },
                component: ArticleList
            },
            {
                path: '/article/create',
                meta: { icon: <FileAddOutlined />, title: '文章创建' },
                component: ArticleCreate
            }
        ]
    },
    {
        path: '/a',
        redirect: '/a/1',
        meta: { icon: <DatabaseOutlined />, exact: true, title: 'a' },
        children: [
            {
                path: '/a/1',
                meta: { icon: <DiffOutlined />, title: 'a-1' },
                children: [
                    {
                        path: '/a/1/2',
                        meta: { icon: <FileAddOutlined />, title: 'a-1-2' },
                        component: ArticleCreate
                    }
                ]
            },
            {
                path: '/a/2',
                meta: { icon: <FileAddOutlined />, title: 'a-2' },
                component: ArticleCreate
            }
        ]
    }
]
