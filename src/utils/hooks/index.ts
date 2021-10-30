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

type ToupleTable<T> = [Array<T>, PageModel, Dispatch<SetStateAction<Array<T>>>?]

export const useTableHooks = <T, E>(
  callback: (params: E) => Promise<ResultModel<TableListResultModel<T>>>,
  params: E
): ToupleTable<T> => {
  const [tableList, setTableList] = useState<Array<T>>(() => [])
  const [pageParams, setPageParams] = useState<PageModel>(() => new PageModel())

  const getTableList = async function() {
    const data = await callback(params)
    if (data.code === ResultCodeEnum.SUCCESS) {
      setTableList(data.data.records)
      setPageParams(data.data)
    }
  }
  useEffect(() => {
    getTableList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  return [tableList, pageParams]
}
