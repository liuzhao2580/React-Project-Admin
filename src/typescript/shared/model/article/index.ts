import { BaseQueryModel } from '@/typescript/shared/model'
import { getUserIdStorage } from '@/utils/modules/commonSave'
import { EArticleSaveType, EArticleStatus } from '@/typescript/shared/enum/article'
import { IArticleBasic } from '@/typescript/shared/interface/article'

/** 文章分类的列表查询 */
export class ArticleCategoryModel extends BaseQueryModel {
  /** 级别 */
  level?: number = 1
}

/** 文章列表 查询 */
export class ArticleListParamsModel extends BaseQueryModel {
  /** 关键字 */
  title?: string
  /** 文章状态 */
  status?: EArticleStatus
  /** 文章分类 */
  categoryId?: string
  /** 时间 */
  time?: Array<Date>
}

/** 文章新增 编辑 */
export class ArticleInsertOrEditModel {
  /** 文章id */
  id?: number
  /** 用户id */
  userId: IArticleBasic['userId'] = getUserIdStorage()
  /** 文章标题 */
  title: IArticleBasic['title'] = ''
  /** 文章内容 */
  content: IArticleBasic['content'] = ''
  /** 文章类别 id */
  categoryId: IArticleBasic['categoryId'] = ''
  /** 文章封面 */
  coverImages: IArticleBasic['coverImages'] ={
    size: 0,
    images: ['']
  }
  /** 文章状态 新增的时候只有两种状态,草稿和审核 */
  status: EArticleSaveType = EArticleSaveType.comfirm
}
