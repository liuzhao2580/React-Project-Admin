import React from 'react'
import { Modal } from 'antd'

/** 编辑文章的预览 */
const PreviewModalCom = props => {
  const { isModalVisible } = props
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    props.closeModal()
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
export default PreviewModalCom
