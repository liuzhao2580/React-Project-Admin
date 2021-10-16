import React, { FC } from 'react'
import { Upload } from 'antd'

import ImgCrop from 'antd-img-crop'

import './avatar-upload.scss'

interface ICom {
  avatar: string
}
const ChangeAvatarCom: FC<ICom> = ({ avatar }) => {
  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList)
  }

  return (
    <ImgCrop rotate>
      <Upload
        action=""
        listType="picture-card"
        onChange={onChange}
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
export default ChangeAvatarCom
