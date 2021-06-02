/** 使用 cookies 或者 localStorage 存储常用的数据 */
import { setCookie, getCookie } from './cookies'
import { setStorage, getStorage } from './storage'
/** 用户的基本信息 */
const USER_INFO = 'userInfo'
/** token */
const TOKEN = 'token'

// -----------------------------------------------------cookies--------------------------------------------------

/** 设置token */
export const setTokenCookies = token => {
  setCookie(TOKEN, token)
}

/** 获取token */
export const getTokenCookies = () => getCookie(TOKEN)
// -----------------------------------------------------cookies--------------------------------------------------

// -----------------------------------------------------localStorage--------------------------------------------------
/** 设置用户信息 */
export const setUserInfoStorage = userInfo => {
  setStorage(USER_INFO, userInfo, '1D')
}
/** 获取用户信息 */
export const getUserInfoStorage = () => getStorage(USER_INFO)
// -----------------------------------------------------localStorage--------------------------------------------------
