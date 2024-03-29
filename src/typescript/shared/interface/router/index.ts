import { FC } from 'react'
import { UserRolesEnum } from '@/typescript/shared/enum/user'
/** 路由 */
export interface IRouterList {
  /** 路由的地址 */
  path: string
  /** 路由的重定向地址 */
  redirect?: string
  /** 路由的元数据 */
  meta?: IMeta
  /** 路由组件 */
  component?: FC
  /** 子路由 */
  children?: Array<IRouterList>
}

/** 路由的元数据 */
export interface IMeta {
  /** 设置为 true 说明不在侧边栏显示 */
  hidden?: boolean
  /** 是否显示在面包屑中 默认true 显示 false 隐藏 */
  breadcrumbShowFlag?: boolean
  /** 面包屑是否可被点击 默认true 可以被点击 false 不可被点击 */
  breadcrumbClickFlag?: boolean
  /** 是否是详情页面 形式是 :id  显示在面包屑 */
  detailPageFlag?: boolean
  /** 是否固定 */
  exact?: boolean
  /** 侧边栏的名称 */
  title: string
  /** 侧边栏的图标 */
  icon?: FC | string
  /** 用户的权限
   * 如果没有设置,则代表所有的权限均可以访问
   */
  role?: UserRolesEnum
}
