import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootStore from './store'

// 导入全局样式
import '@/styles/index.less'

const composeHandle = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const applyMiddle = applyMiddleware(logger, thunk)
const store = createStore(rootStore, composeHandle(applyMiddle))
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)
serviceWorker.unregister()
