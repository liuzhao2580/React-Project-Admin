import { combineReducers } from 'redux'
import todoList from './modules/todoList'
const rootReducer = combineReducers({
    todoList
})
export default rootReducer