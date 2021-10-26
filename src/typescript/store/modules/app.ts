export default interface IAppState {
  /** 侧边栏的状态 false 关闭 true 展开 */
  sideStatus: boolean,
  /** 全局的加载状态 */
  layoutLoading: boolean,
  /** 是否需要重新获取用户的基本信息 true 需要 */
  isNeedUserInfo: boolean
}