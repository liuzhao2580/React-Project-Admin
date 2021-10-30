import { BaseQueryModel } from "@/typescript/shared/model";

/** 文章分类的列表查询 */
export class ArticleCategoryModel extends BaseQueryModel {
  /** 级别 */
  level?: number = 1
}
