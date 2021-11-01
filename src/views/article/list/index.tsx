import React, { useState, useCallback } from 'react'
import {
  Table,
  Tag,
  Space,
  Button,
  Popconfirm,
  message,
  Pagination
} from 'antd'
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

import { ITimeType, formateNormalTime } from '@/utils/modules/time-utils'
import { tranSpecifyType } from '@/utils'
import { ResultCodeEnum } from '@/typescript/shared/enum'

import SelectBoxCom from './components/Select-box'
import { useTableHooks } from '@/utils/hooks'
import { ArticleListParamsModel } from '@/typescript/article/model'

const ArticleList: React.FC<any> = () => {
  const [params, setParams] = useState<ArticleListParamsModel>(
    () => new ArticleListParamsModel()
  )

  // 表格的数据
  const [tableData, pageParams, tableLoading, setReloadFlag] = useTableHooks<
    IArticleBasic,
    ArticleListParamsModel
  >(articleListApi, params)

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
      if (data.code === ResultCodeEnum.SUCCESS) {
        message.success('删除成功')
        setReloadFlag(true)
      }
    },
    [setReloadFlag]
  )

  const columns = [
    {
      title: '序号',
      detaIndex: 'index',
      render: (text, record, index) => {
        return (pageParams.current - 1) * pageParams.size + index + 1
      }
    },
    {
      title: '文章标题',
      dataIndex: 'title'
    },
    {
      title: '一级分类',
      dataIndex: 'categoryParentName'
    },
    {
      title: '二级分类',
      dataIndex: 'categoryName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => <span>{formateNormalTime(text, ITimeType.NYRSFM)}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
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

  /** 页码或 pageSize 改变的回调*/
  const onPageChange = () => setParams(params)

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
        loading={tableLoading}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      {/* 分页 */}
      <div className="page-box">
        <Pagination
          total={pageParams.total}
          pageSize={pageParams.size}
          current={pageParams.current}
          onChange={onPageChange}
          showSizeChanger
          showQuickJumper
          showTotal={total => `总数据 ${total}`}
        />
      </div>
    </div>
  )
}

export default ArticleList
