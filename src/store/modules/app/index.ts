import { makeAutoObservable, runInAction } from 'mobx'
import IAppState from '@/typescript/store/modules/app'
export default class AppStore implements IAppState {
  /** 侧边栏的状态 false 关闭 true 展开 */
  sideStatus = false
  /** 全局的加载状态 */
  layoutLoading = true
  /** 是否需要重新获取用户的基本信息 true 需要 */
  needUserInfoFlag =  true
  constructor() {
    makeAutoObservable(this)
  }
  changeSideStatus(flag: boolean) {
    this.sideStatus = flag
  }
  changeLayoutLoadingStatus(flag: boolean) {
    runInAction(()=> {
      this.layoutLoading = flag
    })
  }
  changeNeedUserInfoFlag(flag: boolean) {
    this.needUserInfoFlag = flag
  }
}