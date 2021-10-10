import {IUserBaseInfo} from "../interface/index"

export class MUserInfo implements IUserBaseInfo  {
  /** 用户 id */
  id
  /** 用户名 */
  userName
  /** 昵称 */
  nickName
  /** 用户的权限 */
  roleId
  /** 头像 */
  avatar
  /** 手机号 */
  phone?
  /** 邮箱 */
  email?
  /** token */
  token?
}
