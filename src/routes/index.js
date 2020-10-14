import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { constRoutes } from './routerConfig'
export default () => {
    const routesFunc = (Routes = constRoutes, path) => {
        // eslint-disable-next-line array-callback-return
        return Routes.map(router => {
            if (!router.children) {
                return (
                    <Route
                        key={router.path}
                        path={path ? `${path + router.path}` : router.path}
                        exact
                        render={props => <router.component {...props} routes={router.routes} />}
                    ></Route>
                )
            } else if (router.children) {
                return (
                    routesFunc(router.children, path ? `${path + router.path}` : router.path)
                )
            }
        })
    }
    const getRoutes = routesFunc()
    getRoutes.push(
        <Route path='/' exact key='/redirect'>
            <Redirect to='/dashboard'></Redirect>
        </Route>
    )
    getRoutes.push(
        <Route path='*' key='404'>
            <Redirect to='/404'></Redirect>
        </Route>
    )
    return (
        <Router>
            <Switch>{getRoutes}</Switch>
        </Router>
    )
}
