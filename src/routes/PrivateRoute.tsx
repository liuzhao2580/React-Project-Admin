import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getTokenCookies } from '@/utils/commonSave'

/** 用来处理路由拦截 */
export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        !!getTokenCookies() ? <Component /> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  )
}
