import { IUploadUserInfo } from "../interface";

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