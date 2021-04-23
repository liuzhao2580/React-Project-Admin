import axios from "../axiosConfig"
// 登录之前获取 CSRFToken
export const getCSRFToken = () => {
  return axios.get("/CSRFToken")
}
// 用户登录
export const loginApi = params => {
  return axios.post("/login", params)
}
