import { ROUTE_PATH, ROUTE_TITLE } from '@/routes/RouteConst'
import { createBrowserHistory } from 'history'
import { removeToken, removeUserId } from './modules/commonSave'
import { basePath } from '@/setting'
/** 一些常用的 工具类 */

/** 退出登录之前, 清除保存的数据 */
export const clearLoginData = () => {
  removeToken()
  removeUserId()
}

/**
 * token 过期，用户需要重新登录，并且清除掉部分数据
 */
export const tokenExpired = () => {
  clearLoginData()
  toLoginPage()
}

/** 跳转到登录页面 */
export const toLoginPage = () => {
  const history = createBrowserHistory()
  history.replace(`/${basePath}/login`)
}

/** 通过路由path 获取路由的title */
export const getRouteTitle = (routePath: string): string => {
  let getKey = ''
  for (const key in ROUTE_PATH) {
    const path = ROUTE_PATH[key]
    if (path === routePath) {
      getKey = key
      break
    }
  }
  return ROUTE_TITLE[getKey]
}

type keyType = string | number | undefined
/** ts中的枚举字段 转换为枚举中文字段 */
export function EnumFieldToTransformText<
  T extends Record<string, keyType>,
  S extends Record<string, keyType>
>(enumField: T, enumTransform: S, field: keyType) {
  if(!field) return
  let getFindKey = ''
  for (const key in enumField) {
    const element = enumField[key]
    if(element === field) {
      getFindKey = key
      break
    }
  }
  const getTextValue = enumTransform[getFindKey]
  if(getTextValue) return getTextValue
  else console.warn('错误,未匹配到')
}

/** 深拷贝 */
export const deepCype = (obj: Record<string, any>) => {
  // 首先 判断该对象是不是数据
  const result = Array.isArray(obj) ? [] : {}
  // 第二步 用于判断 传递的参数 是不是 一个对象
  if (obj && typeof obj === 'object') {
    // 遍历对象
    for (const key in obj) {
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
