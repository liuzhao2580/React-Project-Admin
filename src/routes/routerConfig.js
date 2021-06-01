import React from 'react'
import {
  HomeOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  DiffOutlined,
  FileAddOutlined,
  GroupOutlined
} from '@ant-design/icons'

import { IRouterList } from '@/typescript/interface/router/routerConfig'

import Dashboard from '@/views/dashboard'
import Personal from '@/views/personal'
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
  }
]
