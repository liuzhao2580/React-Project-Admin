import { handleActions } from "../utils"
// state
const initState = {
  inputValue: "hello world",
  list: [
    {
      key: 1,
      title: "Vue",
    },
    {
      key: 2,
      title: "React",
    },
    {
      key: 3,
      title: "Angular",
    },
  ],
}

// reducer
const reducers = {
  InsertList(state, action) {
    if (action.data) {
      state.list.push({
        key: new Date().getTime(),
        title: action.data,
      })
    }
  },
}
export default (state = initState, action) =>
  handleActions({
    state,
    action,
    reducers,
    namespace: "todoList",
  })
