import ACTIONS_TYPE from './actions-type'
export default {
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
  }
}
