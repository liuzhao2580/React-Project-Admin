import axios from 'axios'
import { message } from 'antd'
import { getTokenCookies } from '@/utils/commonSave'
import { ResultCodeEnum } from '@/typescript/shared/enum'
const axiosConfig = axios.create({
  baseURL: '/proxy',
  timeout: 60000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: getTokenCookies()
  }
})

// 发送请求之前的拦截
axiosConfig.interceptors.request.use(config => {
  return config
})

// 接收数据之前的拦截
axiosConfig.interceptors.response.use(
  response => {
    console.log(response, '')
    const { status, data } = response
    // 说明是成功的请求
    if (status === ResultCodeEnum.success) {
    }
    // 说明是失败的请求
    else message.error('请求失败：' + data.msg || '未知错误')
    return response.data
  },
  error => {
    message.error('请求出错：' + error)
    return Promise.reject(error)
  }
)

export default axiosConfig
