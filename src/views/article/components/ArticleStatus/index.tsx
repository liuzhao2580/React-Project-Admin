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
import { tranSpecifyType } from '@/utils'

interface ICom {
  status: EArticleStatus
}

class IParams {
  tagColor: string = ''
  tagIcon: JSX.Element = <ClockCircleOutlined />
}

/** 文章状态 */
const ArticleStatusCom = (props: ICom) => {
  const { status } = props

  const [params, setParams] = useState<IParams>(() => new IParams())

  useEffect(() => {
    switch (status) {
      // 已删除
      case EArticleStatus.已删除:
        setParams(()=> {
          return {
            tagColor : 'error',
            tagIcon : <CloseCircleOutlined />
          }
        })
        break
      // 待审核
      case EArticleStatus.待审核:
        setParams(()=> {
          return {
            tagColor : 'default',
            tagIcon : <ClockCircleOutlined />
          }
        })
        break
      // 草稿箱
      case EArticleStatus.草稿箱:
        setParams(()=> {
          return {
            tagColor : '#4e72b8',
            tagIcon : <InboxOutlined />
          }
        })
        break
      // 被驳回
      case EArticleStatus.被驳回:
        setParams(()=> {
          return {
            tagColor : '#ed1941',
            tagIcon : <MinusCircleOutlined />
          }
        })
        break
      // 已发布
      case EArticleStatus.已发布:
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
      {tranSpecifyType(status, EArticleStatus)}
    </Tag>
  )
}

export default ArticleStatusCom
