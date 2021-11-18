/** 一些通用的方法 */
import { ResultModel } from '@/typescript/shared/model'
import axiosConfig from '../axiosConfig'

/** 图片上传 */
export const uploadPictureApi = (
  params
): Promise<ResultModel<{url: string}>> => axiosConfig.post('/common/upload', params)

/** 公司接口的图片上传 */
export const companyUploadPictureApi = (params: FormData):Promise<ResultModel<{url: string}>> => axiosConfig.post('http://pdyzt-test.newayz.com/zjmap/file/upload', params, {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNDAyODIxOTc4NDQzNzQ3IiwicmlkIjoiYmE3YzQ1OTAtNmQ2MS00NzY2LTk2ODUtODdiZjI5M2RlYTAxIiwicHJvcHMiOm51bGwsImV4cCI6MTYzOTc0MjMwMywianRpIjoiM2Q1OWZiMGItYzdjYS00YzA0LTk1OGYtN2YzMzY3MGQ1ODljIiwiaWF0IjoxNjM3MTUwMzAzLCJpc3MiOiJVc2VyU2VydmljZSJ9.6KrURuYQEADkO3iLFmNCWYBDacdx6OgYJ-79M13bDk8'
  }
})
