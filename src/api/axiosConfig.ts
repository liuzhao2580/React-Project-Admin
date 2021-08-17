import axios from 'axios'
import { message } from 'antd'
import { getTokenCookies, getCSRFTokenCookies } from '@/utils/commonSave'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { ResultModel } from '@/typescript/shared/model'
/** 使用 unicloud 的 请求地址 */
const baseURL = 'https://50f2e90e-f860-4396-bbc7-b912e93fa987.bspapp.com'
const axiosConfig = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

// 发送请求之前的拦截
axiosConfig.interceptors.request.use(config => {
  config.headers.Authorization = getTokenCookies()
  config.headers['x-csrf-token'] = getCSRFTokenCookies()
  // 说明是使用 uniapp 的 uniCloud 发送请求
  config.headers.isunicloud = true
  return config
})

// 接收数据之前的拦截
axiosConfig.interceptors.response.use(
  response => {
    const { status } = response
    const data: ResultModel<any> = response.data

    return new Promise((resolve, reject) => {
      const errorMsg = '请求失败：' + data.msg || '未知错误'
      // 说明是成功的请求
      if (status === 200) {
        if (data.code !== ResultCodeEnum.success) {
          message.error(errorMsg)
          reject(errorMsg)
        } else {
          resolve(response.data)
        }
      }
      // 说明是失败的请求
      else {
        message.error(errorMsg)
        reject(errorMsg)
      }
    })
  },
  error => {
    message.error('请求出错：' + error)
    return Promise.reject(error)
  }
)

export default axiosConfig
