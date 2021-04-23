import axios from "axios"
import { message } from "antd"
import { getCookie } from "@/utils/cookies"
const axiosConfig = axios.create({
  baseURL: "/proxy",
  timeout: 60000,
  headers: {
    "X-Custom-Header": "foobar",
  },
})

// 发送请求之前的拦截
axiosConfig.interceptors.request.use(config => {
  config.headers["x-csrf-token"] = getCookie("csrfToken")
  return config
})

// 接收数据之前的拦截
axiosConfig.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    message.error("请求出错：" + error)
    return Promise.reject(error)
  },
)

export default axiosConfig
