import axios from '../axiosConfig'
import { ResultModel } from '@/typescript/model'
import {
  IArticleBasic,
  IArticleCategory,
  IArticleInsert
} from '@/typescript/article/interface'
/** 获取文章列表数据 */
export const articleListApi = (): Promise<ResultModel<IArticleBasic[]>> =>
  axios.get('/article/list')

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
