import {
  HomeOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  DiffOutlined,
  FileAddOutlined,
  GroupOutlined
} from '@ant-design/icons'

import { IRouterList } from '@/typescript/router/interface'
import ROUTE_PATH from './routePath'
import Dashboard from '@/views/dashboard'
import Personal from '@/views/personal'
import Document from '@/views/document'
import ArticleCategory from '@/views/article/category'
import ArticleList from '@/views/article/list'
import ArticleDetails from '@/views/article/details'
import ArticleCreate from '@/views/article/create'
import FirstMenu from '@/views/multilevel-menu/first-menu'
import SecondMenu from '@/views/multilevel-menu/second-menu'
import ThirdMenu from '@/views/multilevel-menu/third-menu'
/** 路由的保存数组*/
export const constRoutes: Array<IRouterList> = [
  {
    path: ROUTE_PATH.DASHBOARD,
    meta: { icon: HomeOutlined, title: '首页' },
    component: Dashboard
  },
  // 个人中心页面
  {
    path: ROUTE_PATH.PERSONAL,
    meta: { hidden: true, title: '个人中心' },
    component: Personal
  },
  // 文档页面
  {
    path: ROUTE_PATH.DOCUMENT,
    meta: { icon: FileTextOutlined, title: '文档' },
    component: Document
  },
  // 文章
  {
    path: ROUTE_PATH.ARTICLE,
    redirect: ROUTE_PATH.ARTICLE_LIST,
    meta: { icon: DatabaseOutlined, exact: true, title: '文章' },
    children: [
      {
        path: ROUTE_PATH.ARTICLE_CATEGORY,
        meta: { icon: DiffOutlined, title: '文章分类' },
        component: ArticleCategory
      },
      {
        path: ROUTE_PATH.ARTICLE_LIST,
        meta: { icon: DiffOutlined, title: '文章列表' },
        component: ArticleList
      },
      {
        path: ROUTE_PATH.ARTICLE_CREATE,
        meta: { icon: FileAddOutlined, title: '文章创建' },
        component: ArticleCreate
      },
      {
        path: ROUTE_PATH.ARTICLE_EDIT,
        meta: { hidden: true, title: '文章编辑' },
        component: ArticleCreate
      },
      {
        path: ROUTE_PATH.ARTICLE_DETAILS,
        meta: { hidden: true, title: '文章预览' },
        component: ArticleDetails
      },
      {
        path: ROUTE_PATH.ARTICLE_REVIEW,
        meta: { hidden: true, title: '文章审核' },
        component: ArticleDetails
      }
    ]
  },
  // 多级菜单
  {
    path: ROUTE_PATH.MULTILEVEL,
    redirect: ROUTE_PATH.MULTILEVEL_FIRST,
    meta: { icon: GroupOutlined, exact: true, title: '多级菜单' },
    children: [
      {
        path: ROUTE_PATH.MULTILEVEL_FIRST,
        meta: { icon: 'icon-sishi', title: '一级菜单' },
        component: FirstMenu
      },
      {
        path: ROUTE_PATH.MULTILEVEL_SECOND,
        redirect: ROUTE_PATH.MULTILEVEL_THIRD,
        meta: { icon: 'icon-jinganglang', title: '二级菜单' },
        children: [
          {
            path: ROUTE_PATH.MULTILEVEL_THIRD,
            meta: { icon: 'icon-zhizhuxia', title: '三级菜单' },
            component: SecondMenu
          },
          {
            path: ROUTE_PATH.MULTILEVEL_THIRD_TWO,
            redirect: ROUTE_PATH.MULTILEVEL_FOUR,
            meta: {
              icon: FileAddOutlined,
              title: '3-2级菜单',
              breadcrumbShowFlag: false
            },
            children: [
              {
                path: ROUTE_PATH.MULTILEVEL_FOUR,
                meta: { icon: FileAddOutlined, title: '四级菜单' },
                component: ThirdMenu
              }
            ]
          }
        ]
      }
    ]
  }
]
