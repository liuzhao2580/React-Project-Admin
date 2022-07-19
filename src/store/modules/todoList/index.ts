import { makeAutoObservable } from 'mobx'
export default class TodoListStore {
  list = [
    {
      key: 1,
      title: 'Vue'
    },
    {
      key: 2,
      title: 'React'
    },
    {
      key: 3,
      title: 'Angular'
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  /** 新增 */
  insertTodoList(item) {
    this.list.push(item)
  }
}
