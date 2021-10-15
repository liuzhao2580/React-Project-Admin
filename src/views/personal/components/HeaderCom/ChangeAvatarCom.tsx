import React, { useState, FC } from 'react'
import { Upload } from 'antd'

import ImgCrop from 'antd-img-crop'

import './avatar-upload.scss'

interface ICom {
  avatar: string
}

const ChangeAvatarCom: FC<ICom> = ({ avatar }) => {
  const [fileList, setFileList] = useState([
    {
      uid: 'uid', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png', // 文件名removed，被 beforeUpload 拦截的文件没有 status 属性
      url: avatar
    }
  ])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async file => {
    console.log(file, 'file')
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow: any = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotate>
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={1}
        className="user-avatar-upload"
      >
        {fileList.length === 0 && (
          <div className="user-avatar-upload-add">+ Upload</div>
        )}
      </Upload>
    </ImgCrop>
  )
}
export default ChangeAvatarCom
