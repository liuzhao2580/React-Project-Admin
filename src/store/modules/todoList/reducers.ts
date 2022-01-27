import produce from 'immer'
import initState from './state'
import ACTIONS_TYPE from './actions-type'


const reducers = (state = initState, action: { type: string; data: any }) =>
  produce(state, draft => {
    switch (action.type) {
    /** 添加 todolist */
    case ACTIONS_TYPE.ADD_TODOLIST:
      draft.list.push(action.data)
      break
    default:
      return state
    }
  })

export default reducers
