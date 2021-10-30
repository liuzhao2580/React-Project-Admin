
/** 公用的hooks */
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { ResultCodeEnum } from '@/typescript/shared/enum'
import { ResultModel, TableListResultModel } from '@/typescript/shared/model'


export const useTableHooks = <T, E>(
  callback, params:E
): [Array<T>, Dispatch<SetStateAction<Array<T>>>] => {
  const [tableList, setTableList] = useState<Array<T>>(() => [])

  useEffect(() => {
    (async function () {
      const data = await callback
      if (data.code === ResultCodeEnum.SUCCESS) {
        setTableList(data.data.records)
      }
    })()
  }, [params])
  return [
    tableList,
    setTableList
  ]
}

