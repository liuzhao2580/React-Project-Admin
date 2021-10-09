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
    default:
      return state
  }
}
