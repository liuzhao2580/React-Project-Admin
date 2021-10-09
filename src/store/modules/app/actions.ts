import ACTIONS_TYPE from './actions-type'
export default {
  /** 修改侧边栏状态 */
  changeSiderStatus(data: boolean) {
    return {
      type: ACTIONS_TYPE.CHANGE_SIDER_STATUS,
      data
    }
  }
}
