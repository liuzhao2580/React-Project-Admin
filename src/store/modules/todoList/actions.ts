import ACTIONS_TYPE from './actions-type'

export default {
  /** 新增 todolist */
  insertTodoList(data) {
    return {
      type: ACTIONS_TYPE.ADD_TODOLIST,
      data
    }
  }
}
