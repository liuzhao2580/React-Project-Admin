import { IAction } from '../shared/interface'
import initState from './state'
import ACTIONS_TYPE from './actions-type'
import IUserState from '@/typescript/store/modules/user'
import { MUserInfo } from '@/typescript/shared/model/user'

const reducers = (
  state = new initState(),
  action: IAction<MUserInfo>
): IUserState => {
  switch (action.type) {
  case ACTIONS_TYPE.GET_USER_INFO:
    return Object.assign({}, state, { userInfo: action.data })
  default:
    return state
  }
}

export default reducers
