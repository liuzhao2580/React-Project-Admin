import React, { useState, FC } from 'react'
import { Modal, Upload } from 'antd'

import ImgCrop from 'antd-img-crop'

import './avatar-upload.scss'

interface ICom {
  modalVisible: boolean
  setModalVisible: Function
}

const ChangeAvatarCom: FC<ICom> = ({
  modalVisible,
  setModalVisible
}) => {
  const handleOk = () => {
    setModalVisible(false)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const [fileList, setFileList] = useState([])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async file => {
    console.log(file, "file")
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
    <>
      <Modal
        title="更换头像"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="400px"
        className="personal-header-modal-box"
      >
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
      </Modal>
    </>
  )
}
export default ChangeAvatarCom
