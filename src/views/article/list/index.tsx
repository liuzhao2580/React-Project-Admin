import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Space, Button, Popconfirm, message, Pagination } from 'antd'
import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import './index.scss'
import ROUTE_PATH from '@/routes/routePath'

import { articleListApi, articleDeleteApi } from '@/api/modules/article'
import { IArticleBasic } from '@/typescript/article/interface'
import { EArticleStatus } from '@/typescript/article/enum'

import { ITimeType, formateNormalTime } from '@/utils/modules/time-utils'
import { ResultCodeEnum } from '@/typescript/shared/enum'

import SelectBoxCom from './components/SelectBox'
import { useTableHooks } from '@/utils/hooks'
import { ArticleListParamsModel } from '@/typescript/article/model'
import ArticleStatusCom from '../components/ArticleStatus'
import Permission from '@/components/Permission'
import { UserRolesEnum } from '@/typescript/user/enum'
import { ColumnType } from 'antd/lib/table/interface'

const articleOperation = {
  /** 预览 */
  preview: ROUTE_PATH.ARTICLE_DETAILS,
  /** 编辑 */
  edit: ROUTE_PATH.ARTICLE_EDIT
}

const ArticleList: React.FC<any> = () => {
  const history = useHistory()

  const [params, setParams] = useState<ArticleListParamsModel>(
    () => new ArticleListParamsModel()
  )

  // 表格的数据
  const [tableData, pageParams, tableLoading, setReloadFlag] = useTableHooks<
    IArticleBasic,
    ArticleListParamsModel
  >(articleListApi, params)

  /** 文章删除 */
  const deteleClick = useCallback(
    async (text, record: IArticleBasic) => {
      const { id } = record
      const data = await articleDeleteApi(id)
      if (data.code === ResultCodeEnum.SUCCESS) {
        message.success('删除成功')
        setReloadFlag(true)
      }
    },
    [setReloadFlag]
  )

  /** 按钮点击 跳转页面 */
  const clickLink = useCallback((record: IArticleBasic, pathname: string) => {
    const { id } = record
    history.push({
      pathname,
      state: id
    })
  }, [])

  const columns: ColumnType<IArticleBasic>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text, record, index) => {
        return (pageParams.current - 1) * pageParams.size + index + 1
      }
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 200
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
      title: '创建人',
      dataIndex: 'nickName'
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
      render: (text: EArticleStatus) => <ArticleStatusCom status={text} />
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record: IArticleBasic) => (
        <Space size="small">
          <Button
            title="预览"
            shape="circle"
            size="small"
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => clickLink(record, articleOperation.preview)}
          ></Button>
          <Permission roleId={UserRolesEnum.user}>
            <Button
              title="编辑"
              shape="circle"
              size="small"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => clickLink(record, articleOperation.edit)}
            ></Button>
          </Permission>
          <Popconfirm
            title="确定删除该文章吗？"
            onConfirm={() => deteleClick(text, record)}
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
  const onPageChange = useCallback((page: number, pageSize?: number) => {
    setParams(prev => {
      return { ...prev, ...{ pageNum: page, pageSize: pageSize as number } }
    })
  }, [])

  /** 查询按钮 */
  const selectBtnParams = (): void => {
    console.log(params, 'params')
    setReloadFlag(() => true)
  }

  /** 重置按钮 */
  const resetBtn = useCallback(() => {
    setParams(() => new ArticleListParamsModel())
    setReloadFlag(true)
  }, [])

  return (
    <div className="article-list-box">
      {/* 筛选按钮 */}
      <div className="select-box">
        <SelectBoxCom
          params={params}
          setParams={setParams}
          selectBtnParams={selectBtnParams}
          resetBtn={resetBtn}
        />
      </div>
      {/* 表格 */}
      <Table
        rowKey="id"
        bordered
        loading={tableLoading}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: true }}
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
