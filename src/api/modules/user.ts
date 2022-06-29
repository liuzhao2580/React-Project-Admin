import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/shared/model'
import { IUserBaseInfo, ILoginParams, IUploadUserInfo } from '@/typescript/user/interface'
/** 用户登录 */
export const loginApi = (
  params: ILoginParams
): Promise<ResultModel<IUserBaseInfo>> => axios.post('user/login', params)

/** 获取用户的信息 */
export const getUserInfoApi = (
  id: string
): Promise<ResultModel<IUserBaseInfo>> => axios.get(`user/info/${id}`)

/**更新用户信息 */
export const uploadUserInfoApi = (id: string | number, params: IUploadUserInfo):Promise<ResultModel<IUserBaseInfo>> => axios.put(`user/${id}`, params)
