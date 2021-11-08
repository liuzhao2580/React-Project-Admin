import { useEffect, useState,useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import './index.scss'

import { getArticleDetailsByIdApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import ArticleStatusCom from '../components/ArticleStatus'
import ROUTE_PATH from '@/routes/routePath'

const ArticleDetails = props => {
  const history = useHistory()

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
  const editArticle = useCallback(()=> {
    history.push({
      pathname: ROUTE_PATH.ARTICLE_EDIT,
      state: articleDetails?.id
    })
  }, [articleDetails?.id])

  return (
    <>
      {articleDetails && (
        <div className="article-details-com">
          <div className="article-details-com-header">
            <div className="article-details-com-header-title">
              {articleDetails.title}
            </div>
            <div className="article-details-com-header-main">
              <div className="article-details-com-header-main-left">
                <div className="article-details-com-header-main-left-top">
                  <div className="article-details-com-header-main-left-top-nickName mr10">
                    {articleDetails.nickName}
                  </div>
                  <div className="article-details-com-header-main-left-top-update-time">
                    {articleDetails.updateTime}
                  </div>
                </div>
                <div className="article-details-com-header-main-left-bottom mt10">
                  <div className="article-details-com-header-main-left-bottom-category mr10">
                    <span className="article-details-com-header-main-left-bottom-category-title mr10">
                      一级分类:
                    </span>
                    <span className="article-details-com-header-main-left-bottom-category-name">
                      {articleDetails.categoryParentName}
                    </span>
                  </div>
                  <div className="article-details-com-header-main-left-bottom-category">
                    <span className="article-details-com-header-main-left-bottom-category-title mr10">
                      二级分类:
                    </span>
                    <span className="article-details-com-header-main-left-bottom-category-name">
                      {articleDetails.categoryName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="article-details-com-header-main-right">
                <div className="article-details-com-header-main-right-status">
                  <ArticleStatusCom status={articleDetails.status} />
                </div>
                <div className="article-details-com-header-main-right-edit" onClick={editArticle}>
                  编辑
                </div>
              </div>
            </div>
          </div>
          <div className="article-details-com-container" dangerouslySetInnerHTML={{__html: articleDetails.content}}></div>
        </div>
      )}
    </>
  )
}

export default ArticleDetails
