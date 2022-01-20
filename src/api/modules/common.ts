/** 一些通用的方法 */
import { ResultModel } from '@/typescript/shared/model'
import axiosConfig from '../axiosConfig'

/** 上传头像操作 */
export const uploadUserAvatarApi = (
  params
): Promise<ResultModel<{ url: string }>> =>
  axiosConfig.post('/common/upload', params)

/** 自用的接口图片上传 */
export const uploadPictureApi = (
  params: FormData
): Promise<ResultModel<string>> =>
  axiosConfig.post('/common/uploadToServer', params)
