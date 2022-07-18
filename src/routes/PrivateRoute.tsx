import React, { FC, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { message } from 'antd'

import { getToken, getUserIdStorage } from '@/utils/modules/commonSave'
import { tokenExpired } from '@/utils'
import { ROUTE_PATH } from './RouteConst'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

interface IProps {
  component: FC
  [propName: string]: any
}

/** 用来处理路由拦截 */
const PrivateRoute = ({
  component: Component,
  ...rest
}: IProps) => {
  const history = useHistory()
  const { appStore, userStore } = useStore()
  const needUserInfoFlag = appStore.needUserInfoFlag
  const getUserInfoDispatch = userStore.userInfoFetchDispatch(appStore)
  useEffect(() => {
    if (needUserInfoFlag === true) {
      if (getUserIdStorage()) getUserInfoDispatch
      else {
        message.info('登录过期')
        tokenExpired()
        history.replace(ROUTE_PATH.LOGIN)
      }
    }
  }, [getUserInfoDispatch, needUserInfoFlag])

  return (
    <Route
      {...rest}
      render={() =>
        !!getToken() ? <Component /> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  )
}
export default observer(PrivateRoute)
