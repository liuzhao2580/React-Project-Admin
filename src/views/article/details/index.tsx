import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { message, Popconfirm, Spin } from 'antd'

import './index.scss'

import {
  articleSaveOrUpdateApi,
  getArticleDetailsByIdApi
} from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import ArticleStatusCom from '../components/ArticleStatus'
import { ROUTE_PATH } from '@/routes/RouteConst'
import Permission from '@/components/Permission'
import RejectReasonCom from './components/RejectReasonCom'
import { getUserIdStorage } from '@/utils/modules/commonSave'
import { IArticleBasic } from '@/typescript/shared/interface/article'
import { EArticleStatus } from '@/typescript/shared/enum/article'
import { UserRolesEnum } from '@/typescript/shared/enum/user'

const ArticleDetails = () => {
  const history = useHistory()
  const childrenRef = useRef<any>(null)

  const [loading, setLoading] = useState<boolean>(false)


  const [articleDetails, setArticleDetails] = useState<IArticleBasic>()

  useEffect(() => {
    (async function () {
      const id = history.location.state
      const data = await getArticleDetailsByIdApi(id as string)
      if (data.code === ResultCodeEnum.SUCCESS) {
        setArticleDetails(data.data)
      }
    })()
  }, [])

  /** 编辑按钮 */
  const editArticle = useCallback(() => {
    history.push({
      pathname: ROUTE_PATH.ARTICLE_EDIT,
      state: articleDetails?.id
    })
  }, [articleDetails?.id])

  /** 文章通过审核 */
  const articleConfirm = () => {
    updateArticle(EArticleStatus.PUBLISHED)
  }

  /** 拒绝审核 开启弹出框 */
  const articleReject = () => {
    childrenRef.current?.openModal()
  }

  /** 更新文章状态 */
  const updateArticle = async (status: EArticleStatus, reason?: string) => {
    if (articleDetails) {
      const getParams: IArticleBasic = JSON.parse(
        JSON.stringify(articleDetails)
      )
      getParams.status = status
      if (reason) {
        getParams.rejectReason = reason
      }
      setLoading(() => true)
      try {
        const data = await articleSaveOrUpdateApi(getParams)
        if(data.code === ResultCodeEnum.SUCCESS) {
          message.success(data.msg)
          setArticleDetails(() => data.data)
        }
        else {
          message.error(data.msg)
        }
      } catch (error) {
      } finally {
        setLoading(() => false)
      }
    }
  }

  return (
    <Spin spinning={loading}>
      <div className="article-details-com">
        <div className="article-details-com-header">
          <div className="article-details-com-header-title">
            {articleDetails?.title}
          </div>
          <div className="article-details-com-header-main">
            <div className="article-details-com-header-main-left">
              <div className="article-details-com-header-main-left-top">
                <div className="article-details-com-header-main-left-top-nickName mr10">
                  {articleDetails?.nickName}
                </div>
                <div className="article-details-com-header-main-left-top-update-time">
                  {articleDetails?.updateTime}
                </div>
              </div>
              <div className="article-details-com-header-main-left-bottom mt10">
                <div className="article-details-com-header-main-left-bottom-category mr10">
                  <span className="article-details-com-header-main-left-bottom-category-title mr10">
                    一级分类:
                  </span>
                  <span className="article-details-com-header-main-left-bottom-category-name">
                    {articleDetails?.categoryParentName}
                  </span>
                </div>
                <div className="article-details-com-header-main-left-bottom-category">
                  <span className="article-details-com-header-main-left-bottom-category-title mr10">
                    二级分类:
                  </span>
                  <span className="article-details-com-header-main-left-bottom-category-name">
                    {articleDetails?.categoryName}
                  </span>
                </div>
              </div>
            </div>
            <div className="article-details-com-header-main-right">
              <div className="article-details-com-header-main-right-status">
                {articleDetails && (
                  <ArticleStatusCom status={articleDetails?.status} />
                )}
              </div>
              <Permission permissionFlag={articleDetails?.userId === getUserIdStorage()}>
                <div
                  className="article-details-com-header-main-right-edit iconfont icon-bianji"
                  onClick={editArticle}
                  title="编辑"
                ></div>
              </Permission>
              <Permission
                roleId={[UserRolesEnum.admin, UserRolesEnum.superAdmin]}
              >
                <Popconfirm
                  placement="rightTop"
                  title="该文章是否通过审核?"
                  onConfirm={articleConfirm}
                  onCancel={articleReject}
                  okText="通过"
                  cancelText="拒绝"
                  disabled={articleDetails?.status !== EArticleStatus.REVIEWED}
                >
                  <div
                    className="article-details-com-header-main-right-review iconfont icon-zhinengshenheshenchashenhe"
                    title="审核"
                    style={{cursor: articleDetails?.status !== EArticleStatus.REVIEWED ? 'not-allowed' : 'pointer'}}
                  ></div>
                </Popconfirm>
              </Permission>
            </div>
          </div>
        </div>
        <div
          className="article-details-com-container"
          dangerouslySetInnerHTML={
            articleDetails && { __html: articleDetails.content }
          }
        ></div>
        {/* 文章拒绝审核的弹出框  */}
        <RejectReasonCom ref={childrenRef} tranReason={updateArticle} />
      </div>
    </Spin>
  )
}

export default ArticleDetails
