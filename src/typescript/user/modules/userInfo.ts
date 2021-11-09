import { UserRolesEnum } from "../enum"
import {IUserBaseInfo} from "../interface/index"

export class MUserInfo implements IUserBaseInfo  {
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
