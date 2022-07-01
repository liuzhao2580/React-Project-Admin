/**
 * action 的类型
 */
export interface IAction<T> {
  type: string,
  data: T
}

