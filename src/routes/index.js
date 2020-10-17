import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { constRoutes } from './routerConfig'
const RouteWithSubRoutes = Routes => {
    return Routes.map(itemRoute => {
        if (!itemRoute.children) {
            return (
                <Route
                    key={itemRoute.path}
                    exact={itemRoute.exact}
                    path={itemRoute.path}
                    render={props =>
                        itemRoute.redirect ? <Redirect to={itemRoute.redirect} /> : <itemRoute.component {...props} />
                    }
                ></Route>
            )
        }
        // 如果存在 children 使用递归循环得到 route 的路由
        else return RouteWithSubRoutes(itemRoute.children)
    })
}
// 返回 layout 的子路由数据
export const LayoutRoutes = () => {
    return <Switch>{RouteWithSubRoutes(constRoutes[1].children)}</Switch>
}
export default () => {
    return (
        <Router>
            <Switch>
                {constRoutes.map(route => {
                    // 匹配 layout 的二级路由数据
                    if (route.path === '/') {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                render={props => <route.component {...props} routes={route.children} />}
                            />
                        )
                    }
                    // 匹配 包括登录页的一级路由数据
                    else {
                        return (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={route.path}
                                render={props => <route.component {...props} />}
                            />
                        )
                    }
                })} 
            </Switch>
        </Router>
    )
}
