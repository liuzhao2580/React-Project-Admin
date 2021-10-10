import { MUserInfo } from "@/typescript/user/modules/userInfo"

export interface IUserState {
  userInfo: MUserInfo
}

const userState : IUserState= {
  /** 获取用户的基本信息 */
  userInfo: new MUserInfo()
}
export default userState
