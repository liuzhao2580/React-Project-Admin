import { useEffect, useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Popconfirm } from 'antd'

import './index.scss'

import { getArticleDetailsByIdApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import ArticleStatusCom from '../components/ArticleStatus'
import ROUTE_PATH from '@/routes/routePath'
import Permission from '@/components/Permission'
import { UserRolesEnum } from '@/typescript/user/enum'
import RejectReasonCom from './components/RejectReasonCom'

const ArticleDetails = props => {
  const history = useHistory()
  const childrenRef = useRef<any>(null)

  const [articleDetails, setArticleDetails] = useState<IArticleBasic>()

  useEffect(() => {
    ;(async function () {
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

  /** 文章审核按钮 */
  const articleReview = () => {}

  /** 文章通过审核 */
  const articleConfirm = () => {}

  /** 拒绝审核 */
  const articleReject = () => {
    childrenRef.current?.openModal()
  }

  return (
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
            <Permission roleId={UserRolesEnum.user}>
              <div className="article-details-com-header-main-right-status">
                {articleDetails && (
                  <ArticleStatusCom status={articleDetails?.status} />
                )}
              </div>
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
              >
                <div
                  className="article-details-com-header-main-right-review iconfont icon-zhinengshenheshenchashenhe"
                  title="审核"
                  onClick={articleReview}
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
      <RejectReasonCom ref={childrenRef} />
    </div>
  )
}

export default ArticleDetails
