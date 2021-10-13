/** 一些基本的公共枚举 */

/** 1. 请求的状态参数返回的枚举 */
export enum ResultCodeEnum {
  /** 成功 0 */
  SUCCESS = 0,
  /**
   * 失败 100
   */
  ERROR = 100,
  /**
   * 服务器的失败
   */
  SERVER_ERROR = 500,
  /** token 不合法 */
  TOKEN_ERROR = 50001
}
