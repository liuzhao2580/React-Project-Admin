import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
// import logger from "redux-logger"
import thunk from 'redux-thunk'


const autoRequiredModule = {}

function importAll(r) {
  r.keys().forEach((key:string) => {
    const getKey = key.split('/')[1]
    autoRequiredModule[getKey] = r(key).default
  })
}
// @ts-ignore
// 可以获取当前指定文件夹下面的文件,第二个参数设置为true,代表递归寻找
importAll(require.context('./modules', true, /reducers\.ts$/))

const rootReducer = combineReducers(autoRequiredModule)
const setWindow: any = window
const composeHandle = setWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? setWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
// const applyMiddle = applyMiddleware(logger, thunk)
const applyMiddle = applyMiddleware(thunk)
const store = createStore(rootReducer, composeHandle(applyMiddle))

export default store
