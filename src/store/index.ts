import { createContext, useContext } from 'react'
import AppStore from './modules/app'
import UserStore from './modules/user'
import TodoListStore from './modules/todoList'

class RootState {
  appStore: AppStore
  userStore: UserStore
  todoListStore: TodoListStore
  constructor() {
    this.appStore = new AppStore()
    this.userStore = new UserStore(this.appStore)
    this.todoListStore = new TodoListStore()
  }
}

const rootStore = new RootState()
const context = createContext(rootStore)
const useStore = () => useContext(context)
export { useStore }
