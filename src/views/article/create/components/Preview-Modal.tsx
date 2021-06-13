import React, { useState } from 'react'
import { Modal, Radio, Button } from 'antd'

import { IArticleCategory } from '@/typescript/article/interface'
import { EArticleSaveType } from '@/typescript/article/enum'

interface IPreviewModal {
  isModalVisible: boolean
  articleCateList: IArticleCategory[]
  articleContent: any
  articleTitle: string
  closeModal: Function
}

/** 编辑文章的预览 */
const PreviewModalCom = (props: IPreviewModal) => {
  // 当前选中的 分类
  const [articleCateValue, setArticleCateValue] = useState(null)
  // 页面加载状态
  const [articleLoading, setArticleLoading] = useState(false)
  const { isModalVisible, articleCateList, articleContent, articleTitle } =
    props

  /** 文章分类改变事件 */
  const changeArticleCate = e => {
    console.log('radio checked', e.target.value)
    setArticleCateValue(e.target.value)
  }

  /** 自定义 modal 的按钮 */
  const customModalFooter = () => {
    return [
      <Button key="back" onClick={handleCancel}>
        取消
      </Button>,
      <Button
        key="draft"
        type="primary"
        loading={articleLoading}
        onClick={() => handleConfirm(EArticleSaveType.draft)}
      >
        保存为草稿
      </Button>,
      <Button
        key="comfirm"
        type="primary"
        loading={articleLoading}
        onClick={() => handleConfirm(EArticleSaveType.comfirm)}
      >
        提交
      </Button>
    ]
  }
  /** 关闭 modal 弹出框 */
  const handleCancel = () => {
    props.closeModal()
  }

  /** 保存为草稿 或者 提交 */
  const handleConfirm = (type: EArticleSaveType) => {
    console.log(type, 'type')
    setArticleLoading(true)
  }

  return (
    <div className="preview-modal-box">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        width="60%"
        wrapClassName="modal-box"
        getContainer={() =>
          document.querySelector('.preview-modal-box') as HTMLElement
        }
        footer={customModalFooter()}
      >
        {/* 标题 */}
        <div className="article-title">{articleTitle}</div>
        {/* 文章内容显示 */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: articleContent }}
        ></div>
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
      </Modal>
    </div>
  )
}
export default PreviewModalCom
