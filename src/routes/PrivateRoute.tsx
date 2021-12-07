import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getToken, getUserIdStorage } from '@/utils/modules/commonSave'
import userActions from '@/store/modules/user/actions'
import IStoreState from '@/typescript/store'
import { tokenExpired } from '@/utils'

/** 用来处理路由拦截 */
const PrivateRoute = ({
  component: Component,
  getUserInfoDispatch,
  isNeedUserInfo,
  ...rest
}) => {
  useEffect(() => {
    if (isNeedUserInfo === true) {
      if(getUserIdStorage()) getUserInfoDispatch()
      else tokenExpired()
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
