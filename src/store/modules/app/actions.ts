import ACTIONS_TYPE from './actions-type'

const actions = {
  /** 修改侧边栏状态 */
  changeSiderStatus(data: boolean) {
    return {
      type: ACTIONS_TYPE.CHANGE_SIDER_STATUS,
      data
    }
  },
  /** 全局的加载状态 */
  layoutLoadingStatus(data: boolean) {
    return {
      type: ACTIONS_TYPE.CHANGE_LAYOUT_LOADING,
      data
    }
  },
  /** 是否需要重新获取用户的基本信息 */
  refreshUserInfoFlag(data: boolean) {
    return {
      type: ACTIONS_TYPE.CHNAGE_ISNEED_USERINFO,
      data
    }
  }
}

export default actions
