import { createContext, useContext } from 'react'
import AppStore from './modules/app'
import UserStore from './modules/user'

class RootState {
  appStore: AppStore
  userStore: UserStore
  constructor() {
    this.appStore = new AppStore()
    this.userStore = new UserStore()
  }
}

const rootStore = new RootState()
const context = createContext(rootStore)
const useStore = () => useContext(context)
export { useStore }
