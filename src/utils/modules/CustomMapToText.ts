import { EArticleStatus } from "@/typescript/article/enum"
import { UserRolesEnum } from "@/typescript/user/enum"

/** 定义常用 map 对象,处理键值对转换为 文字 */
class CustomMapToText {
  /** 用户相关 */
  UserConst = new Map<number, string>([
    [UserRolesEnum.superAdmin, '超级管理员'],
    [UserRolesEnum.admin, '管理员'],
    [UserRolesEnum.user, '普通用户']
  ])
  /** 文章相关 */
  ArticleConst = new Map<number, string>([
    [EArticleStatus.DELETED, '已删除'],
    [EArticleStatus.REVIEWED, '待审核'],
    [EArticleStatus.DRAFT, '草稿箱'],
    [EArticleStatus.REJECT, '被驳回'],
    [EArticleStatus.PUBLISHED, '已发布'],
  ])
}
export default CustomMapToText
