/** 提供公共的 model */

import { ResultCodeEnum } from "../enum"

/**
 * 1. 返回参数的 model
 */
export class ResultModel<T> {
  /** 返回的状态码 */
  public code!: ResultCodeEnum
  /** 返回的消息*/
  public msg!: string
  /** 返回的数据 T 可能是数组、对象 */
  public data!: T
  /** 如果是列表 返回有分页页码 */
  public pageNum?: number
  /** 如果是列表 返回有分页每页条数 */
  public pageSize!: number
  /** 如果是列表 返回有数据总条数 */
  public total!: number
}

/**
 * 2.列表请求的参数
 */
export class ListRequestModel {
  /** 当前页 */
  pageNum: number = 1
  /** 每页条数 */
  pageSize: number = 10
  /** 关键字 */
  keyWord?: string
  constructor(pageNum?, pageSize?) {
    this.pageNum = pageNum
    this.pageSize = pageSize
  }
}
