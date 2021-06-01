import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { constRoutes } from './routerConfig'
export default () => {
  const routesFunc = (Routes = constRoutes) => {
    return Routes.map(router => {
      if (!router.children) {
        return (
          <Route
            key={router.path}
            path={router.path}
            exact={router.exact}
            render={props => (
              <router.component {...props} routes={router.routes} />
            )}
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
  return (
    <Router>
      <Switch>{getRoutes}</Switch>
    </Router>
  )
}
