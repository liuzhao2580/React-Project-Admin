import IUserState from "@/typescript/store/modules/user"
import { MUserInfo } from "@/typescript/user/modules/userInfo"


export default class UserState implements IUserState  {
  /** 获取用户的基本信息 */
  userInfo = new MUserInfo()
}
