import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/model'
import { IArticleBasic } from '@/typescript/article/interface'
/** 获取数据 */
export const articleListApi = (): Promise<ResultModel<IArticleBasic[]>> =>
  axios.get('/article/list')

/** 获取用户的信息 */
// export const getUserInfoApi = (id: number | string) =>
//   axios.get(`/userInfo/${id}`)
