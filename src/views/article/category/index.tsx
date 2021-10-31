import React, { useState } from 'react'
import { Table, Pagination, Spin } from 'antd'
import './index.scss'

import { getArticleCategoryListApi } from '@/api/modules/article'
import { ArticleCategoryModel } from '@/typescript/article/model'
import { IArticleCategory } from '@/typescript/article/interface'

import { useTableHooks } from '@/utils/hooks'

/** 文章分类列表组件 */
const CategoryCom = () => {
  const [params, setParams] = useState<ArticleCategoryModel>(
    () => new ArticleCategoryModel()
  )

  const [tableList, pageParams, tableLoading] = useTableHooks<
    IArticleCategory,
    ArticleCategoryModel
  >(getArticleCategoryListApi, params)

  // 页码改变事件
  const pageChange = (page: number, pageSize) => {
    const params: ArticleCategoryModel = {
      pageNum: page,
      pageSize: pageSize
    }
    setParams(params)
  }

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '50%'
    },
    {
      title: '分类级别',
      dataIndex: 'level',
      key: 'level',
      width: '20%'
    },
    {
      title: '编辑',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="article-category-com-table-action">
          <span className="article-category-com-table-action-btn">
            查看下级
          </span>
          <span className="article-category-com-table-action-btn">编辑</span>
          <span className="article-category-com-table-action-btn">删除</span>
        </div>
      )
    }
  ]
  return (
    <div className="article-category-com">
      {/* 头部选择器 */}
      <div className="article-category-com-header"></div>
      {/* 列表 */}
      <div className="article-category-com-table">
        <Spin spinning={tableLoading} delay={300}>
          <Table
            pagination={false}
            rowKey="id"
            columns={columns}
            dataSource={tableList}
          />
        </Spin>
      </div>
      {/* 分页数据 */}
      <div className="article-category-com-page">
        <Pagination
          total={pageParams.total}
          current={pageParams.current}
          showSizeChanger
          showQuickJumper
          onChange={pageChange}
          showTotal={total => `总条数 ${total}`}
        />
      </div>
    </div>
  )
}

export default CategoryCom
