import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/modules/commonSave'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { ResultModel } from '@/typescript/shared/model'
import { tokenExpired } from '@/utils'
/** 使用 unicloud 的 请求地址 */
const axiosConfig = axios.create({
  // baseURL,
  timeout: 60000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

// 发送请求之前的拦截
axiosConfig.interceptors.request.use(config => {
  if(config.url) {
    // 说明是 http开头 不需要拼接
    if(/^(\/)?http/.test(config.url) === false) {
      config.url = '/api/' + config.url
      config.headers.Authorization = getToken()
    }
  }
  return config
})

// 接收数据之前的拦截
axiosConfig.interceptors.response.use(
  response => {
    const { status } = response
    const data: ResultModel<any> = response.data

    return new Promise((resolve, reject) => {
      const errorMsg = '请求失败: ' + data.msg || '未知错误'
      // 说明是成功的请求
      if (status === 200) {
        if (data.code === ResultCodeEnum.SUCCESS) {
          resolve(response.data)
        }
        // 说明 token 不正确了, 需要清空数据，跳转到登录页面
        else if (data.code === ResultCodeEnum.TOKEN_ERROR) {
          message.error(errorMsg)
          tokenExpired()
        } 
        else {
          message.error(errorMsg)
          reject(errorMsg)
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
    message.error('请求出错: ' + error)
    return Promise.reject(error)
  }
)

export default axiosConfig
