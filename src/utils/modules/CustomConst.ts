/** 定义常用常量 */
class CustomConst {
  /** 用户相关 */
  UserConst = new Map<number, string>([
    [1, '超级管理员'],
    [2, '管理员'],
    [3, '普通用户']
  ])
  /** 文章相关 */
  ArticleConst = new Map<number, string>([
    [-1, '已删除'],
    [0, '待审核'],
    [1, '草稿箱'],
    [2, '被驳回'],
    [3, '已发布'],
  ])
}
export default CustomConst
