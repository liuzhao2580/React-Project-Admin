/** 文章的状态 */
export enum EArticleStatus {
  /** 已删除 */
  '已删除' = -1,
  /** 待审核 */
  '待审核' = 0,
  /** 草稿箱 */
  '草稿箱' = 1,
  /** 被驳回 */
  '被驳回' = 2,
  /** 已发布 */
  '已发布' = 3
}

/** 编辑 新增文章时，保存为草稿还是 提交 */
export enum EArticleSaveType {
  /** 提交 审核 */
  comfirm = 0,
  /** 保存为草稿 */
  draft = 1
}
