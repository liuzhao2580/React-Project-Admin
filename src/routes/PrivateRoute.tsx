import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTokenCookies, getUserIdStorage } from '@/utils/commonSave'
import { getUserInfoApi } from '@/api/modules/user'
import userActions from '@/store/modules/user/actions'

/** 用来处理路由拦截 */
const PrivateRoute = ({
  component: Component,
  getUserInfoDispatch,
  ...rest
}) => {
  useEffect(() => {
    getUserInfoDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Route
      {...rest}
      render={() =>
        !!getTokenCookies() ? <Component /> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    async getUserInfoDispatch() {
      const { data } = await getUserInfoApi(getUserIdStorage())
      dispatch(
        (function () {
          return userActions.getUserInfo(data)
        })()
      )
    }
  }
}

export default connect(null, mapDispatchToProps)(PrivateRoute)
