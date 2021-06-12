import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd'

import { articleListApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/interface/article/article-config.interface'

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
      dataIndex: 'article_time'
    },
    {
      title: '更新时间',
      dataIndex: 'article_update_time'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button danger>删除</Button>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={tableData} />
    </>
  )
}

export default ArticleList
