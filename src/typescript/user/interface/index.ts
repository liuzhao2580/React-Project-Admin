/** 1. 用户基本信息的接口 */
export interface IUserBaseInfo {
  /** 用户 id */
  id: number
  /** 用户名 */
  userName: string
  /** 昵称 */
  nickName?: string
  /** 用户的权限 */
  roleId: number
  /** 头像 */
  avatar: string
  /** 性别 true代表 男  false代表女 */
  gender: boolean
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** token */
  token?: string
}

/** 用户登录 */
export interface ILoginParams {
  userName: string
  password: string | number
}
