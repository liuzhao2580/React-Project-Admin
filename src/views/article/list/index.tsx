import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd'
import {
  CloseOutlined,
  EditOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  InboxOutlined
} from '@ant-design/icons'

import { articleListApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'
import { EArticleStatus } from '@/typescript/article/enum'

import { ITimeType, formateNormalTime } from '@/utils/time-utils'
import { tranSpecifyType } from '@/utils'

const ArticleList: React.FC<any> = () => {
  const [tableData, setTableData] = useState<IArticleBasic[]>([])
  useEffect(() => {
    ;(async function () {
      const data = await articleListApi()
      console.log(data.data)
      setTableData(data.data)
    })()
  }, [])

  // 设置文章状态的 tag样式
  function statusTran(value: EArticleStatus) {
    let tagColor = '#2db7f5'
    let tagIcon = <ClockCircleOutlined />
    switch (value) {
      // 已删除
      case EArticleStatus.已删除:
        tagColor = 'error'
        tagIcon = <CloseCircleOutlined />
        break
      // 待审核
      case EArticleStatus.待审核:
        tagColor = 'default'
        tagIcon = <ClockCircleOutlined />
        break
      // 草稿箱
      case EArticleStatus.草稿箱:
        tagColor = '#130c0e'
        tagIcon = <InboxOutlined />
        break
      // 被驳回
      case EArticleStatus.被驳回:
        tagColor = '#ed1941'
        tagIcon = <MinusCircleOutlined />
        break
      // 已发布
      case EArticleStatus.已发布:
        tagColor = 'success'
        tagIcon = <CheckCircleOutlined />
        break
    }
    return (
      <Tag color={tagColor} icon={tagIcon}>
        {tranSpecifyType(value, EArticleStatus)}
      </Tag>
    )
  }

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'article_title'
    },
    {
      title: '创建时间',
      dataIndex: 'article_time',
      render: text => <span>{formateNormalTime(text, ITimeType.NYRSFM)}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'article_update_time',
      render: text => <span>{formateNormalTime(text, ITimeType.NYRSFM)}</span>
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      width: 100,
      render: (text: EArticleStatus) => <>{statusTran(text)}</>
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: () => (
        <Space size="small">
          <Button
            title="编辑"
            shape="circle"
            size="small"
            type="primary"
            icon={<EditOutlined />}
          ></Button>
          <Button
            title="删除"
            shape="circle"
            danger
            size="small"
            icon={<CloseOutlined />}
          ></Button>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table rowKey="id" bordered columns={columns} dataSource={tableData} />
    </>
  )
}

export default ArticleList
