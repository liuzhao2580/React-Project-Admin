/** 一些通用的方法 */
import { ResultModel } from '@/typescript/shared/model'
import axiosConfig from '../axiosConfig'

/** 图片上传 */
export const uploadPictureApi = (
  params
): Promise<ResultModel<{url: string}>> => axiosConfig.post('/common/upload', params)
