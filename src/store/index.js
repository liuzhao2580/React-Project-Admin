import { combineReducers } from 'redux'
import userReducer from './modules/todoList'
const rootReducer = combineReducers({
    userReducer
})
export default rootReducer