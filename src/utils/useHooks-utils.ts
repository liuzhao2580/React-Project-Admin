/** 用来定义一些常用的 hooks 函数 */
import { useEffect } from 'react'

/** 定义只在 页面加载的时候触发 useEffect */
export const useMount = callback => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback, [])
}
