import initState from './state'
import ACTIONS_TYPE from './actions-type'
import { IAction } from '../shared/interface'
import IAppState from '@/typescript/store/modules/app'

const reducers = (state = new initState(), action: IAction<any>):IAppState => {
  switch (action.type) {
  case ACTIONS_TYPE.CHANGE_SIDER_STATUS:
    return {
      ...state,
      sideStatus: action.data
    }
    /** 全局的加载状态 */
  case ACTIONS_TYPE.CHANGE_LAYOUT_LOADING:
    return {
      ...state,
      layoutLoading: action.data
    }
    /** 是否需要重新获取用户的基本信息 */
  case ACTIONS_TYPE.CHNAGE_ISNEED_USERINFO:
    return {
      ...state,
      needUserInfoFlag: action.data
    }
  default:
    return state
  }
}


export default reducers
