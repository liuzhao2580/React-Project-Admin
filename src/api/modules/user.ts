import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/shared/model'
import { IUserBaseInfo, ILoginParams } from '@/typescript/user/interface'
/** 用户登录 */
export const loginApi = (
  params: ILoginParams
): Promise<ResultModel<IUserBaseInfo>> => axios.post('user/login', params)

/** 获取用户的信息 */
export const getUserInfoApi = (id: string) =>
  axios.get(`hello`,{params: {id}})
