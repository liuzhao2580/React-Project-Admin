import axios from '../axiosConfig'
import { ListRequestModel, ResultModel } from '@/typescript/shared/model'
import {
  IArticleBasic,
  IArticleCategory,
  IArticleInsert
} from '@/typescript/article/interface'
/** 获取文章列表数据 */
export const articleListApi = (
  params: ListRequestModel
): Promise<ResultModel<IArticleBasic[]>> => axios.post('/article/list', params)

/** 获取 文章的分类数据 */
export const getArticleCategoryApi = (params: {
  level: number
  id?: string
}): Promise<ResultModel<IArticleCategory[]>> =>
  axios.post(`/article/category`, params)

/** 文章新增 */
export const articleInsertApi = (
  params: IArticleInsert
): Promise<ResultModel<any>> => axios.post(`/article/insert`, params)

/** 文章删除 */
export const articleDeleteApi = (id: string): Promise<ResultModel<any>> =>
  axios.delete(`/article/delete/${id}`)
