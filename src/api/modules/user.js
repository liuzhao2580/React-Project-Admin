import axios from '../axiosConfig'

/** 用户登录 */
export const loginApi = params => axios.post('/login', params)
/** 获取用户的信息 */
export const getUserInfoApi = id => axios.get(`/userInfo/${id}`)
