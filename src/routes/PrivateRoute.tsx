import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getToken, getUserIdStorage } from '@/utils/modules/commonSave'
import { getUserInfoApi } from '@/api/modules/user'
import userActions from '@/store/modules/user/actions'
import appActions from '@/store/modules/app/actions'
import IStoreState from '@/typescript/store'

/** 用来处理路由拦截 */
const PrivateRoute = ({
  component: Component,
  getUserInfoDispatch,
  isNeedUserInfo,
  ...rest
}) => {
  useEffect(() => {
    if (isNeedUserInfo === true) {
      getUserInfoDispatch()
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
    async getUserInfoDispatch() {
      // 添加当前的全局加载状态
      dispatch(appActions.layoutLoadingStatus(true))
      const { data } = await getUserInfoApi(getUserIdStorage())
      // 清除全局的加载状态
      dispatch(appActions.layoutLoadingStatus(false))
      dispatch(appActions.isNeedUserInfo(false))
      dispatch(
        (function () {
          return userActions.getUserInfo(data)
        })()
      )
    }
  }
}

export default connect(mapAppStateToProps, mapDispatchToProps)(PrivateRoute)
