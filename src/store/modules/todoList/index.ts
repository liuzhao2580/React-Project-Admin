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
  /** 返回 antd-list 的数据, 使用 computed 的方式处理, 并且还要调用 slice 方法, 才可以让 antd-list 实时变化 */
  get dataSourceTodoList() {
    return this.list.slice()
  }
  /** 新增 */
  insertTodoList(item) {
    this.list.push(item)
  }
}
