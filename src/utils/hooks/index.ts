/** 公用的hooks */
import {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

import { ResultCodeEnum } from '@/typescript/shared/enum'
import { ResultModel, TableListResultModel } from '@/typescript/shared/model'
import { PageModel } from '@/typescript/shared/model'

/** 自定义设置 useState */
export const useStateHooks = <T>(initState) => {
  const [state, setState] = useState<T>(initState)
  let isUpdate = useRef<any>()
  const setUseState = (state, cb) => {
    setState(prev => {
      isUpdate.current = cb
      return typeof state === 'function' ? state(prev) : state
    })
  }
  useEffect(() => {
    if (isUpdate.current) {
      isUpdate.current()
    }
  })
  return [state, setUseState]
}


/** 返回的元组
 * 表格的列表
 * 分页器的实例
 * 表格的加载状态
 * 修改表格的 setHooks
 */
type ToupleTable<T> = [Array<T>, PageModel, boolean ,Dispatch<SetStateAction<Array<T>>>?]

/** 用来统一处理表格的 自定义 hooks */
export const useTableHooks = <T, E>(
  callback: (params: E) => Promise<ResultModel<TableListResultModel<T>>>,
  params: E
): ToupleTable<T> => {
  // 表格的数据
  const [tableList, setTableList] = useState<Array<T>>(() => [])
  // 分页器的实例
  const [pageParams, setPageParams] = useState<PageModel>(() => new PageModel())
  // 表格的加载状态
  const [loading, setLoading] = useState<boolean>(()=> false)

  const getTableList = async function() {
    setLoading(true)
    try {
      const data = await callback(params)
      if (data.code === ResultCodeEnum.SUCCESS) {
        setTableList(data.data.records)
        setPageParams(data.data)
      }
    } catch (error) {
      console.log(error, "")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTableList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  return [tableList, pageParams, loading]
}
