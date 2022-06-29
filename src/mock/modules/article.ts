import { ResultCodeEnum, ResultTypeEnum } from '@/typescript/shared/enum'
import { IMockResponse } from '../shared'
import { ResultModel } from '@/typescript/shared/model'
const articleModules: IMockResponse<any>[] = [
  {
    url: '/article/category',
    type: ResultTypeEnum.POST,
    response: (): ResultModel<any> => {
      return {
        code: ResultCodeEnum.SUCCESS,
        data: [],
        msg: '成功'
      }
    }
  }
]

export default articleModules
