import {
  HomeOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  DiffOutlined,
  FileAddOutlined,
  GroupOutlined
} from '@ant-design/icons'

import { IRouterList } from '@/typescript/router/interface'
import { ROUTE_PATH, ROUTE_TITLE } from './RouteConst'
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
    meta: { icon: HomeOutlined, title: ROUTE_TITLE.DASHBOARD},
    component: Dashboard
  },
  // 个人中心页面
  {
    path: ROUTE_PATH.PERSONAL,
    meta: { hidden: true, title: ROUTE_TITLE.PERSONAL},
    component: Personal
  },
  // 文档页面
  {
    path: ROUTE_PATH.DOCUMENT,
    meta: { icon: FileTextOutlined, title: ROUTE_TITLE.DOCUMENT},
    component: Document
  },
  // 文章
  {
    path: ROUTE_PATH.ARTICLE,
    redirect: ROUTE_PATH.ARTICLE_LIST,
    meta: { icon: DatabaseOutlined, exact: true, title: ROUTE_TITLE.ARTICLE},
    children: [
      {
        path: ROUTE_PATH.ARTICLE_CATEGORY,
        meta: { icon: DiffOutlined, title: ROUTE_TITLE.ARTICLE_CATEGORY},
        component: ArticleCategory
      },
      {
        path: ROUTE_PATH.ARTICLE_LIST,
        meta: { icon: DiffOutlined, title: ROUTE_TITLE.ARTICLE_LIST},
        component: ArticleList
      },
      {
        path: ROUTE_PATH.ARTICLE_CREATE,
        meta: { icon: FileAddOutlined, title: ROUTE_TITLE.ARTICLE_CREATE},
        component: ArticleCreate
      },
      {
        path: ROUTE_PATH.ARTICLE_EDIT,
        meta: { hidden: true, title: ROUTE_TITLE.ARTICLE_EDIT},
        component: ArticleCreate
      },
      {
        path: ROUTE_PATH.ARTICLE_DETAILS,
        meta: { hidden: true, title: ROUTE_TITLE.ARTICLE_DETAILS},
        component: ArticleDetails
      }
    ]
  },
  // 多级菜单
  {
    path: ROUTE_PATH.MULTILEVEL,
    redirect: ROUTE_PATH.MULTILEVEL_FIRST,
    meta: { icon: GroupOutlined, exact: true, title: ROUTE_TITLE.MULTILEVEL},
    children: [
      {
        path: ROUTE_PATH.MULTILEVEL_FIRST,
        meta: { icon: 'icon-sishi', title: ROUTE_TITLE.MULTILEVEL_FIRST},
        component: FirstMenu
      },
      {
        path: ROUTE_PATH.MULTILEVEL_SECOND,
        redirect: ROUTE_PATH.MULTILEVEL_THIRD,
        meta: { icon: 'icon-jinganglang', title: ROUTE_TITLE.MULTILEVEL_SECOND},
        children: [
          {
            path: ROUTE_PATH.MULTILEVEL_THIRD,
            meta: { icon: 'icon-zhizhuxia', title: ROUTE_TITLE.MULTILEVEL_THIRD},
            component: SecondMenu
          },
          {
            path: ROUTE_PATH.MULTILEVEL_THIRD_TWO,
            redirect: ROUTE_PATH.MULTILEVEL_FOUR,
            meta: {
              icon: FileAddOutlined,
              title: ROUTE_TITLE.MULTILEVEL_THIRD_TWO,
              breadcrumbShowFlag: false
            },
            children: [
              {
                path: ROUTE_PATH.MULTILEVEL_FOUR,
                meta: { icon: FileAddOutlined, title: ROUTE_TITLE.MULTILEVEL_FOUR},
                component: ThirdMenu
              }
            ]
          }
        ]
      }
    ]
  }
]
