/** 使用 cookies 或者 localStorage 存储常用的数据 */
import { setStorage, getStorage, removeStorage } from './storage'
/** 用户的基本信息 */
const USER_ID = 'userId'
/** token */
const TOKEN = 'token'

// -----------------------------------------------------localStorage--------------------------------------------------

// -----------------------------------------------------token---------------------------------
/** 设置token */
export const setToken = token => {
  setStorage(TOKEN, token)
}

/** 获取token */
export const getToken = () => getStorage(TOKEN)

/** 删除 token */
export const removeToken = () => removeStorage(TOKEN)

// -----------------------------------------------------token---------------------------------


/** 设置用户 id */
export const setUserIdStorage = (userId: number) => {
  setStorage(USER_ID, userId, '1D')
}
/** 获取用户 id */
export const getUserIdStorage = (): string => {
  const getResult = getStorage(USER_ID)
  if(getResult !== 'undefined') {
    return JSON.parse(getStorage(USER_ID))
  }
  else return ""
}

/** 删除 用户id */
export const removeUserId = () => removeStorage(USER_ID)
// -----------------------------------------------------localStorage--------------------------------------------------
