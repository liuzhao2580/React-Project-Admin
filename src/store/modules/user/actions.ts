import ACTIONS_TYPE from './actions-type'
export default {
  /** 获取用户的基本信息 */
  getUserInfo(data: any) {
    return {
      type: ACTIONS_TYPE.GET_USER_INFO,
      data
    }
  }
}
