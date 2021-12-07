import { createBrowserHistory } from 'history'
import { removeToken,removeUserId } from './modules/commonSave'
/** 一些常用的 工具类 */

/**
 * token 过期，用户需要重新登录，并且清除掉部分数据
 */
export const tokenExpired = () => {
  removeToken()
  removeUserId()
  const history = createBrowserHistory()
  history.replace('/login')
}


/** 深拷贝 */
export const deepCype = (obj: Object) => {
  // 首先 判断该对象是不是数据
  let result = Array.isArray(obj) ? [] : {}
  // 第二步 用于判断 传递的参数 是不是 一个对象
  if (obj && typeof obj === 'object') {
    // 遍历对象
    for (let key in obj) {
      /**
        hasOwnProperty() 方法会返回一个布尔值，
        指示对象自身属性中是否具有指定的属性（也就是是否有指定的键）
       */
      if (obj.hasOwnProperty(key)) {
        // 如果对象里面嵌套了对象，就再调用一次方法
        if (obj[key] && typeof obj[key] === 'object') {
          result[key] = deepCype(obj[key])
        } else {
          result[key] = obj[key]
        }
      }
    }
  }
  return result
}
