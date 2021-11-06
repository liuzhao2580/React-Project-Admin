import { useState, useEffect } from 'react'
import { Tag } from 'antd'
import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  InboxOutlined
} from '@ant-design/icons'

import { EArticleStatus } from '@/typescript/article/enum'
import CustomMapToText from '@/utils/modules/CustomMapToText'

interface ICom {
  status: EArticleStatus
}

class IParams {
  tagColor: string = ''
  tagIcon: JSX.Element = <ClockCircleOutlined />
}

/** 文章状态 */
const ArticleStatusCom = (props: ICom) => {
  const customMapToText = new CustomMapToText()
  const { status } = props

  const [params, setParams] = useState<IParams>(() => new IParams())

  useEffect(() => {
    switch (status) {
      // 已删除
      case EArticleStatus.DELETED:
        setParams(()=> {
          return {
            tagColor : 'error',
            tagIcon : <CloseCircleOutlined />
          }
        })
        break
      // 待审核
      case EArticleStatus.REVIEWED:
        setParams(()=> {
          return {
            tagColor : 'default',
            tagIcon : <ClockCircleOutlined />
          }
        })
        break
      // 草稿箱
      case EArticleStatus.DRAFT:
        setParams(()=> {
          return {
            tagColor : '#4e72b8',
            tagIcon : <InboxOutlined />
          }
        })
        break
      // 被驳回
      case EArticleStatus.REJECT:
        setParams(()=> {
          return {
            tagColor : '#ed1941',
            tagIcon : <MinusCircleOutlined />
          }
        })
        break
      // 已发布
      case EArticleStatus.PUBLISHED:
        setParams(()=> {
          return {
            tagColor : 'success',
            tagIcon : <CheckCircleOutlined />
          }
        })
        break
    }
  }, [status])
  return (
    <Tag color={params.tagColor} icon={params.tagIcon}>
      {customMapToText.ArticleConst.get(status)}
    </Tag>
  )
}

export default ArticleStatusCom
