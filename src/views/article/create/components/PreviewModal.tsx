import { useState, useCallback, useMemo } from 'react'
import {
  Modal,
  Button,
  Radio,
  Row,
  Col,
  RadioChangeEvent,
  Spin,
  Upload,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getUserIdStorage } from '@/utils/modules/commonSave'

import { IArticleCategory, IArticleCover } from '@/typescript/article/interface'
import { EArticleSaveType } from '@/typescript/article/enum'

import { ArticleInsertOrEditModel } from '@/typescript/article/model'
import { uploadPictureApi } from '@/api/modules/common'
import { ResultCodeEnum } from '@/typescript/shared/enum'

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
  /** 文章封面的改变事件 */
  setArticleCoverImage: (type: IArticleCover) => void
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
    setArticleCateValue,
    setArticleCoverImage
  } = props

  /** 文章封面的 radio 的改变事件 */
  const onCoverChange = ({ target }) => {
    setArticleCoverImage({
      size: target.value,
      images: articleParams.coverImages.images
    })
  }

  /** 图片上传改变事件 */
  const coverImagesUploadChange = file => {
    console.log(file)
  }

  /** 图片上传 */
  const coverImagesRequest = async ({ file }, index) => {
    console.log(file, index)
    // return
    try {
      const params = new FormData()
      params.append('file', file)
      params.append('uploadByUserId', getUserIdStorage())
      const data = await uploadPictureApi(params)
      if (data.code === ResultCodeEnum.SUCCESS) {
        message.success('上传成功')
        const url = data.data
        console.log(url)
        const getImagesList = JSON.parse(
          JSON.stringify(articleParams.coverImages.images)
        )
        const coverImagesList: IArticleCover = {
          size: articleParams.coverImages.size,
          images: getImagesList
        }
        coverImagesList.images[index] = url
        setArticleCoverImage(coverImagesList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** 文章分类改变事件 */
  const changeArticleCate = useCallback(
    (e: RadioChangeEvent): void => {
      setArticleCateValue(e.target.value)
    },
    [articleParams.categoryId]
  )

  // 用来处理编辑的时候,弹出框按钮的状态
  useMemo(() => {
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
          {/* 封面图 */}
          <div className="cover-images-box">
            <div className="left-title">封面图</div>
            <div className="right-box">
              <div className="right-box-radio">
                <Radio.Group
                  onChange={onCoverChange}
                  value={articleParams.coverImages.size}
                >
                  <Radio value={0}>无封面</Radio>
                  <Radio value={1}>单封面</Radio>
                  <Radio value={3}>三封面</Radio>
                </Radio.Group>
              </div>
              {/* 图片上传 */}
              {articleParams.coverImages.size !== 0 && (
                <div
                  className="right-box-images-upload"
                  style={{
                    display:
                      articleParams.coverImages.size !== 0 ? 'block' : 'none'
                  }}
                >
                  {/* 说明是单图片上传 */}
                  {articleParams.coverImages.size === 1 && (
                    <Upload
                      action=""
                      listType="picture-card"
                      showUploadList={false}
                      customRequest={file => coverImagesRequest(file, 0)}
                      onChange={coverImagesUploadChange}
                    >
                      <div className="picture-card-div-img">
                        {articleParams.coverImages.images[0] ? (
                          <img
                            src={articleParams.coverImages.images[0]}
                            alt="avatar"
                          />
                        ) : (
                          <div>
                            <PlusOutlined />
                          </div>
                        )}
                      </div>
                    </Upload>
                  )}
                  {/* 说明是 三图片上传 */}
                  {articleParams.coverImages.size === 3 &&
                    [0, 1, 2].map(item => {
                      return (
                        <Upload
                          action=""
                          listType="picture-card"
                          showUploadList={false}
                          customRequest={file => coverImagesRequest(file, item)}
                          onChange={coverImagesUploadChange}
                          key={item}
                        >
                          <div className="picture-card-div-img">
                            {articleParams.coverImages.images[item] ? (
                              <img
                                src={articleParams.coverImages.images[item]}
                                alt="avatar"
                              />
                            ) : (
                              <div>
                                <PlusOutlined />
                              </div>
                            )}
                          </div>
                        </Upload>
                      )
                    })}
                </div>
              )}
            </div>
          </div>
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
