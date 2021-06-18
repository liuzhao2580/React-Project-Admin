import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Cascader } from 'antd'

import { getArticleCategoryApi } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
/** 筛选条件 */
const SelectBoxCom = () => {
  // 获取分类数据
  const [articleCategroyList, setCategoryList] = useState<any[]>([])
  useEffect(() => {
    initData()
  }, [])
  /** 获取文章分类的数据 */
  const initData = async () => {
    const params = {
      level: 1,
      id: undefined
    }
    const data = await getArticleCategoryApi(params)
    if (data.code === ResultCodeEnum.success) {
      const getOptionList = data.data.map(item => {
        return {
          value: item.id,
          label: item.category_name,
          isLeaf: false
        }
      })
      setCategoryList(getOptionList)
    }
    console.log(data)
  }
  /** 动态获取文章分类的数据 */
  const loadArticleData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    console.log(targetOption)
    const params = {
      level: 2,
      id: targetOption.value
    }
    const data = await getArticleCategoryApi(params)
    if (data.code === ResultCodeEnum.success) {
      if (data.data.length) {
        targetOption.children = data.data.map(item => {
          return {
            value: item.id,
            label: item.category_name,
            isLeaf: true
          }
        })
      } else {
        targetOption.isLeaf = true
      }
      console.log(data.data)
    }
    targetOption.loading = false
    setCategoryList([...articleCategroyList])
    console.log(targetOption)
  }
  function onChange(value) {
    console.log(value)
  }
  return (
    <Row gutter={12}>
      <Col xs={2} sm={4}>
        <Input placeholder="请输入关键字" />
      </Col>
      {/* 文章分类 */}
      <Col xs={2} sm={4}>
        <Cascader
          options={articleCategroyList}
          placeholder="请选择文章分类"
          loadData={loadArticleData}
          onChange={onChange}
          changeOnSelect
        />
      </Col>
    </Row>
  )
}

export default SelectBoxCom
