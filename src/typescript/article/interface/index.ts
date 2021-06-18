import { EArticleStatus } from '../enum'

/** 存储在数据库中的 文章的基本格式 */
export interface IArticleBasic {
  /** 文章 id */
  id: string
  /** 文章 名称 */
  article_title: string
  /** 内容 */
  article_content: string
  /** 文章分类 id */
  article_categoryId: number
  /** 分类名称 */
  category_name: string
  /** 父级分类的id */
  category_parentId: number
  /** 父级分类的名称 */
  category_parentName: string
  /** 创建者 id */
  creator_id: number
  /** 创建时间 */
  article_time: Date
  /** 文章的状态 */
  status: EArticleStatus
  /** 更新时间 */
  article_update_time: Date
}

/** 文章分类 */
export interface IArticleCategory {
  /** 分类id */
  id: string
  /** 分类名称 */
  category_name: string
  /** 二级分类中,一级分类的id */
  parent_id: string
}

/** 用户新增/编辑文章需要传递的数据 */
export interface IArticleInsert {
  /** 文章id */
  id?: number
  /** 用户id */
  userId: IArticleBasic['creator_id']
  /** 文章标题 */
  article_title: IArticleBasic['article_title']
  /** 文章内容 */
  article_content: IArticleBasic['article_content']
  /** 文章类别 id */
  article_categoryId: IArticleBasic['article_categoryId']
}
