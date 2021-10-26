import { IAction } from '../shared/interface'
import initState from './state'
import ACTIONS_TYPE from './actions-type'

export default (state = new initState(), action: IAction) => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
}
