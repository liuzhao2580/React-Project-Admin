import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import todoList from './modules/todoList'
const rootReducer = combineReducers({
    todoList
})
const composeHandle = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const applyMiddle = applyMiddleware(logger, thunk)
const store = createStore(rootReducer, composeHandle(applyMiddle))

const _dispatch = store.dispatch
store.dispatch = (type, data) => _dispatch({ type, data })
export default store