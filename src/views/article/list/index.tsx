import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'

import { articleListApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'

import { ITimeType, formateNormalTime } from '@/utils/time-utils'

const ArticleList: React.FC<any> = () => {
  const [tableData, setTableData] = useState<IArticleBasic[]>([])
  useEffect(() => {
    ;(async function () {
      const data = await articleListApi()
      console.log(data.data)
      setTableData(data.data)
      // console.log(tableData)
    })()
  }, [])

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
      render: text => <span>{}</span>
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
