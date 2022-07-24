import IAppState from '@/typescript/store/modules/app'
export default class AppState implements IAppState {
  /** 侧边栏的状态 false 关闭 true 展开 */
  sideStatus = false
  /** 全局的加载状态 */
  layoutLoading = true
  /** 是否需要重新获取用户的基本信息 true 需要 */
  refreshUserInfoFlag =  true
}
