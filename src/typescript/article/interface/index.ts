import { EArticleStatus } from '../enum'

/** 存储在数据库中的 文章的基本格式 */
export interface IArticleBasic {
  /** 文章 id */
  id: string
  /** 文章 名称 */
  title: string
  /** 内容 */
  content: string
  /** 文章分类 id */
  categoryId: string
  /** 分类名称 */
  categoryName: string
  /** 父级分类的id */
  categoryParentId: number
  /** 父级分类的名称 */
  categoryParentName: string
  /** 创建者 id */
  userId: string
  /** 创建时间 */
  createTime: Date
  /** 文章的状态 */
  status: EArticleStatus
  /** 更新时间 */
  updateTime: Date
}

/** 文章分类 */
export interface IArticleCategory {
  /** 分类id */
  id: string
  /** 分类名称 */
  categoryName: string
  /** 分类的级别 */
  level: number,
  /** 二级分类中,一级分类的id */
  parent_id: string
}

/** 用户新增需要传递的数据 */
export interface IArticleInsert {
  /** 文章id */
  id?: number
  /** 用户id */
  userId: IArticleBasic['userId']
  /** 文章标题 */
  title: IArticleBasic['title']
  /** 文章内容 */
  content: IArticleBasic['content']
  /** 文章类别 id */
  categoryId: IArticleBasic['categoryId']
}
