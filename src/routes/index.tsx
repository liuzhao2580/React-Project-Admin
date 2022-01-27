import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { constRoutes } from './routerConfig'

const Routes = () => {
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


export default Routes