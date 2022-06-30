import { UserRolesEnum } from "@/typescript/shared/enum/user"
import { IUploadUserInfo, IUserBaseInfo } from "@/typescript/shared/interface/user"

export class MUserInfo implements IUserBaseInfo {
  /** 用户 id */
  id
  /** 用户名 */
  userName
  /** 昵称 */
  nickName
  /** 用户的权限 */
  roleId = UserRolesEnum.user
  /** 头像 */
  avatar
  /** 性别 true代表 男  false代表女 */
  gender = true
  /** 手机号 */
  phone?
  /** 邮箱 */
  email?
  /** token */
  token?
}

/** 更新用户资料 */
export class MUploadUserInfo implements IUploadUserInfo {
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