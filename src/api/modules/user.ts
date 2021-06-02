import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/model'
import {
  IUserBaseInfo,
  ILoginParams
} from '@/typescript/interface/user/user-interface'
/** 用户登录 */
export const loginApi = (
  params: ILoginParams
): Promise<ResultModel<IUserBaseInfo>> => axios.post('/login', params)

/** 获取用户的信息 */
export const getUserInfoApi = (id: number | string) =>
  axios.get(`/userInfo/${id}`)
