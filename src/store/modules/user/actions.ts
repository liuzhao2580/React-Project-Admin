import { getUserInfoApi } from '@/api/modules/user'
import { getUserIdStorage } from '@/utils/modules/commonSave'
import { Dispatch } from 'redux'
import ACTIONS_TYPE from './actions-type'

const actions = {
  /** 获取用户的基本信息 */
  getUserInfo(data: any) {
    return {
      type: ACTIONS_TYPE.GET_USER_INFO,
      data
    }
  },
  /** 异步获取用户基本信息 */
  userInfoFetchDispatch(dispatch: Dispatch) {
    return () => {
      return new Promise<void>(async reslove => {
        const getData = await getUserInfoApi(getUserIdStorage())
        dispatch(this.getUserInfo(getData.data))
        reslove()
      })
    }
  }
}

export default actions
