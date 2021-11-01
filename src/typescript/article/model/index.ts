import { BaseQueryModel } from "@/typescript/shared/model";
import { EArticleStatus } from "../enum";

/** 文章分类的列表查询 */
export class ArticleCategoryModel extends BaseQueryModel {
  /** 级别 */
  level?: number = 1
}

/** 文章列表 查询 */
export class ArticleListParamsModel extends BaseQueryModel {
  /** 关键字 */
  keyWord?:string
  /** 文章状态 */
  status?:EArticleStatus
  /** 文章分类 */
  /** 时间 */
  time?:Date
}


