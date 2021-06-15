/** 使用 cookies 或者 localStorage 存储常用的数据 */
import { encryptByAES, decryptByAES } from '.'
import { setCookie, getCookie } from './cookies'
import { setStorage, getStorage } from './storage'
/** 用户的基本信息 */
const USER_ID = 'userId'
/** token */
const TOKEN = 'token'
const CSRF_TOKEN = 'csrfToken'

// -----------------------------------------------------cookies--------------------------------------------------

/** 设置token */
export const setTokenCookies = token => {
  setCookie(TOKEN, token)
}

/** 获取token */
export const getTokenCookies = () => getCookie(TOKEN)

/** 获取 csrfToken */
export const getCSRFTokenCookies = () => getCookie(CSRF_TOKEN)
// -----------------------------------------------------cookies--------------------------------------------------

// -----------------------------------------------------localStorage--------------------------------------------------
/** 设置用户 id */
export const setUserIdStorage = (userId: number) => {
  setStorage(USER_ID, encryptByAES(userId.toString()), '1D')
}
/** 获取用户 id */
export const getUserIdStorage = () => decryptByAES(getStorage(USER_ID))
// -----------------------------------------------------localStorage--------------------------------------------------
