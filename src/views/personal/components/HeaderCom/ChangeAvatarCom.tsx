import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import './avatar-upload.scss'

import { IUserBaseInfo } from '@/typescript/user/interface'

import appActions from '@/store/modules/app/actions'
interface ICom {
  userInfo: IUserBaseInfo,
  isNeedUserInfo: any
}

/** 用户上传头像组件 */
const ChangeAvatarCom: FC<ICom> = ({ userInfo }) => {
  const { avatar, id } = userInfo

  /** 自定义上传方法 */
  const customRequest = async file => {
    const formData = new FormData()
    formData.append('file', file.file)
    formData.append('uploadByUserId', id.toString())
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
