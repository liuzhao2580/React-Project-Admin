import { handleActions } from '../utils'

const initailState = {
    // 侧边栏的状态
    sideStatus: false, // false 关闭 true 展开
}

const reducers = {
    CHANGE_sideStatus(state, action) {
        state.sideStatus = action.data
    }
}

export default (state = initailState, action) => 
    handleActions({
        state,
        action,
        reducers,
        namespace: "app"
    })
