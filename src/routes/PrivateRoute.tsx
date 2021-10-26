import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken, getUserIdStorage } from '@/utils/modules/commonSave'
import { getUserInfoApi } from '@/api/modules/user'
import userActions from '@/store/modules/user/actions'
import appActions from '@/store/modules/app/actions'
import { Dispatch } from 'redux'

/** 用来处理路由拦截 */
const PrivateRoute = ({
  component: Component,
  getUserInfoDispatch,
  ...rest
}) => {
  useEffect(() => {
    getUserInfoDispatch()
  }, [getUserInfoDispatch])
  return (
    <Route
      {...rest}
      render={() =>
        !!getToken() ? <Component /> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    async getUserInfoDispatch() {
      // 添加当前的全局加载状态
      dispatch(appActions.layoutLoadingStatus(true))
      const { data } = await getUserInfoApi(getUserIdStorage())
      // 清除全局的加载状态
      dispatch(appActions.layoutLoadingStatus(false))
      dispatch(
        (function () {
          return userActions.getUserInfo(data)
        })()
      )
    }
  }
}

export default connect(null, mapDispatchToProps)(PrivateRoute)
