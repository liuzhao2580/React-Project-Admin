import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import store from './store'

// 导入全局样式
import '@/assets/styles/index.scss'
// 引入 svg 的字体图标
import "@/assets/styles/iconfont-svg"
// 引入 rem布局
// import '@/utils/flexible.js'

message.config({
  maxCount: 1
})

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN} >
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
