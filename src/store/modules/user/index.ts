import { makeAutoObservable, runInAction } from 'mobx'
import { MUserInfo } from '@/typescript/shared/model/user'
import { tokenExpired } from '@/utils'
import { getUserInfoApi } from '@/api/modules/user'
import { getUserIdStorage } from '@/utils/modules/commonSave'
import AppStore from '../app'

export default class UserStore {
  /** 获取用户的基本信息 */
  userInfo = new MUserInfo()
  appStore: AppStore
  constructor(appStore: AppStore) {
    makeAutoObservable(this)
    this.appStore = appStore
  }
  /** 获取用户的基本信息 */
  getUserInfo(data: MUserInfo) {
    this.userInfo = data
  }
  /** 异步获取用户基本信息 */
  async userInfoFetchDispatch() {
    this.appStore.changeLayoutLoadingStatus(true)
    try {
      const getData = await getUserInfoApi(getUserIdStorage())
      runInAction(() => {
        this.getUserInfo(getData.data)
      })
    } catch (error) {
      tokenExpired()
    } finally {
      runInAction(() => {
        // 清除全局的加载状态
        this.appStore.changeLayoutLoadingStatus(false)
        // 页面的刷新flag 为 false
        this.appStore.changeNeedUserInfoFlag(false)
      })
    }
  }
}
