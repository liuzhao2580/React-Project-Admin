import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'antd'
import './index.scss'

import { getArticleCategoryListApi } from '@/api/modules/article'
import { ArticleCategoryModel } from '@/typescript/article/model'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { IArticleCategory } from '@/typescript/article/interface'
import { PageModel } from '@/typescript/shared/model'

/** 文章分类列表组件 */
const CategoryCom = () => {
  const [params, setParams] = useState<ArticleCategoryModel>(
    () => new ArticleCategoryModel()
  )

  const [tableList, setTableList] = useState<Array<IArticleCategory>>(() => [])

  const [pageParams, setPageParams] = useState<PageModel>(() => new PageModel())

  // 获取文章数据
  const getTableList = async () => {
    const data = await getArticleCategoryListApi(params)
    if (data.code === ResultCodeEnum.SUCCESS) {
      setTableList(data.data.records)
      setPageParams(data.data)
    }
  }

  useEffect(() => {
    getTableList()
  }, [params])

  // 页码改变事件
  const pageChange = (page: number, pageSize)=> {
    console.log(page, pageSize, '222')
    const params:ArticleCategoryModel = {
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
        <Table
          pagination={false}
          rowKey="id"
          columns={columns}
          dataSource={tableList}
        />
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
