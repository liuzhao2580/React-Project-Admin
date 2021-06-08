import initState from './state'
import ACTIONS_TYPE from './actions-type'

export default (state = initState, action) => {
  switch (action.type) {
    /** 添加 todolist */
    case ACTIONS_TYPE.ADD_TODOLIST:
      return {
        ...state
      }

    default:
      return state
  }
}
