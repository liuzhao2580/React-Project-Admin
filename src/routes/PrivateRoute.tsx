import React, { FC, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { message } from 'antd'

import { getToken, getUserIdStorage } from '@/utils/modules/commonSave'
import userActions from '@/store/modules/user/actions'
import IStoreState from '@/typescript/store'
import { tokenExpired } from '@/utils'
import { ROUTE_PATH } from './RouteConst'

interface IProps {
  component: FC
  getUserInfoDispatch: () => Promise<void>
  isNeedUserInfo: boolean
  [propName: string]: any
}

/** 用来处理路由拦截 */
const PrivateRoute = ({
  component: Component,
  getUserInfoDispatch,
  isNeedUserInfo,
  ...rest
}: IProps) => {
  const history = useHistory()
  useEffect(() => {
    if (isNeedUserInfo === true) {
      if (getUserIdStorage()) getUserInfoDispatch()
      else {
        message.info('登录过期')
        tokenExpired()
        history.replace(ROUTE_PATH.LOGIN)
      }
    }
  }, [getUserInfoDispatch, isNeedUserInfo])

  return (
    <Route
      {...rest}
      render={() =>
        !!getToken() ? <Component /> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  )
}

const mapAppStateToProps = (state: IStoreState) => {
  return {
    isNeedUserInfo: state.app.isNeedUserInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUserInfoDispatch: userActions.userInfoFetchDispatch(dispatch)
  }
}

export default connect(mapAppStateToProps, mapDispatchToProps)(PrivateRoute)
