import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd';
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import 'antd/dist/antd.css';

const store = createStore(rootReducer, applyMiddleware(logger, thunk))
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider>
        <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)
serviceWorker.unregister()
