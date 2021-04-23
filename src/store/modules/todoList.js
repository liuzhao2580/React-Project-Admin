import { handleActions } from "../utils"
// state
const initialState = {
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
  insertList(state, action) {
    console.log(action, "action")
    // state.list.push(action.data)
  },
}
export default (state = initialState, action) =>
  handleActions({
    state,
    action,
    reducers,
    namespace: "todoList",
  })
