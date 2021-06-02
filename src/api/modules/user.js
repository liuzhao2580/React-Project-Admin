import axios from '../axiosConfig'

/** 用户登录 */
export const loginApi = params => {
  return axios.post('/login', params)
}
