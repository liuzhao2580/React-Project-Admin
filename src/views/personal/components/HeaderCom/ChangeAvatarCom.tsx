import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import './avatar-upload.scss'

import { IUserBaseInfo } from '@/typescript/shared/interface/user'
import { uploadUserAvatarApi } from '@/api/modules/common'
import { uploadUserInfoApi } from '@/api/modules/user'

import { ResultCodeEnum } from '@/typescript/shared/enum'

import appActions from '@/store/modules/app/actions'
import { MUploadUserInfo } from '@/typescript/shared/model/user'
interface ICom {
  userInfo: IUserBaseInfo,
  isNeedUserInfo: any
}

/** 用户上传头像组件 */
const ChangeAvatarCom: FC<ICom> = ({ userInfo, isNeedUserInfo }) => {
  const { avatar, id } = userInfo

  /** 自定义上传方法 */
  const customRequest = async file => {
    const formData = new FormData()
    formData.append('file', file.file)
    formData.append('uploadByUserId', id.toString())

    const urlData = await uploadUserAvatarApi(formData)
    if(urlData.code === ResultCodeEnum.SUCCESS) {
      const uploadUser = new MUploadUserInfo()
      uploadUser.avatar = urlData.data.url
      const data = await uploadUserInfoApi(id, uploadUser)
      if (data.code === ResultCodeEnum.SUCCESS) {
        isNeedUserInfo(true)
        message.success('更新成功')
      }
      else {
        message.error(data.msg)
      }
    }
  }

  return (
    <ImgCrop rotate>
      <Upload
        action=""
        customRequest={customRequest}
        listType="picture-card"
        maxCount={1}
        className="user-avatar-upload"
      >
        <div className="user-avatar-img">
          <img src={avatar} alt="" />
          <span className="change-avatar-span">更换头像</span>
        </div>
      </Upload>
    </ImgCrop>
  )
}

const mapAppDispatchToProps = (dispatch: Dispatch) => {
  return {
    // 用来设置需要重新获取用户数据
    isNeedUserInfo(status:boolean) {
      return dispatch(appActions.isNeedUserInfo(status))
    }
  }
}

export default connect(null, mapAppDispatchToProps)(ChangeAvatarCom)
