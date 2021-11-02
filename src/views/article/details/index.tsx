import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getArticleDetailsByIdApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'

const ArticleDetails = props => {
  const urlParams = useParams<{ id: string }>()

  const [articleDetails, setArticleDetails] = useState<IArticleBasic>()

  useEffect(() => {
    ;(async function () {
      const data = await getArticleDetailsByIdApi(urlParams.id)
      console.log(data)
      if(data.code === ResultCodeEnum.SUCCESS) {
        setArticleDetails(data.data)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="article-details-com">
      <div className="article-details-com-header">
        标题: {articleDetails?.title}
      </div>
    </div>
  )
}

export default ArticleDetails
