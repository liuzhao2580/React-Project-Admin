import axios from '../axiosConfig'
import {
  ResultModel,
  TableListResultModel
} from '@/typescript/shared/model'
import {
  IArticleBasic,
  IArticleCategory,
  IArticleCategoryByLazy
} from '@/typescript/article/interface'
import {
  ArticleCategoryModel,
  ArticleInsertOrEditModel,
  ArticleListParamsModel
} from '@/typescript/article/model'
/** 获取文章列表数据 */
export const articleListApi = (
  params: ArticleListParamsModel
): Promise<ResultModel<TableListResultModel<IArticleBasic>>> =>
  axios.post('/article/list', params)

/** 获取 文章的分类数据-按照表格类型 */
export const getArticleCategoryListApi = (
  params: ArticleCategoryModel
): Promise<ResultModel<TableListResultModel<IArticleCategory>>> =>
  axios.post(`/article-category/list`, params)

/** 获取 查询文章分类数据-按照level */
export const getArticleCategoryByLevelApi = (
  level: number
): Promise<ResultModel<Array<IArticleCategory>>> =>
  axios.get(`/article-category/${level}`)

/** 懒加载的形式   获取文章的数据 */
export const getArticleCategoryByLazyApi = (
  params: IArticleCategoryByLazy
): Promise<ResultModel<IArticleCategory[]>> =>
  axios.post('/article-category/lazy-tree', params)

/** 文章新增\编辑 */
export const articleSaveOrUpdateApi = (
  params: ArticleInsertOrEditModel
): Promise<ResultModel<any>> => axios.post(`/article/saveOrUpdate`, params)

/** 文章删除 */
export const articleDeleteApi = (id: string): Promise<ResultModel<any>> =>
  axios.delete(`/article/${id}`)

/** 获取文章数据----根据id */
export const getArticleDetailsByIdApi = (
  id: string
): Promise<ResultModel<IArticleBasic>> => axios.get(`/article/${id}`)
