import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import App from './App'
import * as serviceWorker from './serviceWorker'
// 导入全局样式
import '@/assets/styles/index.scss'
// 引入 svg 的字体图标
import '@/assets/styles/iconfont-svg'
// 引入 rem布局
// import '@/utils/flexible.js'

message.config({
  maxCount: 1
})
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
)
serviceWorker.unregister()
