import { useState,useCallback,useMemo } from 'react'
import { Modal, Button, Radio, Row, Col, RadioChangeEvent, Spin } from 'antd'
import { connect } from 'react-redux'

import { IArticleCategory } from '@/typescript/article/interface'
import { EArticleSaveType } from '@/typescript/article/enum'

import { ArticleInsertOrEditModel } from '@/typescript/article/model'

interface IPreviewModal {
  /** 弹出框的 visible */
  isModalVisible: boolean
  /** 文章分类list */
  articleCateList: IArticleCategory[]
  /** 文章的参数 */
  articleParams: ArticleInsertOrEditModel
  /** 弹出框页面加载状态 */
  modalLoading: boolean
  /** 关闭 弹出框 */
  closeModal: () => void
  /** 保存为草稿 或者 提交 */
  handleConfirm: (type: EArticleSaveType) => void
  /** 文章分类改变事件 */
  setArticleCateValue: (type: string) => void
}

/** 编辑文章的预览 */
const PreviewModalCom = (props: IPreviewModal) => {
  // 提交按钮的禁用状态
  const [articleConfirmDisabled, setArticleConfirmDisabled] = useState(true)
  const {
    isModalVisible,
    articleCateList,
    articleParams,
    modalLoading,
    handleConfirm,
    setArticleCateValue
  } = props

  /** 文章分类改变事件 */
  const changeArticleCate = useCallback(
    (e: RadioChangeEvent): void => {
      setArticleCateValue(e.target.value)
    },
    [articleParams.categoryId]
  )
  
  // 用来处理编辑的时候,弹出框按钮的状态
  useMemo(()=> {
    articleParams.categoryId && setArticleConfirmDisabled(false)
  }, [articleParams.categoryId])

  /** 关闭 modal 弹出框 */
  const handleCancel = () => {
    props.closeModal()
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
        footer={null}
      >
        <Spin spinning={modalLoading}>
          {/* 标题 */}
          <div className="article-title">{articleParams.title}</div>
          {/* 文章内容显示 */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: articleParams.content }}
          ></div>
          {/* 文章分类选择 */}
          <div className="article-categroy">
            <Radio.Group
              style={{ width: '100%' }}
              onChange={changeArticleCate}
              value={articleParams.categoryId}
            >
              <Row>
                {articleCateList.map(item => {
                  return (
                    <Col span={4} key={item.id}>
                      <Radio value={item.id}>{item.categoryName}</Radio>
                    </Col>
                  )
                })}
              </Row>
            </Radio.Group>
          </div>
          {/* 按钮 */}
          <div className="preview-modal-box-button-box">
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>
            <Button
              key="draft"
              type="primary"
              disabled={articleConfirmDisabled}
              onClick={() => handleConfirm(EArticleSaveType.draft)}
            >
              保存为草稿
            </Button>
            <Button
              key="comfirm"
              type="primary"
              disabled={articleConfirmDisabled}
              onClick={() => handleConfirm(EArticleSaveType.comfirm)}
            >
              提交
            </Button>
          </div>
        </Spin>
      </Modal>
    </div>
  )
}

/** 获取用户的基本信息 */

export default connect()(PreviewModalCom)
