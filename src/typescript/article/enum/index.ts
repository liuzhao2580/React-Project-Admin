/** 文章的状态 */
export enum EArticleStatus {
  /** 已删除 */
  removed = -1,
  /** 待审核 */
  peddingReview = 0,
  /** 草稿箱 */
  draft = 1,
  /** 被驳回 */
  reject = 2,
  /** 已发布 */
  publiced = 3
}
