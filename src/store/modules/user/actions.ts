import ACTIONS_TYPE from './actions-type'

const actions = {
  /** 获取用户的基本信息 */
  getUserInfo(data: any) {
    return {
      type: ACTIONS_TYPE.GET_USER_INFO,
      data
    }
  }
}

export default actions
