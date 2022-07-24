import { getUserInfoApi } from '@/api/modules/user'
import { getUserIdStorage } from '@/utils/modules/commonSave'
import { Dispatch } from 'redux'
import ACTIONS_TYPE from './actions-type'
import appActions from '../app/actions'
import { tokenExpired } from '@/utils'
import { IUserBaseInfo } from '@/typescript/shared/interface/user'

const actions = {
  /** 获取用户的基本信息 */
  getUserInfo(data: IUserBaseInfo) {
    return {
      type: ACTIONS_TYPE.GET_USER_INFO,
      data
    }
  },
  /** 异步获取用户基本信息 */
  userInfoFetchDispatch(dispatch: Dispatch) {
    return async () => {
      try {
        const getData = await getUserInfoApi(getUserIdStorage())
        dispatch(this.getUserInfo(getData.data))
      } catch (error) {
        tokenExpired()
      } finally {
        // 清除全局的加载状态
        dispatch(appActions.layoutLoadingStatus(false))
      }
    }
  }
}

export default actions
