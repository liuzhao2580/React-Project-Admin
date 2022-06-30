import React from 'react'
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom'
import { constRoutes } from './routerConfig'

import Login from '@/views/login'
import Layout from '@/layout'
import ErrorPage404 from '@/views/errorPage/404'
import PrivateRoute from '@/routes/PrivateRoute'
import { ROUTE_PATH } from '@/routes/RouteConst'
import { getRouteTitle } from '@/utils'

/** 登录之后的路由 */
export const Routes = () => {
  const routesFunc = (Routes = constRoutes) => {
    return Routes.map(router => {
      if (!router.children) {
        return (
          <Route
            key={router.path}
            path={router.path}
            exact={router.meta && router.meta.exact}
            component={router.component}
          ></Route>
        )
      } else {
        return routesFunc(router.children)
      }
    })
  }
  const getRoutes = routesFunc()
  getRoutes.push(
    <Route path="/" exact key="/redirect">
      <Redirect to="/dashboard"></Redirect>
    </Route>
  )
  getRoutes.push(
    <Route path="*" key="404">
      <Redirect to="/404"></Redirect>
    </Route>
  )
  return <Switch>{getRoutes}</Switch>
}

/** 登录之前 配置路由
 * withRouter 可以监听路由的变化
 */
export const BaseRouter = withRouter(() => {
  const { pathname } = useLocation()
  // 用于设置 浏览器的 title 显示
  document.title = '小火车况且况且-' + getRouteTitle(pathname)
  return (
    <Switch>
      <Route path={ROUTE_PATH.LOGIN} exact component={Login}></Route>
      <Route path="/404" exact component={ErrorPage404}></Route>
      <PrivateRoute path="/" component={Layout}></PrivateRoute>
    </Switch>
  )
})
