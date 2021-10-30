import axios from '../axiosConfig'
import { BaseQueryModel, ResultModel, TableListResultModel } from '@/typescript/shared/model'
import {
  IArticleBasic,
  IArticleCategory,
  IArticleInsert
} from '@/typescript/article/interface'
import { ArticleCategoryModel } from '@/typescript/article/model'
/** 获取文章列表数据 */
export const articleListApi = (
  params: BaseQueryModel
): Promise<ResultModel<IArticleBasic[]>> => axios.post('/article/list', params)

/** 获取 文章的分类数据-按照表格类型 */
export const getArticleCategoryListApi = (params: ArticleCategoryModel): Promise<ResultModel<TableListResultModel<IArticleCategory>>> =>
  axios.post(`/article-category/list`, params)

/** 文章新增 */
export const articleInsertApi = (
  params: IArticleInsert
): Promise<ResultModel<any>> => axios.post(`/article/insert`, params)

/** 文章删除 */
export const articleDeleteApi = (id: string): Promise<ResultModel<any>> =>
  axios.delete(`/article/delete/${id}`)
