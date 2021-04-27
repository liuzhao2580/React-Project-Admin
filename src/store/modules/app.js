import { handleActions } from "../utils"

const initailState = {
  // 侧边栏的状态
  sideStatus: false, // false 关闭 true 展开
}

const reducers = {
  // 修改侧边栏状态
  CHANGE_sideStatus(state, { data }) {
    state.sideStatus = data
  },
}

export default (state = initailState, action) =>
  handleActions({
    state,
    action,
    reducers,
    namespace: "app",
  })
