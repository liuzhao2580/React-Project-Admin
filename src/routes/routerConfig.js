import React from 'react'
import {
    HomeOutlined,
    FileTextOutlined,
    DatabaseOutlined,
    DiffOutlined,
    FileAddOutlined,
    GroupOutlined
} from '@ant-design/icons'
import Dashboard from '@/views/dashboard'
import Document from '@/views/document'
import ArticleList from '@/views/article/list'
import ArticleCreate from '@/views/article/create'
import FirstMenu from '@/views/multilevel-menu/first-menu'
import SecondMenu from '@/views/multilevel-menu/second-menu'
import ThirdMenu from '@/views/multilevel-menu/third-menu'
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
        path: '/multilevel-menu',
        redirect: '/multilevel-menu/first-menu',
        meta: { icon: <GroupOutlined />, exact: true, title: '多级菜单' },
        children: [
            {
                path: '/multilevel-menu/first-menu',
                meta: { icon: <DiffOutlined />, title: '一级菜单' },
                component: FirstMenu
            },
            {
                path: '/multilevel-menu/first-one-menu',
                redirect: '/multilevel-menu/first-one-menu/third-menu',
                meta: { icon: <FileAddOutlined />, title: '二级菜单' },
                children: [
                    {
                        path: '/multilevel-menu/first-one-menu/third-menu',
                        meta: { icon: <FileAddOutlined />, title: '三级菜单' },
                        component: SecondMenu
                    },
                    {
                        path: '/multilevel-menu/first-one-menu/third-two-menu',
                        redirect: '/multilevel-menu/first-one-menu/third-two-menu/four-menu',
                        meta: {
                            icon: <FileAddOutlined />,
                            title: '3-2级菜单',
                            breadcrumbShowFlag: false
                        },
                        children: [
                            {
                                path: '/multilevel-menu/first-one-menu/third-two-menu/four-menu',
                                meta: { icon: <FileAddOutlined />, title: '四级菜单' },
                                component: ThirdMenu
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
