import { useState } from 'react'
import { Modal, Button, message, RadioChangeEvent } from 'antd'
import { connect } from 'react-redux'

import { IArticleCategory } from '@/typescript/article/interface'
import { EArticleSaveType } from '@/typescript/article/enum'

import { articleInsertApi } from '@/api/modules/article'
import { getUserIdStorage } from '@/utils/modules/commonSave'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import CategoryCheckoutCom from './CategoryRadio'

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
  const [articleCateValue, setArticleCateValue] = useState<string>('')
  // 页面加载状态
  const [articleLoading, setArticleLoading] = useState(false)
  // 提交按钮的禁用状态
  const [articleConfirmDisabled, setArticleConfirmDisabled] = useState(true)
  const { isModalVisible, articleCateList, articleContent, articleTitle } =
    props


  /** 文章分类改变事件 */
  const changeArticleCate = (e: RadioChangeEvent): void => {
    setArticleConfirmDisabled(false)
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
        disabled={articleConfirmDisabled}
        onClick={() => handleConfirm(EArticleSaveType.draft)}
      >
        保存为草稿
      </Button>,
      <Button
        key="comfirm"
        type="primary"
        loading={articleLoading}
        disabled={articleConfirmDisabled}
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
  const handleConfirm = async (type: EArticleSaveType) => {
    const params = {
      userId: getUserIdStorage(),
      title: articleTitle,
      content: articleContent.toString(),
      categoryId: articleCateValue,
      status: type
    }
    setArticleLoading(true)
    try {
      const data = await articleInsertApi(params)
      if (data.code === ResultCodeEnum.SUCCESS) {
        message.success('新增成功')
        handleCancel()
      }
    } finally {
      setArticleLoading(false)
    }
  }

  return (
    <div className="preview-modal-box">
      <Modal
        title="文章预览"
        visible={isModalVisible}
        width="60%"
        onCancel={handleCancel}
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
          <CategoryCheckoutCom
            articleCateList={articleCateList}
            changeArticleCate={changeArticleCate}
          />
        </div>
      </Modal>
    </div>
  )
}

/** 获取用户的基本信息 */

export default connect()(PreviewModalCom)
