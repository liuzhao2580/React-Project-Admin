import React, { useState, useEffect, useCallback } from 'react'
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd'
import {
  CloseOutlined,
  EditOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  InboxOutlined
} from '@ant-design/icons'
import './index.scss'

import { articleListApi, articleDeleteApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'
import { EArticleStatus } from '@/typescript/article/enum'

import { ITimeType, formateNormalTime } from '@/utils/time-utils'
import { tranSpecifyType } from '@/utils'
import { ResultCodeEnum } from '@/typescript/shared/enum'

import SelectBoxCom from './components/Select-box'

const ArticleList: React.FC<any> = () => {
  const [tableData, setTableData] = useState<IArticleBasic[]>([])
  useEffect(() => {
    initArticleList()
  }, [])

  /** 获取文章数据列表 */
  const initArticleList = async () => {
    const data = await articleListApi()
    console.log(data.data)
    setTableData(data.data)
  }

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
        tagColor = '#4e72b8'
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
  /** 文章删除 */
  const deteleClick = useCallback(
    async (text, record: IArticleBasic, index) => {
      const { id } = record
      const data = await articleDeleteApi(id)
      if (data.code === ResultCodeEnum.success) {
        message.success('删除成功')
        initArticleList()
      }
      console.log(data)
    },
    []
  )

  const columns = [
    {
      title: '序号',
      detaIndex: 'index',
      render: (text, record, index) => index + 1
    },
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
      render: (text, record, index) => (
        <Space size="small">
          <Button
            title="编辑"
            shape="circle"
            size="small"
            type="primary"
            icon={<EditOutlined />}
          ></Button>
          <Popconfirm
            title="确定删除该文章吗？"
            onConfirm={() => deteleClick(text, record, index)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              title="删除"
              shape="circle"
              danger
              size="small"
              icon={<CloseOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className="article-list-box">
      {/* 筛选按钮 */}
      <div className="select-box">
        <SelectBoxCom />
      </div>
      {/* 表格 */}
      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      {/* 分页 */}
    </div>
  )
}

export default ArticleList
