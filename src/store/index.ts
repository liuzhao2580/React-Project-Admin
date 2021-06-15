import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
// import logger from "redux-logger"
import thunk from 'redux-thunk'
import todoList from './modules/todoList/reducers'
import app from './modules/app/reducers'
import user from './modules/user/reducers'
const rootReducer = combineReducers({
  todoList,
  app,
  user
})
const setWindow: any = window
const composeHandle = setWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? setWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
// const applyMiddle = applyMiddleware(logger, thunk)
const applyMiddle = applyMiddleware(thunk)
const store = createStore(rootReducer, composeHandle(applyMiddle))

export default store
