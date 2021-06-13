import React, { useState } from 'react'
import { Modal, Radio } from 'antd'

import { IArticleCategory } from '@/typescript/article/interface'

interface IPreviewModal {
  isModalVisible: boolean
  articleCateList: IArticleCategory[]
  closeModal: Function
}

/** 编辑文章的预览 */
const PreviewModalCom = (props: IPreviewModal) => {
  // 当前选中的 分类
  const [articleCateValue, setArticleCateValue] = useState(null)
  const { isModalVisible, articleCateList } = props
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  /** 文章分类改变事件 */
  const changeArticleCate = e => {
    console.log('radio checked', e.target.value)
    setArticleCateValue(e.target.value)
  }
  const handleCancel = () => {
    props.closeModal()
  }

  return (
    <div className="preview-modal-box">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        width="60%"
        className="modal-box"
      >
        {/* 标题 */}
        {/* 文章分类选择 */}
        <div className="article-categroy">
          <Radio.Group onChange={changeArticleCate} value={articleCateValue}>
            {articleCateList.map((item, index) => (
              <Radio value={item.id} key={item.id}>
                {item.category_name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        {/* 文章内容显示 */}
        {/*  */}
      </Modal>
    </div>
  )
}
export default PreviewModalCom
