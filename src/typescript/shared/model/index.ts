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
}

/**
 * 2.表格请求的参数
 */
export class BaseQueryModel {
  /** 当前页 */
  pageNum = 1
  /** 每页条数 */
  pageSize = 10

  constructor(pageNum = 1, pageSize = 10 ) {
    this.pageNum = pageNum
    this.pageSize = pageSize
  }
}

/**
 * 3.表格中分页器的数据
 */
export class PageModel {
  /** 当前页 */
  current: number
  /** 一页的数据 */
  size: number
  /** 总页数 */
  total: number
  /** 总页数 */
  pages: number
  constructor(current = 1,size = 10,total = 0,pages = 1 ) {
    this.current = current
    this.size = size
    this.total = total
    this.pages = pages
  }
}

/**
 * 4.表格统一的返回参数格式
 */
export class TableListResultModel<T> extends PageModel {
  /** 数据存放 */
  records: Array<T> = []
}

