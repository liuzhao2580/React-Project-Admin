import initState from './state'
import ACTIONS_TYPE from './actions-type'
import { IAction } from '../shared/interface'
export default (state = initState, action: IAction) => {
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
        isNeedUserInfo: action.data
      }
    default:
      return state
  }
}
