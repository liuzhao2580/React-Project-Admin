import ACTIONS_TYPE from './actions-type'

const actions = {
  /** 新增 todolist */
  insertTodoList(data) {
    return {
      type: ACTIONS_TYPE.ADD_TODOLIST,
      data
    }
  }
}

export default actions
