/** 1. 用户基本信息的接口 */
export interface IUserBaseInfo {
  /** 用户 id */
  id: string
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

/** 2. 用户登录 */
export interface ILoginParams {
  userName: string
  password: string | number
}

/** 3. 修改用户信息 */
export interface IUploadUserInfo {
  /** 昵称 */
  nickName?: string
  /** 头像 */
  avatar?: string
  /** 性别 true代表 男  false代表女 */
  gender?: boolean
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
}
